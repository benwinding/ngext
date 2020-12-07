import path from "path";
import fs from "fs-extra";

export interface NgextConfig {
  env?: {};
  scripts?: [];
  styles?: [];
}

const defaultConfig: NgextConfig = {
  env: {}
}

export async function ReadConfig(ROOT_DIR: string) {
  const confFile = path.join(ROOT_DIR, "ngext.config.js");
  if (!fs.pathExistsSync(confFile)) {
    console.log('- no configuration file found at: ' + confFile)
    return defaultConfig;
  }
  const config = require(confFile) as NgextConfig;
  console.log('-> ngext.config.js: ', JSON.stringify(config))
  return config;
}
