import copy from "copy-template-dir";
import path from "path";
import fs from "fs-extra";

import simpleGit from "simple-git";

import { convertToRelativePath } from "../utils";
import { NgextConfigResolved } from "../types/ngext-config";

export async function InitNgextDir(ROOT_DIR: string, conf: NgextConfigResolved) {
  const PROJECT_NAME = path.basename(ROOT_DIR);
  const globalModule = GetGlobalModule(ROOT_DIR);
  const vars = { 
    PROJECT_NAME: PROJECT_NAME, 
    "linkItem.path": "{{linkItem.path}}",
    PROJECT_ENV: JSON.stringify(conf.env),
    PROJECT_SCRIPTS: JSON.stringify(conf.scriptsResolved || []),
    PROJECT_STYLES: JSON.stringify(conf.stylesResolved || []),
    PROJECT_BASEHREF: conf.baseHref || '/',
    PROJECT_HEAD_APPEND: conf.headAppend || '',
    GLOBAL_MODULE_IMPORT: globalModule.import,
    GLOBAL_MODULE_NAME: globalModule.name,
  };
  const inDir = path.join(__dirname, "..", "..", "templates", ".ngext");
  const outDir = path.join(ROOT_DIR, ".ngext");
  await CopyDir(inDir, outDir, vars, false);
}

type GlobalModule = {import: string, name: string}

function GetGlobalModule(ROOT_DIR: string): GlobalModule {
  const globalModule = path.join(ROOT_DIR, "global", "global.module.ts");
  console.log('-> Checking for GlobalModule at: ' + globalModule);
  if (!fs.pathExistsSync(globalModule)) {
    console.log('-> global module not found');
    return {
      'import': '',
      name: '',
    }
  }
  console.log('-> global module found, using default export from file: ' + globalModule);
  return {
    import: 'import GlobalModule from "~/global/global.module.ts"',
    name: 'GlobalModule',
  }
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
