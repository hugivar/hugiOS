const path = require('path');
const fs = require("fs");
const glob = require("glob");

const inputDir = './data/Architect Notes/**/*.md';
const directoryPath = path.join(__dirname, inputDir);

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

glob(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (oldPath) {
        const newPath = oldPath.split('/').map((item, idx, array) => {
            if (idx === array.length - 1) {
                const date = item.match(/\d{4}-\d{2}-\d{2}/);
                if (!date?.[0]) {
                    console.log('Problem:', item);
                }

                return `Architect Note for ${date?.[0]}.md`;
            };

            return item;
        }).join('/');

        // Rename file
        fs.rename(
            oldPath,
            newPath
        );
    });
});