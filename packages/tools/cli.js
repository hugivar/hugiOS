#!/usr/bin/env node
import inquirer from 'inquirer';
import { Command } from "commander";

import { generatorQuestons, generatorAnswer, setupGeneratorComannder } from './cli/generatorSetup.js';
import { configQuestions, configAnswers, setupConfigComannder } from './cli/configSetup.js';
import { setupWebisteComannder } from './cli/websiteSetup.js';

const setupCommander = () => {
    const program = new Command();

    setupWebisteComannder(program);
    setupConfigComannder(program);
    setupGeneratorComannder(program);

    program.parse(process.argv);
};

const inquirerRun = async () => {
    console.log('Hi! 👋  Welcome to the NezhOS cli!');

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
        ]
    });

    if (type === 'generator') {
        inquirer.prompt(generatorQuestons).then(generatorAnswer);
    }

    if (type === 'config') {
        inquirer.prompt(configQuestions).then(configAnswers);
    }
}

const run = () => {
    const ranWithArgs = process.argv.length > 2;

    if (!ranWithArgs) return inquirerRun();

    return setupCommander();
};

run();