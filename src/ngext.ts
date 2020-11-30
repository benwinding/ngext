#!/usr/bin/env node

import * as path from "path";
const { commander } = require(path.resolve(__dirname, "./cli"));

commander.parse(process.argv);
