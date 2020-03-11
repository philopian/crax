const ora = require("ora");
const chalk = require("chalk");

// Spinner config
const spinner = ora();
spinner.color = "cyan"; // ('black' 'red' 'green' 'yellow' 'blue' 'magenta' 'cyan' 'white' 'gray')

const startSpinner = (type, message) => {
  spinner.text = chalk.bgCyan(` ${type} `) + message;
  spinner.start();
};
const stopSpinner = () => spinner.stop();
const succeedSpinner = () => spinner.succeed();

module.exports = {
  startSpinner,
  stopSpinner,
  succeedSpinner
};
