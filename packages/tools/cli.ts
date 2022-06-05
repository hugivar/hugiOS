import inquirer from 'inquirer';
import { Command } from "commander";
import fs from "fs";
import path from "path";

import groupByChoices from './cli/helpers/groupByChoices';

const commanderSetup = async (prog: any, type: string) => {
    try {
        const { choices } = await import(`./cli/config/${type}`);

        const grouped = groupByChoices(choices);

        Object.keys(grouped).map(program => {
            const item = prog
                .command(program)

            grouped[program].map(programItem => {
                item
                    .command(programItem.command)
                    .description(programItem.description)
                    .action(() => {
                        programItem.action();
                    });
            });
        });

        return prog;
    } catch (err) {
        console.log(err);
    }
}

const questionSetup = async (type) => {
    const { choices } = await import(`./cli/config/${type}`);

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

const questionAction = (answers: any) => {
    //@ts-ignore
    const { action } = choices.find(item => item.value === answers.options);

    if (!action) {
        console.error('No action defined');
    }

    action();
}

const generateTypes = () => {
    const configPath = path.join(__dirname, './cli/config');

    const files = fs.readdirSync(configPath);
    const setups = files.map(async file => {
        const { setup } = await import(`./cli/config/${file}`);
        return setup
    });

    return Promise.all(setups).then(value => {
        return value
    });
};

const setupCommander = async () => {
    const program = new Command();
    const types = await generateTypes();

    const commands = types.map(async item => {
        await commanderSetup(program, item.value);
    });

    Promise.all(commands).then(() => {
        program.parse(process.argv);
    });
};

const inquirerRun = async () => {
    console.log('Hi! 👋  Welcome to the NezhOS cli!');

    const types = await generateTypes();

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