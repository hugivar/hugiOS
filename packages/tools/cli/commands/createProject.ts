import inquirer from 'inquirer';
import { program } from 'commander';
import { execSync } from 'child_process';

const shellCommand = ({ name, type }: any) => {
    program
        .action(() => {
            execSync(`
                mkdir ../../${type}s/${name}
                cd ../../${type}s/${name}

                echo "# ${name}" >> README.md
                git add README.md
                git checkout -b feature/add-${type}-${name}
                git commit -m "initial commit for ${name}"
                git push -u origin feature/add-${type}-${name}

                gh pr create --title "New ${type} created with generator" --body "Genereated" 
            `);
        })
        .configureOutput({
            writeOut: (str) => console.log(`[OUT] ${str}`),
            writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        });

    program.parse();
}

const createProject = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What would you name your project'
            },
            {
                type: 'list',
                name: 'type',
                message: "Is this a package or an app?",
                choices: ['app', 'package']
            },
        ])
        .then(answers => {
            shellCommand(answers);
        });
}

export default createProject;