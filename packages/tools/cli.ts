import inquirer from 'inquirer';
import { Command } from "commander";

import { generatorQuestons, generatorAnswer, setupGeneratorComannder } from './cli/generatorSetup';
import { configQuestions, configAnswers, setupConfigComannder } from './cli/configSetup';
import { websiteQuestions, websiteAnswers, setupWebsiteComannder } from './cli/websiteSetup';

const setupCommander = () => {
    const program = new Command();

    setupWebsiteComannder(program);
    setupConfigComannder(program);
    setupGeneratorComannder(program);

    program.parse(process.argv);
};

const inquirerRun = async () => {
    console.log('Hi! 👋  Welcome to the NezhOS cli!');

    // Add this logic be made dynamic?
    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'What would you like to do',
        choices: [
            {
                name: 'Monorepo generators',
                value: 'generator',
            },
            {
                name: 'Config setup',
                value: 'config',
            },
            {
                name: 'Website setup',
                value: 'website',
            },
        ]
    });

    if (type === 'generator') {
        inquirer.prompt(generatorQuestons).then(generatorAnswer);
    }

    if (type === 'config') {
        inquirer.prompt(configQuestions).then(configAnswers);
    }

    if (type === 'website') {
        inquirer.prompt(websiteQuestions).then(websiteAnswers);
    }
}

const run = () => {
    const ranWithArgs = process.argv.length > 2;

    if (!ranWithArgs) return inquirerRun();

    return setupCommander();
};

run();