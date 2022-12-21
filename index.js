import { argv } from "node:process";
// import { fileURLToPath } from "node:url";
// import { dirname, join, resolve } from "node:path";
import { stdin, stdout, exit } from "node:process";
import { homedir } from 'os'
import { prepareUserName } from "./utils.js";
import applyCommand from './commands/index.js'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const src = join(__dirname);
// let currentPath = resolve(src).toString();
let currentPath = homedir().toString();

const main = async () => {
  argv.forEach((arg) => {
    if (arg.includes("--")) {
      const userName = prepareUserName(arg);
      stdout.write(`Welcome to the File Manager, ${userName} \n`);
      stdout.write(`You are currently in  ${currentPath} `);

      stdin.on('data', async (cliCommand) => {
        currentPath = await applyCommand(cliCommand.toString().trim(), currentPath);
        stdout.write(`You are currently in ${currentPath} `);
      })

      process.on('exit', () => {
        stdout.write(`\nThank you for using File Manager, ${userName}, goodbye!\n`);
        return
      })

      process.on('SIGINT', () => {
        exit()
      })
    }
  });
};

main();
