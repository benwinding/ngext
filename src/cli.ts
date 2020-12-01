import commander from "commander";
import path from "path";
import fs from "fs-extra";
import { exec } from "child_process";
import {
  copyAndTranslateAllPages,
  watchCopyAndTranslateAllPages,
} from "./transformers";
import { InitNgextDir, MakeNewProject } from "./initialize/create-template";

const execCmd = (cmd, directory) => {
  console.log(`running $ "${cmd}" in dir: [${directory}]`);
  const child = exec(cmd, { cwd: directory });

  child.stdout.on("data", function (data) {
    console.log(data);
  });
  child.stderr.on("data", function (data) {
    console.error(data);
  });
  return new Promise((resolve, reject) => {
    child.on("close", resolve);
  });
};

const ROOT_DIR = process.cwd();
const INTERMEDIATE_DIR = path.join(ROOT_DIR, ".ngext");
const NG_PATH = path.join(ROOT_DIR, "node_modules", ".bin", "ng");

// console.log("        ROOT_DIR:", ROOT_DIR);
// console.log("INTERMEDIATE_DIR:", INTERMEDIATE_DIR);
// console.log("         NG_PATH:", NG_PATH);

commander
  .command("build")
  .description("Builds the ngext app")
  .action(async () => {
    CheckAngularCli();
    await InitNgextDir(ROOT_DIR);
    await copyAndTranslateAllPages(ROOT_DIR);
    await execCmd(`${NG_PATH} build`, INTERMEDIATE_DIR);
    await Copy404File(INTERMEDIATE_DIR);
  });

async function Copy404File(INTERMEDIATE_DIR: string) {
  const sourceHtmlFile = path.join(INTERMEDIATE_DIR, 'dist', 'index.html');
  const targetHtmlFile = path.join(INTERMEDIATE_DIR, 'dist', '404.html');
  console.log('copying fallback file:')
  console.log('  src=', sourceHtmlFile)
  console.log(' dest=', targetHtmlFile)
  return fs.copyFile(sourceHtmlFile, targetHtmlFile);
}

commander
  .command("dev")
  .description("Runs the ngext app locally")
  .action(async () => {
    CheckAngularCli();
    await InitNgextDir(ROOT_DIR);
    await copyAndTranslateAllPages(ROOT_DIR);
    watchCopyAndTranslateAllPages(ROOT_DIR);
    execCmd(`${NG_PATH} serve`, INTERMEDIATE_DIR);
  });

commander
  .command("new [ProjectName]")
  .description("Creates a new project")
  .action(async (ProjectName) => {
    const PROJECT_DIR = path.join(process.cwd(), ProjectName || '');
    console.log('creating new project at: ', PROJECT_DIR)
    await MakeNewProject(PROJECT_DIR);
  });

function CheckAngularCli() {
  if (!fs.existsSync(NG_PATH)) {
    throw 'ng not found: @angular/cli was not found in current project'
  };
}

export { commander };
