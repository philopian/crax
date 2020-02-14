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
    choices: ["css", "sass", "styl"]
  },
  // TODO: question if user want to use storybook
  {
    type: "confirm",
    name: "storybook",
    message: "Do you want to use Storybook?",
    default: true
  }
];

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

    if (storybook) {
      // =====================================================================================
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
        const storybookAddons = `npm i -D @storybook/addon-a11y @storybook/addon-actions @storybook/addon-knobs @storybook/addon-docs prop-types`;
        exec(storybookAddons, error => {
          if (error) {
            console.log(error.stack);
            console.log("Error code: " + error.code);
            console.log("Signal received: " + error.signal);
          }
          succeedSpinner();
        });
      });

      // =====================================================================================
    }
  });
};

// const ss = () => {
//   // TODO: Add some scripts to your package.json
//   const ROOT_DIR = path.join(process.cwd());
//   const packageJsonPath = path.join(ROOT_DIR, "package.json");
//   console.log(packageJsonPath);

//   // fs.readFileSync();
//   // TODO: Configure Storybook
//   const dotStorybook = path.join(ROOT_DIR, ".storybook");
//   if (!fs.existsSync(dotStorybook)) {
//     fs.mkdirSync(dotStorybook);

//     // TODO: copy storybook files
//     const storybookTemplateDir = path.join(__dirname, "../templates/storybook");

//     console.log(path.join(storybookTemplateDir, "addons.js"), path.join(dotStorybook, "addons.js"));
//     fs.copySync(path.join(storybookTemplateDir, "addons.js"), path.join(dotStorybook, "addons.js"));
//     fs.copySync(path.join(storybookTemplateDir, "config.js"), path.join(dotStorybook, "config.js"));
//     fs.copySync(path.join(storybookTemplateDir, "presets.js"), path.join(dotStorybook, "presets.js"));
//     fs.copySync(path.join(storybookTemplateDir, "webpack.config.js"), path.join(dotStorybook, "webpack.config.js"));
//   }
// };

module.exports = init;
