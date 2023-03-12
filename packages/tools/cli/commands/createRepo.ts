import inquirer from 'inquirer';
import { program } from 'commander';
import { execSync } from 'child_process';

const shellCommand = (name: string) => {
    program
        .action(() => {
            execSync(`
                gh repo create ${name} --public

                mkdir ${name}
                cd ${name}
                
                echo "# ${name}" >> README.md
                git init
                git add README.md
                git commit -m "first commit"
                git branch -M main
                git remote add origin https://github.com/hugivar/${name}.git
                git push -u origin main
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

const createRepo = (name?: string) => {
    if (name) {
        return shellCommand(name)
    }

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What would you name your repo'
            },
        ])
        .then(answers => {
            shellCommand(answers.name)
        });
}

export default createRepo;