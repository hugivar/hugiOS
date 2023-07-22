import { program } from 'commander';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';

const updateFromLocalDotfiles = () => {
    program
        .action(() => {
            execSync(`
                unlink ~/.bash_profile
                unlink ~/.bash_prompt
                unlink ~/.bashrc
                unlink ~/.vimrc
                unlink ~/.zshrc
            `);
            
            execSync(`
                ln -s ${path.join(__dirname, '../../../config/dotfiles', '.bash_profile')} ~/.bash_profile
                ln -s ${path.join(__dirname, '../../../config/dotfiles', '.bash_prompt')} ~/.bash_prompt
                ln -s ${path.join(__dirname, '../../../config/dotfiles', '.bashrc')} ~/.bashrc
                ln -s ${path.join(__dirname, '../../../config/dotfiles', '.vimrc')} ~/.vimrc
                ln -s ${path.join(__dirname, '../../../config/dotfiles', '.zshrc')} ~/.zshrc
            `);

            console.info(chalk.green('Update bash_profile, bash_prompt, bashrc, vimrc, and zshrc'));
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

export default updateFromLocalDotfiles;