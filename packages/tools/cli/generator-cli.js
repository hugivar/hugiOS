#!/usr/bin/env node

import inquirer from 'inquirer';

// Commands
import createProject from './commands/createProject.js';

inquirer
    .prompt([
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
    ])
    .then(answers => {
        if (answers.options === 'createProject') {
            createProject();
        }
    });
