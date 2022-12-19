import { join as pathJoin } from "node:path";
import { rm as removeFile } from 'node:fs/promises';

export const rm = async (path, fileName) => {
    const pathToRemove = pathJoin(path, fileName)
    console.log('pathToRemove', pathToRemove)
    try {
        await removeFile(pathToRemove);
    } catch (error) {
        stdout.write('Operation failed\n')
    } finally {
        return path
    }
}