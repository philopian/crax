const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const _ = require("lodash");
const { log } = console;

const { multiCaseInput, appendToFile, makeTemplateFile, readCraxFile } = require("./utils");

// Ask questions
// Prompt types: [list, rawlist, expand, checkbox, confirm, input, password, editor]
const promptQuestions = [
  {
    type: "command",
    name: "componentName",
    message: "Give your component a name!"
  },
  {
    type: "list",
    name: "componentType",
    message: "What type of component do you want?",
    choices: ["Hooks component", "Class based component", "Stateless component"]
  },
  {
    type: "list",
    name: "componentTest",
    message: "What base testing framework do you want to use?",
    choices: ["React Testing Library", "Jest & Enzyme", "Jest & Enzyme with snapshots"]
  }
];

const createNewComponent = () => {
  // Read the .crax file to get the path for the new components
  const { componentDir, styles, storybook } = readCraxFile();

  if (!componentDir) log(chalk.bgRed(" Error ") + ` There's no .crax file present`);

  // Ask questions about a new component
  inquirer.prompt(promptQuestions).then(answers => {
    answers.componentName = multiCaseInput(answers.componentName);
    const { componentType, componentName, componentTest } = answers;

    // Where to create the component folder
    const newDir = path.join(fs.realpathSync(process.cwd()), componentDir, answers.componentName.titleCase);

    // Check to see if the directory doesn't exist
    if (!fs.existsSync(newDir)) {
      // Make the component directory
      fs.mkdirSync(newDir);

      // Create all the files
      const files = {
        component: `${componentName.titleCase}.js`,
        test: `${componentName.titleCase}.test.js`,
        styles: `styles.${styles}`,
        readme: `${componentName.titleCase}.md`,
        storybook: `${componentName.titleCase}.stories.js`
      };

      const templates = {
        hooks: "component-hooks.js",
        class: "component-class.js",
        stateless: "component-stateless.js",
        reactTestingLibrary: "react-testing-library.test.js",
        enzyme: "enzyme.test.js",
        enzymeSnapshots: "enzyme-snapshots.test.js",
        css: "styles.css",
        scss: "styles.scss",
        stylus: "styles.styl",
        readme: "readme.md",
        storybook: "storybook.stories.js"
      };

      // Component type
      switch (componentType) {
        case "Hooks component":
          makeTemplateFile(files.component, templates.hooks, newDir, {
            ...componentName,
            styles
          });
          break;
        case "Class based component":
          makeTemplateFile(files.component, templates.class, newDir, {
            ...componentName,
            styles
          });
          break;
        case "Stateless component":
          makeTemplateFile(files.component, templates.stateless, newDir, {
            ...componentName,
            styles
          });
          break;
        default:
          makeTemplateFile(files.component, templates.class, newDir, {
            ...componentName,
            styles
          });
          break;
      }

      // Test type
      switch (componentTest) {
        case "React Testing Library":
          makeTemplateFile(files.test, templates.reactTestingLibrary, newDir, componentName);
          break;
        case "Jest & Enzyme":
          makeTemplateFile(files.test, templates.enzyme, newDir, componentName);
          break;
        case "Jest & Enzyme with snapshots":
          makeTemplateFile(files.test, templates.enzymeSnapshots, newDir, componentName);
          break;
        default:
          makeTemplateFile(files.test, templates.test, newDir, componentName);
          break;
      }

      // Styles
      switch (styles) {
        case "css":
          makeTemplateFile(files.styles, templates.css, newDir, componentName);
          break;
        case "scss":
          makeTemplateFile(files.styles, templates.scss, newDir, componentName);
          break;
        case "styl":
          makeTemplateFile(files.styles, templates.stylus, newDir, componentName);
          break;
      }

      // Readme
      makeTemplateFile(files.readme, templates.readme, newDir, componentName);

      // Storybook
      if (storybook) makeTemplateFile(files.storybook, templates.storybook, newDir, componentName);
    } else {
      log(chalk.bgRed(" Directory Already Exists ") + ` -> ${newDir}`);
    }
  });
};

module.exports = createNewComponent;
