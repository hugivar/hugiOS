#!/usr/bin/env node

import inquirer from 'inquirer';

// Commands
import createProject from './commands/createProject.js';

export const generatorQuestons = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do',
        choices: [
            {
                name: 'Create monorepo project',
                value: 'createProject',
            },
        ]
    },
];

export const generatorAnswer = (answers) => {
    if (answers.options === 'createProject') {
        createProject();
    }
};
