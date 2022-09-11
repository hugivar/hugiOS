#!/usr/bin/env node

import 'dotenv/config';
import inquirer from 'inquirer';
import path from 'path';

import createSetupFile from '../commands/createSetupFile';

export const setup = {
    name: 'Config setup',
    value: path.parse(__filename).name,
};

export const choices = [
    {
        name: 'Create new setup file',
        value: 'setup.Create',
        action: () => {
            inquirer
                .prompt({
                    name: 'fileName',
                    message: 'What is the file name'
                })
                .then(createSetupFile);
        }
    }
];