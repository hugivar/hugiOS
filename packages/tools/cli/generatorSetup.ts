#!/usr/bin/env node

// Commands
import createProject from './commands/createProject';

import groupByChoices from './helpers/groupByChoices';

const choices = [
    {
        name: 'Create monorepo project',
        value: 'create.Project',
        action: createProject
    },
];

export const generatorQuestons = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do',
        choices
    },
];

export const generatorAnswer = (answers: any) => {
    //@ts-ignore
    const { action } = choices.find(item => item.value === answers.options);

    if (action) {
        action();
    }
};

export const setupGeneratorComannder = (prog: any) => {
    const grouped = groupByChoices(choices);

    Object.keys(grouped).map((program: string) => {
        const item = prog
            .command(program)

        grouped[program].map((programItem: any) => {
            item
                .command(programItem.command)
                .description(programItem.description)
                .action(() => {
                    programItem.action()
                });
        });
    });

    return prog;
}
