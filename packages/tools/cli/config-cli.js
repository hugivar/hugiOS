#!/usr/bin/env node

import inquirer from 'inquirer';
import { program } from 'commander';
// import { execSync } from 'child_process';

// Commands
import createRepo from './commands/createRepo.js';
import setupZsh from './commands/setupZsh.js';
import setupWakaTime from './commands/setupWakaTime.js';
import updateFromLocalDotfiles from './commands/updateFromLocalDotfiles.js';
import updateLocalDotfiles from './commands/updateLocalDotfiles.js';

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do',
            choices: [
                {
                    name: 'Create a repo',
                    value: 'createRepo',
                },
                {
                    name: 'Setup commands for zsh',
                    value: 'setupZsh',
                },
                {
                    name: 'Setup Wakatime',
                    value: 'setupWakeTime',
                },
                {
                    name: 'Update repo dotfiles file based on local zsh file',
                    value: 'updateFromLocalDotfiles',
                },
                {
                    name: 'Update local dotfiles based on repo files',
                    value: 'updateFromLocalDotfiles',
                }
            ]
        },
    ])
    .then(answers => {
        if (answers.options === 'createRepo') {
            createRepo();
        }

        if (answers.options === 'setupZsh') {
            setupZsh();
        }

        if (answers.options === 'setupWakeTime') {
            setupWakaTime();
        }

        if (answers.options === 'updateFromLocalDotfiles') {
            updateFromLocalDotfiles();
        }

        if (answers.options === 'updateLocalDotfiles') {
            updateLocalDotfiles();
        }
    });
