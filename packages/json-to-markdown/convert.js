const fs = require("fs");

const inputFile = "./data/data.json";
const dirs = [
    { dirName: 'Weekly Reflection', fileTitle: 'Weekly Reflection' },
    { dirName: 'Daily Reflection', fileTitle: 'Daily Reflection' }
];
const outputDir = './out';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

const createFile = (row, dir) => {
    const { dirName, fileTitle } = dir;
    const csvTitle = row['Task Name'];
    if (!csvTitle.match(dirName)) {
        return;
    };
    // normalize date from ordinal
    const normalizedTitle = csvTitle.replace(/(?<=[0-9])(?:st|nd|rd|th)/, '');

    // Parse date from title string (eg. Weekly reflection for 06/19/2022)
    const date = Date.parse(normalizedTitle);
    if (isNaN(date)) {
        console.log('Problem', normalizedTitle);
        const content = row['Task Content'];
        return fs.writeFileSync(`${outputDir}/${csvTitle}.md`, content, { flag: 'w+' });
    }
    // Create new title if needed
    const title = `${fileTitle} for ${formatDate(date)}`;

    const content = row['Task Content'];
    const data = JSON.stringify(content);

    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    if (!fs.existsSync(`${outputDir}/${dirName}/${year}`)) {
        fs.mkdirSync(`${outputDir}/${dirName}/${year}`);
    }

    fs.writeFileSync(`${outputDir}/${dirName}/${year}/${title}.md`, data.replace(/\\+\\n/g, "\n").replace(/"/g, ""), { flag: 'w+' });
};

const convert = () => {
    const rawdata = fs.readFileSync(inputFile);
    const rows = JSON.parse(rawdata);

    // This logic should be improved to not have an Big O squared time complexity
    dirs.map(dir => {
        if (!fs.existsSync(`${outputDir}/${dir.dirName}`)) {
            fs.mkdirSync(`${outputDir}/${dir.dirName}`);
        }

        rows.map(row => {
            createFile(row, dir)
        });
    })
};

convert();