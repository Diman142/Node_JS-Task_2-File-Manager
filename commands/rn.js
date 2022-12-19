import { join as pathJoin, dirname } from "node:path";
import { readFile, rename } from 'fs/promises';
import { stdout } from "node:process";

export const rn = async (pathToFile, newFileName, currentPath, isArgumentsExist) => {
    if (!isArgumentsExist) {
        stdout.write('Operation failed\n');
        return
    }
    const oldFilePath = pathJoin(currentPath, pathToFile)
    try {
        const fileDirent = await readFile(oldFilePath, { withFileTypes: true });
        if (!fileDirent && !fileDirent.isFile()) {
            stdout.write('Operation failed\n');
        }
        const newFilePath = pathJoin(dirname(oldFilePath), newFileName)
        await rename(oldFilePath, newFilePath);
    } catch {
        stdout.write('Operation failed\n');
    }

}