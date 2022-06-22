import { program } from 'commander';
import { execSync } from 'child_process';

const updateFromLocalDotfiles = () => {
    program
        .action(() => {
            execSync(`
                cp -R ~/.zshrc ../config/terminal/.zshrc
                cp -R ~/.gitignore_global ../config/terminal/.zshrc
                cp -R ~/.vimrc ../config/terminal/.zshrc
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

export default updateFromLocalDotfiles;