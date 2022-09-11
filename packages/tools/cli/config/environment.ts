#!/usr/bin/env node
import path from 'path';

// Commands
import createRepo from '../commands/createRepo';
import setupZsh from '../commands/setupZsh';
import setupWakaTime from '../commands/setupWakaTime';
import updateFromLocalDotfiles from '../commands/updateFromLocalDotfiles';
import updateLocalDotfiles from '../commands/updateLocalDotfiles';

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
        name: 'Update repo dotfiles file based on local zsh file',
        value: 'update.fromlocaldotfiles',
        action: updateFromLocalDotfiles,
    },
    {
        name: 'Update local dotfiles based on repo files',
        value: 'update.LocalDotfiles',
        action: updateLocalDotfiles
    }
];