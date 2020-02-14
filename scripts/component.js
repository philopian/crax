const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const _ = require("lodash");

const {
  multiCaseInput,
  appendToFile,
  makeTemplateFile,
  readRxrcFile
} = require("./utils");

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
    choices: [
      "Class based component",
      "Stateless component"
      // "Hooks"
      // 'Connected component (depends on react-redux)'
    ]
  },
  {
    type: "list",
    name: "componentTest",
    message: "What base testing framework do you want to use?",
    choices: [
      "React Testing Library",
      "Jest & Enzyme",
      "Jest & Enzyme with snapshots"
    ]
  }
];

const init = () => {
  // TODO: Read the .rxrc file to get the path for the new components
  readRxrcFile();

  // TODO: ask questions about a new component
  inquirer.prompt(promptQuestions).then(answers => {
    answers.componentName = multiCaseInput(answers.componentName);
    const { componentType, componentName, componentTest } = answers;

    // Where to create the component folder
    let folderName = "components";
    if (componentType === "Connected component (depends on react-redux)") {
      folderName = "pages";
    }
    const newDir = path.join(
      fs.realpathSync(process.cwd()),
      `src/${folderName}/` + answers.componentName.titleCase
    );

    // Check to see if the directory doesn't exist
    if (!fs.existsSync(newDir)) {
      // Make the component directory
      fs.mkdirSync(newDir);

      // Create all the files
      const files = {
        component: `${componentName.titleCase}.js`,
        test: `${componentName.titleCase}.test.js`,
        stylus: "styles.styl",
        readme: `${componentName.titleCase}.md`,
        storybook: `${componentName.titleCase}.stories.js`
      };
      const templates = {
        class: "component-class.js",
        stateless: "component-stateless.js",
        reactTestingLibrary: "react-testing-library.test.js",
        enzyme: "enzyme.test.js",
        enzymeSnapshots: "enzyme-snapshots.test.js",
        stylus: "stylus.styl",
        readme: "readme.md",
        storybook: "storybook.stories.js"
      };

      // Component type
      switch (componentType) {
        case "Class based component":
          makeTemplateFile(
            files.component,
            templates.class,
            newDir,
            componentName
          );
          break;
        case "Stateless component":
          makeTemplateFile(
            files.component,
            templates.stateless,
            newDir,
            componentName
          );
          break;
        // case 'Connected component (depends on react-redux)':
        //   makeTemplateFile(files.component, templates.connected, newDir, componentName)
        //   makeTemplateFile(files.stories, templates.conStories, newDir, componentName)
        //   break
        default:
          makeTemplateFile(
            files.component,
            templates.class,
            newDir,
            componentName
          );
          break;
      }

      // Test type
      switch (componentTest) {
        case "React Testing Library":
          makeTemplateFile(
            files.test,
            templates.reactTestingLibrary,
            newDir,
            componentName
          );
          break;
        case "Jest & Enzyme":
          makeTemplateFile(files.test, templates.enzyme, newDir, componentName);
          break;
        case "Jest & Enzyme with snapshots":
          makeTemplateFile(
            files.test,
            templates.enzymeSnapshots,
            newDir,
            componentName
          );
          break;
        default:
          makeTemplateFile(files.test, templates.test, newDir, componentName);
          break;
      }
      // makeTemplateFile(files.test, templates.test, newDir, componentName)
      makeTemplateFile(files.readme, templates.readme, newDir, componentName);
      makeTemplateFile(files.stylus, templates.stylus, newDir, componentName);
      makeTemplateFile(
        files.storybook,
        templates.storybook,
        newDir,
        componentName
      );

      // Append the component to the main.js file
      const newContent = `\nexport { default as ${componentName.titleCase} } from './components/${componentName.titleCase}/${componentName.titleCase}.js'\n`;
      const mainJsPath = path.join(__dirname, "../../src/main.js");
      appendToFile("main.js", mainJsPath, newContent);
    } else {
      log(chalk.bgRed(" Directory Already Exists ") + ` -> ${newDir}`);
    }
  });
};

module.exports = init;
