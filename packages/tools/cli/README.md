# HugiOS CLI

## Basis

This CLI provides two separate experiences baked into a single app. It can be used as either an interactive app built through [Inquirer](https://github.com/SBoudrias/Inquirer.js) or through a non-interactive app built through [Commander](https://github.com/tj/commander.js).

## Configuration

All of the logic of the CLI is dynamic and driven by the files under the config folder.
Each of these files contain two configuration objects, `setup` and `choices`

### Setup
```js
const setup = {
    name: 'Website setup', // Title shown in initial Inquirer prompt
    value: 'config' // Leverage to determine which Inquirer prompt was selected. Must be unique
}
```

### Choices
```js
import someFunction from 'cli/commands/someFunction';
import anotherFunction from 'cli/commands/anotherFunction';

const choices = [
    {
        name: 'Example title to show in the Inquirer prompt', // Title shown in the Inquirer prompt
        value: 'setup.Repo', // Explained below 
        action: someFunction // Invoked when the value prop is called in either the interactive or non-interactive environment
    },
    {
        name: 'Another title to show in the Inquirer prompt',
        value: 'setup.Zsh',
        action: anotherFunction
    }
];
```

### Value Prop Explained
Set of commands for commander. Usually follows the pattern of parent.Child

1. This function would be called in the non-interactive environment as: pnpm cli parent child
2. Next, the value prop enables grouping to occur so you can have parent.Another, which is called as pnpm cli parent another

## Inquirer Setup

The Inqirer setup contains two key pieces, `questionSetup` and `questionAction` as defined by cli.ts

### Question Setup
Dynamically read the config file based on the select type in the initial Inquirier question prompt. Lastly, present those dynamics choices as Inquirer prompt options in the interactive terminal

### Question Action
Interepts the answer provide through the Inquirer prompt and calls the appropriate function listed under the `action` key of your supplied `choices` array.

## Commander Setup

**Steps:**
1. Generate all the commands available to the commander program based on the `key` provied in the `choices` array of the each file available in the config folder. 
2. Intake those `choices` into the `groupByChoices` function, which will group like parent keys under the same command, but separate out their child into separate, distint Commander commands
3. Lastly, iterate through the available commands and inject them into the Commander program with the appropriate tile, description, and action driven dynamically by the config properities.

## Open Questions
1. Is the prop `value` in `choices` to vague and thus unclear?
2. Are the `choices` or `types` or `options`?
