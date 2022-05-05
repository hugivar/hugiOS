#!/usr/bin/env node

import { Command } from 'commander';

// Commands
import createRepo from './commands/createRepo.js';
import setupZsh from './commands/setupZsh.js';
import setupWakaTime from './commands/setupWakaTime.js';
import updateFromLocalDotfiles from './commands/updateFromLocalDotfiles.js';
import updateLocalDotfiles from './commands/updateLocalDotfiles.js';

export const configQuestions = [
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
];

export const configAnswers = (answers) => {
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
}

export const setupConfigComannder = (program) => {
    const setup = program.command('setup').description('setup a Github repo, local zsh, or local wakatime plugin');

    setup
        .command('zsh')
        .action(() => {
            setupZsh();
        });
    setup
        .command('wakatime')
        .action(() => {
            setupWakaTime();
        });
    setup
        .command('repo <name>')
        .description('setup a new github repo for your username. Must have the gh cli installed and authenticated')
        .action((name) => {
            createRepo(name);
        });

    function makeUpdateCommand() {
        const update = new Command('update').description('update from/to dotfiles');

        update
            .command('from')
            .action(() => {
                updateFromLocalDotfiles();
            });
        update
            .command('to')
            .action(() => {
                updateLocalDotfiles();
            });

        return update;
    }

    program.addCommand(makeUpdateCommand());

    return program
}