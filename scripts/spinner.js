// Spinner config
const spinner = ora("Loading unicorns");
spinner.color = "cyan"; // ('black' 'red' 'green' 'yellow' 'blue' 'magenta' 'cyan' 'white' 'gray')
spinner.text = "Loading rainbows\n";

const startSpinner = () => spinner.start();
