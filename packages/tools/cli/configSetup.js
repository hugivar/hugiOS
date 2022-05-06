#!/usr/bin/env node

// Commands
import createRepo from './commands/createRepo.js';
import setupZsh from './commands/setupZsh.js';
import setupWakaTime from './commands/setupWakaTime.js';
import updateFromLocalDotfiles from './commands/updateFromLocalDotfiles.js';
import updateLocalDotfiles from './commands/updateLocalDotfiles.js';

import groupByChoices from './helpers/groupByChoices.js';

const choices = [
    {
        name: 'Create a repo',
        value: 'setup.Repo',
        action: createRepo
    },
    {
        name: 'Setup commands for zsh',
        value: 'setup.Zsh',
        action: setupZsh
    },
    {
        name: 'Setup Wakatime',
        value: 'setup.WakeTime',
        action: setupWakaTime
    },
    {
        name: 'Update repo dotfiles file based on local zsh file',
        value: 'update.FromLocalDotfiles',
        action: updateFromLocalDotfiles,
    },
    {
        name: 'Update local dotfiles based on repo files',
        value: 'update.LocalDotfiles',
        action: updateLocalDotfiles
    }
];

export const configQuestions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do',
        choices: choices.reduce((acc, cur) => {
            const { name, value } = cur;

            return [...acc, { name, value }]
        }, [])
    },
];

export const configAnswers = (answers) => {
    const { action } = choices.find(item => item.value === answers.options);

    if (action) {
        action();
    }
}

export const setupConfigComannder = (prog) => {
    const grouped = groupByChoices(choices);

    Object.keys(grouped).map(program => {
        const item = prog
            .command(program)

        grouped[program].map(programItem => {
            item
                .command(programItem.command)
                .description(programItem.description)
                .action(() => {
                    setupZsh();
                });
        });
    });

    return prog;
}