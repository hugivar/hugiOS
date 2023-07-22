#!/usr/bin/env node
import path from 'path';

// Commands
import createRepo from 'cli/commands/createRepo';
import setupZsh from 'cli/commands/setupZsh';
import setupWakaTime from 'cli/commands/setupWakaTime';
import updateDotfiles from 'cli/commands/updateDotfiles';

export const setup = {
    name: 'Environment setup',
    value: path.parse(__filename).name,
}

export const choices = [
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
        name: 'Update local dotfiles based on repo files',
        value: 'update.Dotfiles',
        action: updateDotfiles
    }
];