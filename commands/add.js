import { appendFile, access, constants } from 'fs/promises';
import { join as pathJoin } from "node:path";
import { stdout } from "node:process";

export const add = async (path, fileName) => {
    if (!fileName) {
        stdout.write('Operation failed\n');
        return
    }

    const filePath = pathJoin(path, fileName)
    try {
        await access(filePath, constants.F_OK)
        stdout.write('Operation failed\n')
    } catch {
        await appendFile(filePath, '');
    }

    return path
}