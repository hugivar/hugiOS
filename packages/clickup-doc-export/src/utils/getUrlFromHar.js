const networkCalls = require('../../data/network.json');

const getUrlFromHar = () => {
    const entries = networkCalls?.log?.entries;

    const urls = entries.reduce((acc, entry) => {
        const url = entry?.request?.url;

        if (url) {
            return [...acc, url];
        }

        return acc;
    }, []);

    console.log(urls);
}


module.exports = getUrlFromHar;