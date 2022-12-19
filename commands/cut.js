import { readdir } from 'node:fs/promises';
import { join as pathJoin, sep } from "node:path";
import { createReadStream } from 'node:fs';
import { stdout } from "node:process";

export const cut = async (path, fileName) => {
    const folderAndFilesArr = await readdir(path, { withFileTypes: true })
    const filesArr = folderAndFilesArr.filter(item => item.isFile()).map(dir => dir.name);

    if (filesArr.includes(fileName)) {
        const pathToFile = pathJoin(path, fileName)
        const stream = createReadStream(pathToFile);

        stream.on('data', (chunk) => {
            stdout.write(`\n${chunk.toString()}\n`)
        })

        stream.on('end', () => {
            stdout.write(`You are currently in ${path} `);
        });
    } else {
        stdout.write('Operation failed\n')
    }

    return path
}