import * as path from "path";
import * as fs from "fs-extra";
import { Project, SourceFile } from "ts-morph";
import watch from "glob-watcher";

import {
  createRoutesFile,
  processComponentSourceFile,
  RouteObjs,
} from "./transformers";
import {
  convertToRelativePath,
  stripTsExtension,
} from "../utils";

export async function watchCopyAndTranslateAllPages(ROOT_DIR: string) {
  const pagesDirGlob = path.join(ROOT_DIR, "pages/**/*.ts");
  console.log("- watching pages: ", pagesDirGlob);
  const watcher = watch([pagesDirGlob]);
  watcher.on("change", (e, filename) => {
    console.log("-> file page changed: ", filename);
    copyAndTranslateAllPages(ROOT_DIR);
  });
}

export async function copyAndTranslateAllPages(ROOT_DIR: string) {
  const pagesDirGlob = path.join(ROOT_DIR, "pages/**/*.ts");
  console.log("- building pages: ", pagesDirGlob);
  const project = new Project();
  const files = project.addSourceFilesAtPaths(pagesDirGlob);
  try {
    const filesConverted = files.map(translateMatch);
    await Promise.all(filesConverted.map((f) => saveFile(ROOT_DIR, f)));
    const routeModulePaths = filesConverted.map((f) => f.getFilePath());
    await saveRoutesFile(ROOT_DIR, routeModulePaths);
  } catch (error) {
    console.error(error);
  }
}

async function saveRoutesFile(ROOT_DIR: string, routeModulePaths: string[]) {
  const routeFilePath = path.join(ROOT_DIR, ".ngext", "src", "routes.ts");
  const project = new Project();
  const tsRouteFile = project.createSourceFile(routeFilePath, "", {
    overwrite: true,
  });
  const routePathsRelative: RouteObjs[] = routeModulePaths.map((p) => {
    const pagesDir = path.join(ROOT_DIR, 'pages');
    const modulePathNoTs = stripTsExtension(p);
    const pageFilePath = convertToRelativePath(ROOT_DIR, modulePathNoTs);
    const pageRoute = convertToRelativePath(pagesDir, modulePathNoTs);
    return {
      route: pageRoute.slice(2),
      file: pageFilePath,
    };
  });
  const ftrans = createRoutesFile(tsRouteFile, routePathsRelative);
  console.log("- saving routes file: ", routeFilePath);
  ftrans.formatText();
  ftrans.save();
}

async function saveFile(ROOT_DIR: string, file: SourceFile) {
  const filePath = file.getFilePath();
  const filePathNew = convertToTargetPath(ROOT_DIR, filePath);
  console.log("--> translating: " + filePath + "  " + filePathNew);
  const dirPath = path.dirname(filePathNew);
  file.formatText();
  const fileText = file.getText();
  await fs.mkdirp(dirPath);
  await saveIfUpdated(filePathNew, fileText)
}

async function saveIfUpdated(filePathNew: string, newText: string) {
  function write() {
    return fs.writeFile(filePathNew, newText);
  }
  const exists = await fs.pathExists(filePathNew);
  if (!exists) {
    return write();
  }
  const current = await fs.readFile(filePathNew);
  const currentText = current.toString();
  if (newText !== currentText) {
    return write();
  }
}

function translateMatch(sourceFile: SourceFile): SourceFile {
  const sourceFileConverted = processComponentSourceFile(sourceFile);
  return sourceFileConverted;
}

function convertToTargetPath(
  ROOT_DIR: string,
  inputFilePath: string
): string {
  const baseRelativePath = convertToRelativePath(ROOT_DIR, inputFilePath);
  const ngextSrc = path.join(ROOT_DIR, ".ngext", "src")
  const targetPath = path.join(ngextSrc, baseRelativePath);
  return targetPath;
}
