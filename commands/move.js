import { stat, createReadStream, appendFile, createWriteStream, rm } from 'node:fs';
import { join as pathJoin, basename, parse, resolve } from "node:path";
import { stdout } from "node:process";
import { cp } from './cp.js';
import { rm as removeFile } from 'node:fs/promises';

export const move = async (fileToMove, destPath, currentPath, isArgumentsExists) => {
    if (!isArgumentsExists) {
        stdout.write('Operation failed\n');
        return;
    }

    const oldFilePath = pathJoin(currentPath, fileToMove);

    await cp(fileToMove, destPath, currentPath, true)
    await removeFile(oldFilePath)
}