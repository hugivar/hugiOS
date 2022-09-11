#!/usr/bin/env node
import path from 'path';

// Commands
import createProject from '../commands/createProject';

export const setup = {
    name: 'Monorepo generators',
    value: path.parse(__filename).name,
}

export const choices = [
    {
        name: 'Create monorepo project',
        value: 'create.Project',
        action: createProject
    },
];
