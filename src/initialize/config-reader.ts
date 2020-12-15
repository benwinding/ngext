import path from "path";
import fs from "fs-extra";
import { GlobalModule, NgextConfig, NgextConfigResolved } from "../types/ngext-config";
import globby from 'globby';

const defaultConfig: NgextConfig = {
  env: {},
  useFallback404: true
};

export async function ReadConfig(ROOT_DIR: string): Promise<NgextConfigResolved> {
  const config = GetConfigFile(ROOT_DIR);
  const resolved = await ResolveConfig(ROOT_DIR, config);
  return resolved;
}

function GetConfigFile(ROOT_DIR: string): NgextConfig {
  const confFile = path.join(ROOT_DIR, "ngext.config.js");
  if (!fs.pathExistsSync(confFile)) {
    console.log("- no configuration file found at: " + confFile);
    return defaultConfig;
  }
  const config = require(confFile) as NgextConfig;
  console.log("-> ngext.config.js: ", JSON.stringify(config));
  return config || defaultConfig;
}

async function ResolveConfig(ROOT_DIR: string, conf: NgextConfig): Promise<NgextConfigResolved> {
  const confResolved: NgextConfigResolved = {
    ...conf
  }
  confResolved.scriptsResolved = (conf.scripts || []).map(s => '../' + s);
  const stylesGlob = path.join(ROOT_DIR, 'styles', '**.scss');
  confResolved.stylesResolved = await globby(stylesGlob);
  console.log("--> resolved styles: ", confResolved.stylesResolved);
  confResolved.globalModule = GetGlobalModule(ROOT_DIR);
  return confResolved;
}

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
