const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const chalk = require("chalk");

const { log } = console;

const multiCaseInput = val => {
  return {
    input: val,
    titleCase:
      val.indexOf(" ") > -1
        ? _.startCase(_.toLower(val))
            .split(" ")
            .join("")
        : _.startCase(val).replace(" ", ""),
    kebabCase: _.kebabCase(val),
    camelCase: _.camelCase(val)
  };
};

const writeFile = (fileName, filePath, fileContents) => {
  fs.writeFile(filePath, fileContents, "utf8", err => {
    if (err) return log(chalk.bgRed(err));
    log(chalk.bgCyan(" File created ") + ` ${fileName}`);
  });
};

const replaceNames = (fileContents, fileNames) => {
  Object.keys(fileNames).map(key => {
    fileContents = fileContents.replace(
      new RegExp(`___${key}___`, "g"),
      fileNames[key]
    );
  });
  return fileContents;
};

const appendToFile = (fileName, filePath, newContent) => {
  fs.appendFile(filePath, newContent, function(err) {
    if (err) log(chalk.bgRed(" ERROR Appended content to ") + ` ${fileName}`);
    log(chalk.bgCyan(" Appended content to ") + ` ${fileName}`);
  });
};

const makeTemplateFile = (fileName, templateName, dir, componentName) => {
  const filePath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(
    path.join(__dirname, `./templates/${templateName}`),
    "utf8"
  );
  const fileContentsWithVars = replaceNames(fileContents, componentName);
  writeFile(fileName, filePath, fileContentsWithVars);
};

const readRxrcFile = () => {
  const rc = `${process.cwd()}/.rxrc`;
  if (fs.existsSync(rc)) {
    return fs.readFileSync(rc, "utf8");
  }

  // TODO: create an .rxrc file
  console.log("NO... .rxrc file, CREATE ONE");
  return false;
};

module.exports = {
  multiCaseInput,
  writeFile,
  replaceNames,
  appendToFile,
  makeTemplateFile,
  readRxrcFile
};
