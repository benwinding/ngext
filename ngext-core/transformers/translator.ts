import * as path from "path";
import * as fs from "fs-extra";
import { Project, SourceFile } from "ts-morph";
import { createRoutesFile, processComponentSourceFile } from "./transformers";
import watch from 'glob-watcher';

const project = new Project();

const MAIN_ROOT = path.join(__dirname, "../..");
const INTERMEDIATE_SRC = path.join(MAIN_ROOT, ".intermediate", "src");

export async function watchCopyAndTranslateAllPages() {
  const pagesDirGlob = path.join(MAIN_ROOT, "pages/**/*.ts");
  const watcher = watch([pagesDirGlob]);
  watcher.on('change', (e, filename) => {
    copyAndTranslateAllPages();
  });
}

export async function copyAndTranslateAllPages() {
  const pagesDirGlob = path.join(MAIN_ROOT, "pages/**/*.ts");
  const files = project.addSourceFilesAtPaths(pagesDirGlob);
  try {
    const filesConverted = files.map(translateMatch);
    await Promise.all(filesConverted.map(saveFile));
    const routeModulePaths = filesConverted.map((f) => f.getFilePath());
    await saveRoutesFile(routeModulePaths);
  } catch (error) {
    console.error(error);
  }
}

async function saveRoutesFile(routeModulePaths: string[]) {
  const routeFilePath = path.join(INTERMEDIATE_SRC, "routes.ts");
  const tsRouteFile = project.createSourceFile(routeFilePath, "", {
    overwrite: true,
  });
  const routePathsRelative = routeModulePaths
    .map(convertToRelativePath)
    .map(stripTsExtension);
  const ftrans = createRoutesFile(tsRouteFile, routePathsRelative);
  ftrans.formatText();
  ftrans.save();
}

async function saveFile(file: SourceFile) {
  const filePath = file.getFilePath();
  const filePathNew = convertToTargetPath(filePath);
  const dirPath = path.dirname(filePathNew);
  file.formatText();
  const fileText = file.getText();
  await fs.mkdirp(dirPath);
  await fs.writeFile(filePathNew, fileText);
}

function convertToRelativePath(inputFilePath: string): string {
  const baseDir = path.join(MAIN_ROOT, "../pages");
  const baseRelativePath = inputFilePath.slice(baseDir.length);
  return baseRelativePath;
}

function stripTsExtension(inputFilePath: string): string {
  if (!inputFilePath.endsWith(".ts")) {
    return inputFilePath;
  }
  return inputFilePath.slice(0, -3);
}

function convertToTargetPath(inputFilePath: string): string {
  const baseRelativePath = convertToRelativePath(inputFilePath);
  const targetPath = path.join(INTERMEDIATE_SRC, "pages", baseRelativePath);
  return targetPath;
}

function translateMatch(sourceFile: SourceFile): SourceFile {
  console.log("translating: " + sourceFile.getFilePath());
  const sourceFileConverted = processComponentSourceFile(sourceFile);
  return sourceFileConverted;
}
