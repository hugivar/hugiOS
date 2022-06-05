import fs from "fs";
import path from "path";

type IType = "setup" | "choices";

const gatherConfig = (type: IType) => {
    const configPath = path.join(__dirname, '../config');

    const files = fs.readdirSync(configPath);
    const setups = files.map(async file => {
        const { setup, choices } = await import(`../config/${file}`);

        return type === "setup" ? setup : choices;
    });

    return Promise.all(setups).then(value => {
        return value
    });
};

export default gatherConfig;