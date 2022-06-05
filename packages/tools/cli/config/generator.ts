#!/usr/bin/env node

// Commands
import createProject from '../commands/createProject';

export const setup = {
    name: 'Monorepo generators',
    value: 'generator',
}

export const choices = [
    {
        name: 'Create monorepo project',
        value: 'create.Project',
        action: createProject
    },
];
