import { program } from 'commander';
import { exec, execSync } from 'child_process';

const createSetupFile = ({ fileName }: any) => {
    program
        .action(() => {
            execSync(`
                echo "#!/usr/bin/env node
                import 'dotenv/config';
                import inquirer from 'inquirer';
                import path from 'path';
                               
                export const setup = {
                    name: 'Give me a name',
                    value: path.parse(__filename).name,
                };
                
                export const choices = [
                    {
                        name: 'Add me',
                        value: '',
                        action: null
                    }
                ];
                " | tee -a ./cli/config/${fileName}.ts
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

export default createSetupFile;