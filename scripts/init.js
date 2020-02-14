const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const _ = require("lodash");
const chalk = require("chalk");

const { log } = console;

const { readRxrcFile } = require("./utils");

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
    choices: ["css", "Sass", "Stylus"]
  }
  // TODO: question if user want to use storybook
  // {
  //   type: "confirm",
  //   name: "storybook",
  //   message: "Do you want to use Storybook?",
  //   default: true
  // }
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
    const { componentDir, styles } = answers;

    // Create rxrc file with the component dir path
    const rxrcPath = `${process.cwd()}/.rxrc`;
    fs.writeFileSync(
      rxrcPath,
      JSON.stringify({ componentDir, styles }, null, 1),
      "utf-8"
    );

    // Create the component dir if it doesn't already exist
    const DIR = path.join(process.cwd(), componentDir);
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  });
};

module.exports = init;
