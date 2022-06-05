import fs from "fs";
import path from "path";

const generateTypes = () => {
    const configPath = path.join(__dirname, '../config');

    const files = fs.readdirSync(configPath);
    const setups = files.map(async file => {
        const { setup } = await import(`../config/${file}`);
        return setup
    });

    return Promise.all(setups).then(value => {
        return value
    });
};

export default generateTypes;