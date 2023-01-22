import fs from 'fs';
import chalk from 'chalk';
// const fetch = require('node-fetch');

const postDirPath = '../../apps/web/data/posts';
const collectionDirPath = '../../apps/web/data/collections';

const formatArticleTemplate = (article: any) => `
---
title: ${article.title}
description: ${article.description}
---

${article.body_markdown}
`;

const outputArticles = async () => {
    if (!process.env.API_KEY) {
        console.error(chalk.red('No dev.to API key provided'))
    }
    // const response = await fetch("https://dev.to/api/articles/me", { method: 'get', headers: { 'api-key': process.env.API_KEY || '' } });
    // const body = await response.text();
    // const articles = JSON.parse(body);

    // const blogArticles = articles.filter((item: any) => item.tag_list.includes('nezhivarjournal'));
    // const collectionArticles = articles.filter((item: any) => item.tag_list.includes('nezhivarcollection'));

    // blogArticles.map((article: any) => {
    //     fs.writeFile(
    //         `${postDirPath}/${article.slug}.md`,
    //         formatArticleTemplate(article),
    //         (err) => {
    //             if (err) throw err;

    //             console.info(chalk.green(`Journal: ${article.title} successfully created`));
    //         },
    //     );
    // });

    // collectionArticles.map((article: any) => {
    //     fs.writeFile(
    //         `${collectionDirPath}/${article.slug}.md`,
    //         formatArticleTemplate(article),
    //         (err) => {
    //             if (err) throw err;

    //             console.info(chalk.green(`Collection: ${article.title} successfully created`));
    //         },
    //     );
    // });
}

export default outputArticles;