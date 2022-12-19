import { ls } from './ls.js';
import { up } from './up.js';
import { cd } from './cd.js';
import { cut } from './cut.js'
import { add } from './add.js'
import { rm } from './rm.js'
import { parseCommand, checkArguments } from '../utils.js';
import { stdout } from "node:process";
import { cp as copy } from './cp.js';
import { osInfo } from './os.js'
import { rn } from './rn.js'

const asyncCommandProcceser = (func) => async (...arg) => {
    try {
        return await func(...arg)
    } catch {
        stdout.write('Operation failed\n')
    }
}

const applyCommand = async (commandFromConsole, currentPath) => {
    const parsedCommand = parseCommand(commandFromConsole)
    const command = parsedCommand[0]
    switch (command) {
        case 'up':
            const prevLevelPath = await asyncCommandProcceser(up)(currentPath);
            return prevLevelPath;
        case 'ls':
            await asyncCommandProcceser(ls)(currentPath)
            return currentPath
        case 'cd':
            const nextLevelDir = checkArguments(parsedCommand) ? parsedCommand[1] : '';
            const nextLevelPath = parsedCommand[1] === '..'
                ? await asyncCommandProcceser(up)(currentPath)
                : await asyncCommandProcceser(cd)(currentPath, nextLevelDir);
            return nextLevelPath
        case 'cut':
            const fileName = checkArguments(parsedCommand) ? parsedCommand[1] : '';
            await asyncCommandProcceser(cut)(currentPath, fileName);
            return currentPath;
        case 'add':
            const newFileName = checkArguments(parsedCommand) ? parsedCommand[1] : ''
            await asyncCommandProcceser(add)(currentPath, newFileName);
            return currentPath;
        case 'rm':
            const fileToRemove = checkArguments(parsedCommand) ? parsedCommand[1] : ''
            await asyncCommandProcceser(rm)(currentPath, fileToRemove);
            return currentPath;
        case 'cp':
            const isArgumentsForCPExist = checkArguments(parsedCommand, 2)
            await asyncCommandProcceser(copy)(parsedCommand[1], parsedCommand[2], currentPath, isArgumentsForCPExist)
            return currentPath
        case 'rn':
            const isArgumentForRNExist = checkArguments(parsedCommand, 2)
            await asyncCommandProcceser(rn)(parsedCommand[1], parsedCommand[2], currentPath, isArgumentForRNExist)
            return currentPath
        case 'os':
            const flag = checkArguments(parsedCommand) ? parsedCommand[1] : '';
            osInfo(flag)
            return currentPath
        case 'rn':

        case '.exit':
            process.exit();
        default:
            process.stdout.write('Invalid input \n');
            return currentPath;
    }
}

export default applyCommand