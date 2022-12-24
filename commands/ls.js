import { readdir } from 'node:fs/promises';

export const ls = async (path) => {
    try {
        const folderArr = await readdir(path, { withFileTypes: true });
        const result = folderArr.map(item => (
            {
                Name: item.name,
                Type: item.isDirectory() ? "directory" : "file"
            }
        ));
        console.table(result);
    } catch (err) {
        console.error(err);
    }

};

