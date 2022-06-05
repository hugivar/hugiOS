import { program } from 'commander';
import { execSync } from 'child_process';

const setupWakaTime = () => {
    program
        .action(() => {
            execSync(`
                echo '
                    hide_file_names = true' | sudo tee -a $HOME/.wakatime.cfg
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

export default setupWakaTime;