import { program } from 'commander';
import path from 'path';
import { execSync } from 'child_process';

console.log(__dirname, path.resolve('config/terminal/.zshrc'))
const updateFromLocalDotfiles = () => {
    program
        .action(() => {
            execSync(`
                cp ~/.zshrc ${path.resolve('packages/config/terminal')}
                cp ~/.vimrc ${path.resolve('packages/config/terminal')}
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

export default updateFromLocalDotfiles;