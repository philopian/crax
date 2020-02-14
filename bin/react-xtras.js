#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const init = require("../scripts/init");
const component = require("../scripts/component");

// Delegate the commands to run
const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  x => x === "component" || x === "eslint" || x === "storybook" || x === "help"
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
switch (script) {
  case "init":
    init();
    break;
  case "component":
    // TODO
    console.log("..component...");
    component();
    break;
  case "eslint":
    // TODO
    console.log("..eslint...");
    break;
  case "storybook":
    // TODO
    console.log("..storybook...");
    break;
  case "help": {
    // TODO
    console.log("..help...");
    break;
  }
  default:
    console.log(
      chalk.whiteBright.bgRed(" Unknown command: "),
      `react-xtras ${script}`
    );
    break;
}
//===============================================================================================================
