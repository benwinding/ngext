import * as path from "path";
import * as fs from "fs-extra";
import { Project, SourceFile } from "ts-morph";
import { processPageModuleSourceFile } from "./transformers";

const project = new Project();

export async function copyAndTranslatePages() {
  const pagesDir = path.join(__dirname, "../pages/**/*.ts");
  const files = project.addSourceFilesAtPaths(pagesDir);
  const filesConverted = files.map(translateMatch);
  try {
    await Promise.all(filesConverted.map(saveFile));
  } catch (error) {
    console.error(error);  
  }
}

async function saveFile(file: SourceFile) {
  const filePath = file.getFilePath();
  const filePathNew = convertToTargetPath(filePath);
  const dirPath = path.dirname(filePathNew);
  const fileText = file.getText();
  await fs.mkdirp(dirPath);
  await fs.writeFile(filePathNew, fileText);
}

function convertToTargetPath(inputFilePath: string): string {
  const baseDir = path.join(__dirname, "../pages");
  const baseRelativePath = inputFilePath.slice(baseDir.length);
  const targetPath = path.join(
    __dirname,
    "../.intermediate/src/pages",
    baseRelativePath
  );

  return targetPath;
}

function translateMatch(sourceFile: SourceFile): SourceFile {
  console.log("translating: " + sourceFile.getFilePath());
  const sourceFileConverted = processPageModuleSourceFile(sourceFile);
  return sourceFileConverted;
}
