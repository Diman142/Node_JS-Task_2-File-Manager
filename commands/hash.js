import {
    readFile
} from 'fs/promises';
const {
    createHash,
} = await import('node:crypto');
import { stdout } from "node:process";
import { join as pathJoin } from 'node:path';

export const calculateHash = async (filePath, currentPath) => {
    const pathTofile = pathJoin(currentPath, filePath)
    try {
        const data = await readFile(pathTofile);
        var hashForLog = createHash('sha256').update(data).digest("hex");
        stdout.write(`${hashForLog}\n`)
    } catch {
        stdout.write('Operation failed\n')
    }
};