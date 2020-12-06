import copy from "copy-template-dir";
import path from "path";
import fs from "fs-extra";

import simpleGit from "simple-git";

import { convertToRelativePath } from "../utils";
import { NgextConfig } from "./config-reader";

export async function InitNgextDir(ROOT_DIR: string, conf: NgextConfig) {
  const PROJECT_NAME = path.basename(ROOT_DIR);
  const vars = { 
    PROJECT_NAME: PROJECT_NAME, 
    "linkItem.path": "{{linkItem.path}}",
    PROJECT_ENV: JSON.stringify(conf.env)
  };
  const inDir = path.join(__dirname, "..", "..", "templates", ".ngext");
  const outDir = path.join(ROOT_DIR, ".ngext");
  await CopyDir(inDir, outDir, vars, false);
}

export async function MakeNewProject(TARGET_DIR: string) {
  const PROJECT_NAME = path.basename(TARGET_DIR);
  const vars = { PROJECT_NAME: PROJECT_NAME };
  const inDir = path.join(__dirname, "..", "..", "templates", "new-project");
  const outDir = path.join(TARGET_DIR);
  const isEmpty = await IsTargetEmpty(outDir);
  if (!isEmpty) {
    console.error(
      "target directory for project is not empty!   path: " + TARGET_DIR
    );
    return;
  }
  await CopyDir(inDir, outDir, vars, true);
  await GitInit(outDir);
}

async function IsTargetEmpty(outDir: string): Promise<boolean> {
  const exists = await fs.pathExists(outDir);
  if (!exists) {
    return true;
  }
  const files = await fs.readdir(outDir);
  const noFiles = files.length === 0;
  return noFiles;
}

async function GitInit(outDir: string) {
  return new Promise((resolve, reject) =>
    simpleGit(outDir).init({}, (err: any) => {
      err ? reject(err) : resolve();
    })
  );
}

async function CopyDir(
  inDir: string,
  outDir: string,
  vars: {},
  hasLogging: boolean
) {
  return new Promise((resolve, reject) => {
    copy(inDir, outDir, vars, (err: any, createdFiles: string[]) => {
      if (err) {
        return reject(err);
      }
      if (hasLogging) {
        createdFiles.forEach((filePath) => {
          const relPath = convertToRelativePath(outDir, filePath);
          console.log(`-> created ${relPath}`);
        });
        console.log("done!");
      }
      resolve();
    });
  });
}
