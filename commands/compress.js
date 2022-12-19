import {
    createBrotliCompress
} from 'node:zlib';
import {
    pipeline
} from 'node:stream';
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';
import {
    join as pathJoin,
    parse,
    basename
} from 'node:path';
import { stdout } from "node:process";

export const compress = async (pathToFile, pathToDest, currentPath, isArgumentsExist) => {
    if (!isArgumentsExist) {
        stdout.write('Operation failed\n');
    }

    const parsedPathToFile = parse(pathToFile)
    const pathToCompressFile = parsedPathToFile.root && parsedPathToFile.root.length > 1 ? pathToFile : pathJoin(currentPath, pathToFile);
    const fileName = basename(pathToCompressFile);

    const parsedPathToDest = parse(pathToDest)
    const pathToDestination = parsedPathToDest.root && parsedPathToDest.root.length > 1 ? pathJoin(pathToDest, `${fileName}.br`) : pathJoin(currentPath, pathToDest, `${fileName}.br`);

    const gzip = createBrotliCompress();
    const source = createReadStream(pathToCompressFile);
    const destination = createWriteStream(pathToDestination);

    const stream = pipeline(source, gzip, destination, (err) => {
        if (err) {
            stdout.write('Operation failed\n');
            process.exitCode = 1;
        }
    });

    stream.on('finish', () => {
        return
    });
};
