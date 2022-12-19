import { stat, createReadStream, appendFile, createWriteStream } from 'node:fs';
import { join as pathJoin, basename, parse } from "node:path";
import { stdout } from "node:process";

export const cp = async (pathToFile, pathToNewDir, currentPath, isArgumentsExist) => {
    if (!isArgumentsExist) {
        stdout.write('Operation failed\n');
        return;
    }
    const copyFilePath = pathJoin(currentPath, pathToFile);
    stat(copyFilePath, (err, stats) => {
        if (!err) {
            if (stats.isFile()) {
                const fileName = basename(copyFilePath);
                const readStream = createReadStream(copyFilePath);
                const parsedPath = parse(pathToNewDir);
                const newPath = parsedPath.root && parsedPath.root.length > 1 ? pathToNewDir : pathJoin(currentPath, pathToNewDir, fileName);

                appendFile(newPath, '', 'utf8', (err) => {
                    if (!err) {
                        const writeStream = createWriteStream(newPath);
                        readStream.on('data', (chunk) => {
                            writeStream.write(chunk);
                        })

                        readStream.on('end', () => {
                            return;
                        });
                    }
                    else {
                        stdout.write('Operation failed\n');
                    }
                });

            }
        }
        else
            stdout.write('Operation failed\n');
    });
}



