import commander from "commander";
import path from "path";
import fs from "fs-extra";
import { spawn } from "child_process";
import {
  copyAndTranslateAllPages,
  watchCopyAndTranslateAllPages,
} from "./transformers";
import { InitNgextDir, MakeNewProject } from "./initialize/create-template";
import { ReadConfig } from "./initialize/config-reader";
import { NgextConfig } from "types/ngext-config";
const packageJson = require(path.join(__dirname, "../package.json"));
import stream from 'stream';

const execCmd = (cmd, directory) => {
  console.log(`[running command] $ "${cmd}" in dir: [${directory}]`);

  const stdout = new stream.Writable();
  stdout._write = function (data) {
    process.stdout.write(data);
  };
  const stderr = new stream.Writable();
  stderr._write = function (data) {
    process.stderr.write(data);
  };
  const child = spawn(cmd, { cwd: directory, shell: true, stdio: 'inherit' });
  child.stdout?.pipe(stdout);
  child.stderr?.pipe(stderr);

  return new Promise((resolve, reject) => {
    child.on("close", resolve);
  });
};

const ROOT_DIR = process.cwd();
const INTERMEDIATE_DIR = path.join(ROOT_DIR, ".ngext");
const NG_PATH = path.join(ROOT_DIR, "node_modules", ".bin", "ng");

commander
  .command("new [ProjectName]")
  .description("Creates a new project")
  .action(async (ProjectName) => {
    const PROJECT_DIR = path.join(process.cwd(), ProjectName || "");
    console.log("creating new project at: ", PROJECT_DIR);
    await MakeNewProject(PROJECT_DIR);
  });

commander
  .command("build")
  .description("Builds the ngext app")
  .action(async () => {
    CheckAngularCli();
    const conf = await ReadConfig(ROOT_DIR);
    await InitNgextDir(ROOT_DIR, conf);
    await copyAndTranslateAllPages(ROOT_DIR, conf);
    await execCmd(`"${NG_PATH}" build`, INTERMEDIATE_DIR);
    await Copy404File(INTERMEDIATE_DIR, conf);
    await CopyBuild(INTERMEDIATE_DIR, ROOT_DIR, conf);
  });

commander
  .command("export")
  .description("Exports the ngext app with SSR")
  .action(async () => {
    CheckAngularCli();
    const conf = await ReadConfig(ROOT_DIR);
    await InitNgextDir(ROOT_DIR, conf);
    await copyAndTranslateAllPages(ROOT_DIR, conf);
    await execCmd(`"${NG_PATH}" run ngext:prerender`, INTERMEDIATE_DIR);
    await Copy404File(INTERMEDIATE_DIR, conf);
    await CopyBuild(INTERMEDIATE_DIR, ROOT_DIR, conf);
  });

commander.version(packageJson.version, "-v, --version");

async function Copy404File(INTERMEDIATE_DIR: string, conf: NgextConfig) {
  if (!conf.useFallback404) {
    console.log("fallback 404 page disabled, not copying index.html");
    return;
  }
  const sourceHtmlFile = path.join(INTERMEDIATE_DIR, "dist", "index.html");
  const targetHtmlFile = path.join(INTERMEDIATE_DIR, "dist", "404.html");
  console.log("copying fallback file:");
  console.log("  src=", sourceHtmlFile);
  console.log(" dest=", targetHtmlFile);
  return fs.copyFile(sourceHtmlFile, targetHtmlFile);
}

async function CopyBuild(
  INTERMEDIATE_DIR: string,
  ROOT_DIR: string,
  conf: NgextConfig
) {
  const outputDir = conf.dist ? conf.dist : "dist";
  if (!conf.dist) {
    console.log('"dist" not specified in ngext.config, using: ' + outputDir);
  }
  const sourceBuild = path.join(INTERMEDIATE_DIR, "dist");
  const targetBuild = path.join(ROOT_DIR, outputDir);

  try {
    fs.removeSync(targetBuild);
  } catch (error) {
    console.error(`--> Error deleting dist target: "${targetBuild}"`, error);
  }

  console.log("--> copying dist files:");
  console.log("  src=", sourceBuild);
  console.log(" dest=", targetBuild);
  return fs.copy(sourceBuild, targetBuild, {
    overwrite: true,
    recursive: true,
  });
}

commander
  .command("dev")
  .description("Runs the ngext app locally")
  .option("-p, --port <PORT>", "Port for the dev server (default is 4200)")
  .action(async (options) => {
    CheckAngularCli();
    const conf = await ReadConfig(ROOT_DIR);
    await InitNgextDir(ROOT_DIR, conf);
    await copyAndTranslateAllPages(ROOT_DIR, conf);
    watchCopyAndTranslateAllPages(ROOT_DIR, conf);
    const OPTIONS = options.port ? `--port ${options.port}` : "";
    execCmd(`"${NG_PATH}" serve ${OPTIONS}`, INTERMEDIATE_DIR);
  });

function CheckAngularCli() {
  if (!fs.existsSync(NG_PATH)) {
    throw "ng not found: @angular/cli was not found in current project";
  }
}

export { commander };
