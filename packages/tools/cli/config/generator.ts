#!/usr/bin/env node

// Commands
import createProject from '../commands/createProject';

export const choices = [
    {
        name: 'Create monorepo project',
        value: 'create.Project',
        action: createProject
    },
];
