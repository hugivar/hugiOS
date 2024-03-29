const fs = require("fs");

const inputFile = "./data/data.json";
const outputDir = './out';
const config = {
    // dirs: [
    //     { taskName: 'Weekly Reflection', fileTitle: 'Weekly Reflection' },
    //     { taskName: 'Daily Reflection', fileTitle: 'Daily Reflection' }
    // ],
    tag: "mirror" // Uncomment if you want to gather by tag than task name
};

const rawdata = fs.readFileSync(inputFile);
const rows = JSON.parse(rawdata);

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

function addDays(date, days) {
    date.setDate(date.getDate() + Number(days));
    return date;
}

const createFile = ({ row, dir, tag }) => {
    const titleDate = new Date('October 10, 2014 00:00:00');

    const csvTitle = row['Task Name'];
    const content = row['Task Content'];

    // increment days
    console.log(addDays(titleDate, csvTitle.replace(/days ago/g, '').trim()));

    if (dir && !csvTitle.toLowerCase().includes(dir.taskName.toLowerCase())) {
        return;
    }

    const fileTitle = dir?.fileTitle || tag;

    const data = JSON.stringify(content);

    // normalize date from ordinal
    const normalizedTitle = csvTitle.replace(/(?<=[0-9])(?:st|nd|rd|th)/, '');

    // Parse date from title string (eg. Weekly reflection for 06/19/2022)
    const date = Date.parse(normalizedTitle);
    if (isNaN(date)) {
        const noteYear = titleDate.getFullYear();
        const noteTitle = `Mirror Note for ${formatDate(titleDate)}`;
        if (!tag) {
            console.log('Problem', normalizedTitle);
            return null;
        }

        if (!fs.existsSync(`${outputDir}/${noteYear}`)) {
            fs.mkdirSync(`${outputDir}/${noteYear}`);
        }

        return fs.writeFileSync(`${outputDir}/${noteYear}/${noteTitle}.md`, data.replace(/\\+\\n/g, "\n").replace(/"/g, ""), { flag: 'w+' });
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

const convertTag = () => {
    const filteredRows = rows.filter(row => {
        const tags = row['Tags'];

        return tags.includes(config.tag);
    });

    if (!fs.existsSync(`${outputDir}/${config.tag}`)) {
        fs.mkdirSync(`${outputDir}/${config.tag}`);
    }

    return filteredRows.map(row => {
        createFile({ row, tag: config.tag })
    });
}

const convertDirs = () => {
    // This logic should be improved to not have an Big O squared time complexity
    return config.dirs.map(dir => {
        if (!fs.existsSync(`${outputDir}/${dir.taskName}`)) {
            fs.mkdirSync(`${outputDir}/${dir.taskName}`);
        }

        rows.map(row => {
            createFile({ row, dir })
        });
    });
};

const run = () => {
    if (config.tag) {
        return convertTag();
    };

    convertDirs();
}

run();