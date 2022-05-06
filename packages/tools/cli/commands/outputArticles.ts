import fs from 'fs';
const fetch = require('node-fetch');
const chalk = require('chalk');

const postDirPath = '../../apps/web/_posts';
const collectionDirPath = '../../apps/web/_collections';

const formatArticleTemplate = (article) => `
---
title: ${article.title}
description: ${article.description}
---

${article.body_markdown}
`;

const outputArticles = async ({ logger }) => {
    const response = await fetch("https://dev.to/api/articles/me", { method: 'get', headers: { 'api-key': process.env.API_KEY } });
    const body = await response.text();
    const articles = JSON.parse(body);

    const blogArticles = articles.filter(item => item.tag_list.includes('blog'));
    const collectionArticles = articles.filter(item => item.tag_list.includes('collection'));

    blogArticles.map(article => {
        fs.writeFile(
            `${postDirPath}/${article.slug}.md`,
            formatArticleTemplate(article),
            (err) => {
                if (err) throw err;

                logger.info(chalk.green('Blog article successfully created'));
            },
        );
    });

    collectionArticles.map(article => {
        fs.writeFile(
            `${collectionDirPath}/${article.slug}.md`,
            formatArticleTemplate(article),
            (err) => {
                if (err) throw err;

                logger.info(chalk.green('Collection article successfully created'));
            },
        );
    });
}

export default outputArticles;