import * as path from "path";
import * as fs from "fs-extra";
import { Project, SourceFile } from "ts-morph";
import { NgextPage } from "../types/ngext-page";
import watch from "glob-watcher";

import { ProcessComponentSourceFile } from "./transformers";
import { CreateRoutesFile, MakeRouteObjs } from "./createRoutesFile";
import { convertToRelativePath } from "../utils";
import { NgextConfig } from "initialize/config-reader";

export async function watchCopyAndTranslateAllPages(
  ROOT_DIR: string,
  ngextConf: NgextConfig
) {
  const pagesDirGlob = path.join(ROOT_DIR, "pages/**/*.ts");
  console.log("- watching pages: ", pagesDirGlob);
  const watcher = watch([pagesDirGlob]);
  watcher.on("change", (e, filename) => {
    console.log("-> file page changed: ", filename);
    copyAndTranslateAllPages(ROOT_DIR, ngextConf);
  });
}

export async function copyAndTranslateAllPages(
  ROOT_DIR: string,
  ngextConf: NgextConfig
) {
  const pagesDirGlob = path.join(ROOT_DIR, "pages/**/*.ts");
  console.log("- building pages: ", pagesDirGlob);
  const project = new Project();
  const files = project.addSourceFilesAtPaths(pagesDirGlob);
  try {
    const filesConverted = files.map(translateMatch);
    await Promise.all(
      filesConverted.map((f) => saveFile(ROOT_DIR, f.sourceFile))
    );
    await saveRoutesFile(ROOT_DIR, filesConverted);
  } catch (error) {
    console.error(error);
  }
}

async function saveRoutesFile(ROOT_DIR: string, routeModuleFiles: NgextPage[]) {
  const routeFilePath = path.join(ROOT_DIR, ".ngext", "src", "routes.ts");
  const project = new Project();
  const tsRouteFile = project.createSourceFile(routeFilePath, "", {
    overwrite: true,
  });
  const routeObjs = MakeRouteObjs(ROOT_DIR, routeModuleFiles);
  const ftrans = CreateRoutesFile(tsRouteFile, routeObjs);
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
  await saveIfUpdated(filePathNew, fileText);
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

function translateMatch(sourceFile: SourceFile): NgextPage {
  const sourceFileConverted = ProcessComponentSourceFile(sourceFile);
  return sourceFileConverted;
}

function convertToTargetPath(ROOT_DIR: string, inputFilePath: string): string {
  const baseRelativePath = convertToRelativePath(ROOT_DIR, inputFilePath);
  const ngextSrc = path.join(ROOT_DIR, ".ngext", "src");
  const targetPath = path.join(ngextSrc, baseRelativePath);
  return targetPath;
}
