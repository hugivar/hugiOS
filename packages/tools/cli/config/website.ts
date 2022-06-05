#!/usr/bin/env node

import 'dotenv/config';
import inquirer from 'inquirer';
import path from 'path';

import publish from 'cli/commands/publish';
import createPost from 'cli/commands/createPost';
import outputArticles from 'cli/commands/outputArticles';
import { getDNSRecords } from 'cli/helpers/cloudflare';

export const setup = {
    name: 'Website setup',
    value: path.parse(__filename).name,
};

export const choices = [
    {
        name: 'Publish site to Pinata',
        value: 'publish.Site',
        action: publish
    },
    {
        name: 'Create a markdown post from template',
        value: 'post.Create',
        action: createPost
    },
    {
        name: 'Get cloudflare dns records',
        value: 'dns.record',
        action: () => {
            inquirer
                .prompt({
                    name: 'zoneId',
                    message: 'What is the zoneId'
                })
                .then(getDNSRecords);
        }
    },
    {
        name: 'Output all dev.to articles to markdown files',
        value: 'output.Articles',
        action: outputArticles
    }
];