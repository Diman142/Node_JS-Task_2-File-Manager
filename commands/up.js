import { checkMinPathLength } from '../utils.js'
import { join as pathJoin, sep } from "node:path";

export const up = (path) => {
    if (checkMinPathLength(path)) {
        return path.replace(/\./g, '\\');
    }

    const droppedPath = path.split(sep)
    const levelUpPath = droppedPath.filter((p, ind) => (
        ind < droppedPath.length - 1 ? p : ""
    ))

    return checkMinPathLength(pathJoin(...levelUpPath)) ? pathJoin(...levelUpPath).replace(/\./g, '\\') : pathJoin(...levelUpPath);
}