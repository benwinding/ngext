import { join } from "path";
import * as fs from "fs-extra";
import { Project, SourceFile } from "ts-morph";
import { processPageModuleSourceFile } from "./transformers";

const project = new Project();

export async function copyAndTranslatePages() {
  const pagesDir = join(__dirname, "../pages/**/*.ts");
  const files = project.addSourceFilesAtPaths(pagesDir)
  const filesConverted = files.map(translateMatch);
  await Promise.all(filesConverted.map(saveFile))
}

async function saveFile(file: SourceFile) {
  const filePath = file.getFilePath();
  const filePathNew = convertToTargetPath(filePath);
  const fileText = file.getText();
  return fs.writeFile(filePathNew, fileText);
} 

function convertToTargetPath(inputFilePath: string): string {
  const baseDir = join(__dirname, "../pages");
  const baseRelativePath = inputFilePath.slice(baseDir.length);
  const targetPath = join(__dirname, "../.intermediate/src/pages", baseRelativePath);
  
  return targetPath;
}

function translateMatch(sourceFile: SourceFile): SourceFile {
  console.log("translating: " + sourceFile.getFilePath());
  const sourceFileConverted = processPageModuleSourceFile(sourceFile); 
  return sourceFileConverted;
}


