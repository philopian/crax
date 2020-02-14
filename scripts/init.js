const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const _ = require("lodash");
const chalk = require("chalk");
const { exec } = require("child_process");

const { log } = console;

const { readRxrcFile } = require("./utils");
const { startSpinner, stopSpinner, succeedSpinner } = require("./spinner");

// Ask questions
// Prompt types: [list, rawlist, expand, checkbox, confirm, input, password, editor]
// https://www.npmjs.com/package/inquirer#prompt-types
const promptQuestions = [
  {
    type: "command",
    name: "componentDir",
    message: "Where do you want to create new components?",
    default: "src/components"
  },
  {
    type: "list",
    name: "styles",
    message: "What style types do you want to use?",
    default: "src/components",
    choices: ["css", "scss", "styl"]
  },
  {
    type: "confirm",
    name: "storybook",
    message: "Do you want to use Storybook?",
    default: true
  }
];

const updateStoryConfigAddons = () => {
  const mainStorybook = path.join(process.cwd(), ".storybook/main.js");
  fs.readFile(mainStorybook, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(
      "addons: [",
      `addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-a11y/register",
    "@storybook/addon-docs",`
    );
    fs.writeFileSync(mainStorybook, result, "utf8");
  });
};

const init = () => {
  // Read the .rxrc file to get the path for the new components
  const rxrcContents = readRxrcFile();

  // Inform the user that there's already a .rxrc file present
  if (rxrcContents) {
    log(chalk.bgRed(" File exist ") + ` There's already a .rxrc file present`);
    return;
  }

  // Ask questions about a new component
  inquirer.prompt(promptQuestions).then(answers => {
    const { componentDir, styles, storybook } = answers;

    // Create rxrc file with the component dir path
    const rxrcPath = `${process.cwd()}/.rxrc`;
    fs.writeFileSync(rxrcPath, JSON.stringify({ componentDir, styles, storybook }, null, 1), "utf-8");

    // Create the component dir if it doesn't already exist
    const DIR = path.join(process.cwd(), componentDir);
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

    // TODO: if use selects scss `$ npm i node-sass`

    if (storybook) {
      // Install storybook
      startSpinner("Configuring Storybook", "");

      const cmd = `npx -p @storybook/cli sb init --type react_scripts`;
      exec(cmd, error => {
        if (error) {
          console.log(error.stack);
          console.log("Error code: " + error.code);
          console.log("Signal received: " + error.signal);
        }
        succeedSpinner();

        startSpinner("Configuring Storybook Addons", "");
        const installNodeSass = styles === "scss" ? "node-sass" : ""; // Install node-sass if user chooses sass styles
        const storybookAddons = `npm i -D @storybook/addon-a11y @storybook/addon-actions @storybook/addon-knobs @storybook/addon-docs prop-types ${installNodeSass}`;
        exec(storybookAddons, error => {
          if (error) {
            console.log(error.stack);
            console.log("Error code: " + error.code);
            console.log("Signal received: " + error.signal);
          }
          succeedSpinner();

          // Add additional Addons to the storybook config
          updateStoryConfigAddons();
        });
      });
    }
  });
};

module.exports = init;
