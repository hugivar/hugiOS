import inquirer from 'inquirer';
import { Command } from "commander";
import flatten from "lodash/flatten";

import { groupByChoices, gatherConfig } from './helpers';

interface IAction {
    options: string;
}

const commanderSetup = async (prog: Command, type: string) => {
    try {
        const { choices } = await import(`./config/${type}`);

        const grouped = groupByChoices(choices);

        try {
            Object.keys(grouped).map(program => {
                const item = prog
                    .command(program)

                grouped[program].map(programItem => {
                    const availableCommands: string[] = [];
                    const currentKey = `${program}.${programItem.command}`;
                    if (availableCommands.includes(currentKey)) {
                        throw new Error(`This command already exists: ${currentKey}`);
                    }

                    availableCommands.push(currentKey);

                    item
                        .command(programItem.command)
                        .description(programItem.description)
                        .action(() => {
                            programItem.action();
                        });
                });
            });
        } catch (e) {
            process.exit();
        }


        return prog;
    } catch (err) {
        console.log(err);
    }
}

const setupCommander = async () => {
    const program = new Command();
    const types = await gatherConfig('setup');

    const commands = types.map(async item => {
        await commanderSetup(program, item.value);
    });

    Promise.all(commands).then(() => {
        program.parse(process.argv);
    });
};

const questionSetup = async (type: string) => {
    const { choices } = await import(`./config/${type}`);

    return [
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do',
            choices: choices.reduce((acc: any, cur: any) => {
                const { name, value } = cur;

                return [...acc, { name, value }]
            }, [])
        },
    ];
};

const questionAction = async (answers: IAction) => {
    //@ts-ignore
    const choices = await gatherConfig('choices');
    const flatChoices = flatten(choices);

    const option = flatChoices.find(item => item.value === answers.options);

    if (!option?.action) {
        console.error('No action defined');
        return;
    }

    option.action();
}

const inquirerRun = async () => {
    console.log('Hi! 👋  Welcome to the HugiOS CLI!');

    const types = await gatherConfig('setup');

    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'What would you like to do',
        choices: types
    });

    const questions = await questionSetup(type);
    inquirer.prompt(questions).then(questionAction);
}

const run = () => {
    const ranWithArgs = process.argv.length > 2;

    if (!ranWithArgs) return inquirerRun();

    return setupCommander();
};

run();