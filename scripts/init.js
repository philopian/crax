const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const _ = require("lodash");
const chalk = require("chalk");
const { exec } = require("child_process");

const { log } = console;

const { readCraxFile } = require("./utils");
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
  const mainStorybookPath = path.join(process.cwd(), ".storybook/main.js");
  const data = require(mainStorybookPath);

  // Add more storybook addons
  data.addons = [...data.addons, "@storybook/addon-knobs", "@storybook/addon-a11y/register", "@storybook/addon-docs"];

  let mainStorybook = JSON.stringify(data, null, 1);
  mainStorybook = `module.exports = ${mainStorybook}`;
  fs.writeFileSync(mainStorybookPath, mainStorybook, "utf8");
};

const init = () => {
  // Read the .crax file to get the path for the new components
  const craxContents = readCraxFile();

  // Inform the user that there's already a .crax file present
  if (craxContents) {
    log(chalk.bgRed(" File exist ") + ` There's already a .crax file present`);
    return;
  }

  // Ask questions about a new component
  inquirer.prompt(promptQuestions).then(answers => {
    const { componentDir, styles, storybook } = answers;

    // Create crax file with the component dir path
    const cfraxPath = `${process.cwd()}/.crax`;
    fs.writeFileSync(cfraxPath, JSON.stringify({ componentDir, styles, storybook }, null, 1), "utf-8");

    // Create the component dir if it doesn't already exist
    const DIR = path.join(process.cwd(), componentDir);
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

    if (storybook) {
      // Install storybook
      startSpinner("Configuring Storybook", "");

      const cmd = `npx -p @storybook/cli sb init --type react_scripts`;
      exec(cmd, error => {
        if (error) console.log(error);
        succeedSpinner();

        startSpinner("Configure", " Storybook Addons");
        const installNodeSass = styles === "scss" ? "node-sass" : ""; // Install node-sass if user chooses sass styles
        const npmCmd = `npm i -D @storybook/addon-a11y @storybook/addon-actions @storybook/addon-knobs @storybook/addon-docs prop-types ${installNodeSass}`;
        exec(npmCmd, error => {
          if (error) console.log(error);

          succeedSpinner();

          // Add additional Addons to the storybook config
          updateStoryConfigAddons();
        });
      });
    } else if (styles === "scss") {
      startSpinner("Configure", " node-sass");
      const npmCmd = `npm i -D prop-types node-sass`;
      exec(npmCmd, error => {
        if (error) console.log(error);
        succeedSpinner();
      });
    }
  });
};

module.exports = init;
