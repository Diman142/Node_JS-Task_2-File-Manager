import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { stdout } from "node:process";

export const osInfo = async (flag) => {
    switch (flag) {
        case '--EOL':
            stdout.write(`${JSON.stringify(EOL)}\n`);
            break;
        case '--cpus':
            cpus().forEach(cpu => stdout.write(`${cpu.model} rate: ${cpu.speed / 1000} GHz\n`))
            break;
        case '--homedir':
            stdout.write(`${homedir()}\n`);
            break;
        case '--username':
            const userName = JSON.stringify(userInfo({ encoding: 'utf-8' }))
            stdout.write(`${userName}\n`);
            break;
        case '--architecture':
            stdout.write(`${arch()}\n`);
            break;
        default:
            stdout.write('Operation failed\n')
    }
}