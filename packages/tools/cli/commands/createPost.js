const chalk = require('chalk');
const fs = require('fs');
const converter = require('number-to-words');

/**
 * Adds application module to client or server code and adds it to the module list.
 *
 * @param logger - The Logger
 * @param templatesPath - The path to the templates for a new module
 * @param moduleName - The name of a new module
 */

const format = (m, t) => {
  const f = new Intl.DateTimeFormat('en', m);
  return f.format(t);
};

const join = (time, split) => {
  const arrayOfDates = [
    { day: 'numeric' },
    { month: 'short' },
    { year: 'numeric' },
  ];

  return arrayOfDates.map((item) => format(item, time)).join(split);
};

const dirPath = './_posts';

const postTemplate = `---
title: 'New post!'
description: "Description"
date: 1 January 2020
---

Occaecat Lorem mollit cupidatat elit incididunt non consectetur eiusmod qui adipisicing duis sunt irure minim.

## Lorem Ipsum

Tempor sunt deserunt qui quis commodo voluptate laboris est ut qui in. Nostrud ut laborum ea mollit incididunt ea culpa nisi sint excepteur do. Eiusmod aliqua in adipisicing cupidatat excepteur.

## Hipster Ipsum

I'm baby enamel pin swag gastropub bitters migas lomo, dreamcatcher chartreuse vegan normcore. Trust fund chicharrones artisan live-edge portland swag jianbing knausgaard put a bird on it brunch pitchfork bushwick kinfolk. Unicorn bicycle rights waistcoat messenger bag hexagon glossier farm-to-table kinfolk poutine occupy vexillologist gochujang skateboard activated charcoal. Street art air plant tbh chicharrones, try-hard listicle bushwick chia glossier.

> Street art air plant tbh`;

const createPost = ({ logger }) => {
  const arrayLength = fs.readdirSync(dirPath).length;

  const wordNumber = converter.toWordsOrdinal(arrayLength);
  const wordString = join(new Date(), '-');

  fs.writeFile(
    `${dirPath}/${wordNumber}_post_${wordString}.md`,
    postTemplate,
    (err) => {
      if (err) throw err;

      logger.info(chalk.green('Post successfully created'));
    },
  );
};

module.exports = createPost;
