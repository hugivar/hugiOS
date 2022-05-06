import lodash from 'lodash';
const { groupBy } = lodash;

const groupByChoices = (choices) => {
    const values = choices.map(item => {
        const splits = item.value.split('.')

        return splits;
    }).reduce(function (acc, curr, idx) {
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

    return groupBy(values, item => item.program);
};

export default groupByChoices;