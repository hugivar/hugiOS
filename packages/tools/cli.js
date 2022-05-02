#!/usr/bin/env node

import inquirer from 'inquirer';
import { generatorQuestons, generatorAnswer } from './cli/generatorSetup.js';
import { configQuestions, configAnswers } from './cli/configSetup.js';

const run = async () => {
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

run();