const https = require('https');
const fs = require('fs');

const config = require('../config.json');

const initialize = () => {
    if (!fs.existsSync('./exports')) {
        fs.mkdirSync('./exports');
    }

};
const exportDocument = (spaceName, url) => {
    const name = url.split('/').filter(item => item.length)[4];
    const parent = name.split('_')[0];

    if (!fs.existsSync(`./exports/${spaceName}/${parent}`)) {
        fs.mkdirSync(`./exports/${spaceName}/${parent}`);
    }

    const file = fs.createWriteStream(`./exports/${spaceName}/${parent}/${name}`);

    https.get(url, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
        });
    });
};

const exportDocumentsBySpace = () => {
    initialize();

    config?.spaces.map(space => {
        const { name, docs } = space;
        const currentDir = `./exports/${name}`;

        if (!fs.existsSync(currentDir)) {
            fs.mkdirSync(currentDir);
        }

        console.log('Exporting documents for space', name);
        docs?.map((url, idx) => {
            exportDocument(name, url);
        });

        fs.readdir(currentDir, (err, files) => {
            console.log(`Exported ${files.length} documents for ${name}`);
        });
    });
}

exportDocumentsBySpace();