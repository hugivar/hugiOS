const fs = require("fs");

const inputFile = "./data/data.json";
const config = {
    dirs: [
        { taskName: 'Weekly Reflection', fileTitle: 'Weekly Reflection' },
        { taskName: 'Daily Reflection', fileTitle: 'Daily Reflection' }
    ],
    // tag: "architect" // Uncomment if you want to gather by tag than task name
};
const outputDir = './out';

const rawdata = fs.readFileSync(inputFile);
const rows = JSON.parse(rawdata).filter(row => {
    const csvTitle = row['Task Name'];
    const tags = row['Tags'];
    if (config.tag) {
        return tags.includes(config.tag);
    }

    return config.dirs.filter(item => csvTitle.toLowerCase().includes(item.taskName.toLowerCase())).length > 0;
});

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

const createFile = ({ row, dir, tag }) => {
    const csvTitle = row['Task Name'];
    const content = row['Task Content'];
    const startDate = row['Start Date Text']

    const fileTitle = dir?.fileTitle || tag;

    const data = JSON.stringify(content);


    // normalize date from ordinal
    const normalizedTitle = csvTitle.replace(/(?<=[0-9])(?:st|nd|rd|th)/, '');

    // Parse date from title string (eg. Weekly reflection for 06/19/2022)
    const date = Date.parse(normalizedTitle);
    if (isNaN(date)) {
        if (!tag) {
            console.log('Problem', normalizedTitle);
            return null;
        }

        return fs.writeFileSync(`${outputDir}/${fileTitle}/${csvTitle}.md`, data.replace(/\\+\\n/g, "\n").replace(/"/g, ""), { flag: 'w+' });
    }
    // Create new title if needed
    const title = `${fileTitle} for ${formatDate(date)}`;

    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    if (!fs.existsSync(`${outputDir}/${fileTitle}/${year}`)) {
        fs.mkdirSync(`${outputDir}/${fileTitle}/${year}`);
    }

    fs.writeFileSync(`${outputDir}/${fileTitle}/${year}/${title}.md`, data.replace(/\\+\\n/g, "\n").replace(/"/g, ""), { flag: 'w+' });
};

const convert = (rows) => {
    if (config.tag) {
        if (!fs.existsSync(`${outputDir}/${config.tag}`)) {
            fs.mkdirSync(`${outputDir}/${config.tag}`);
        }

        return rows.map(row => {
            createFile({ row, tag: config.tag })
        });
    }
    // This logic should be improved to not have an Big O squared time complexity
    return config.dirs.map(dir => {
        if (!fs.existsSync(`${outputDir}/${dir.taskName}`)) {
            fs.mkdirSync(`${outputDir}/${dir.taskName}`);
        }

        rows.map(row => {
            createFile({ row, dir })
        });
    })
};

convert(rows);