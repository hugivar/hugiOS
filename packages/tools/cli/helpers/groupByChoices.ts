import lodash from 'lodash';
const { groupBy } = lodash;

interface IChoice {
    value: string;
    name: string;
    action: () => void;
}

type IChoices = IChoice[];

// Can this be leverage in the Inquirer logic instead of using "lodash/flatten"
// Can we add an additional key to the config to enable descriptions
const groupByChoices = (choices: IChoices) => {
    const values = choices.map((item: IChoice) => {
        const splits = item.value.split('.')

        return splits;
    }).reduce(function (acc: any, curr: any, idx: number) {
        const key = curr[0];
        const value = curr[1];
        const description = choices[idx].name || '';
        const action = choices[idx].action || null;

        const updatedKey = {
            ...curr[key],
            program: key,
            command: value.toLowerCase(),
            description,
            action
        };

        return [...acc, updatedKey];
    }, []);

    return groupBy(values, (item: any) => item.program);
};

export default groupByChoices;