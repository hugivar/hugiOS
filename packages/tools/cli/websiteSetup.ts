#!/usr/bin/env node

import 'dotenv/config';
import inquirer from 'inquirer';
import publish from './commands/publish';
import createPost from './commands/createPost';
import outputArticles from './commands/outputArticles';
import { getDNSRecords } from './helpers/cloudflare';

import groupByChoices from './helpers/groupByChoices';

const choices = [
  {
    name: 'Publish site to Pinata',
    value: 'setup.Repo',
    action: publish
  },
  {
    name: 'Create a markdown post from template',
    value: 'post.Create',
    action: createPost
  },
  {
    name: 'Get cloudflare dns records',
    value: 'dns.GetRecord',
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

export const websiteQuestions = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do',
    choices: choices.reduce((acc: any, cur: any) => {
      const { name, value } = cur;

      return [...acc, { name, value }]
    }, [])
  },
];

export const websiteAnswers = (answers: any) => {
  //@ts-ignore
  const { action } = choices.find(item => item.value === answers.options);

  if (action) {
    action();
  }
}

export const setupWebsiteComannder = (prog: any) => {
  const grouped = groupByChoices(choices);

  Object.keys(grouped).map(program => {
    const item = prog
      .command(program)

    grouped[program].map(programItem => {
      item
        .command(programItem.command)
        .description(programItem.description)
        .action(() => {
          programItem.action();
        });
    });
  });

  return prog;
}