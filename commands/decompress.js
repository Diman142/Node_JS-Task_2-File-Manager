import {
    createBrotliDecompress
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

export const decompress = async (pathToFile, pathToDest, currentPath, isArgumentsExist) => {
    if (!isArgumentsExist) {
        stdout.write('Operation failed\n');
        return
    }

    const parsedPathToFile = parse(pathToFile)
    const pathToDecompressFile = parsedPathToFile.root && parsedPathToFile.root.length > 1 ? pathToFile : pathJoin(currentPath, pathToFile);
    const fileName = basename(pathToDecompressFile).slice(0, -3);

    const parsedPathToDest = parse(pathToDest)
    const pathToDestination = parsedPathToDest.root && parsedPathToDest.root.length > 1 ? pathJoin(pathToDest, fileName) : pathJoin(currentPath, pathToDest, fileName);

    const gzip = createBrotliDecompress();
    const source = createReadStream(pathToDecompressFile);
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