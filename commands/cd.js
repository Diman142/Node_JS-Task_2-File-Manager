import { readdir } from 'node:fs/promises';
import { join as pathJoin } from "node:path";
import { stdout } from "node:process";

export const cd = async (path, nextLevelDir) => {
    const parsedNextLevelDir = nextLevelDir.charAt(0) === '.' ? nextLevelDir.slice(2) : nextLevelDir
    const folderAndFilesArr = await readdir(path, { withFileTypes: true });
    const folderArr = folderAndFilesArr.filter(item => item.isDirectory()).map(dir => dir.name);

    if (folderArr.includes(parsedNextLevelDir)) {
        return pathJoin(path, parsedNextLevelDir);
    }
    stdout.write(`File manager cannot find ${parsedNextLevelDir} directory`);
    return path
}