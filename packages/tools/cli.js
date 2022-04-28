// const root = `${__dirname}/..`;

global.__DEV__ = false;
global.__API_URL__ = '';

// require('@babel/register')({
//   root,
//   cwd: root,
//   configFile: `${root}/tools/babel.config.js`,
//   extensions: ['.js', '.jsx', '.ts', '.tsx']
// });
import 'dotenv/config';
import prog from 'caporal';
import chalk from 'chalk';

import publish from './cli/commands/publish.js';
import createPost from './cli/commands/createPost.js';
import outputArticles from './cli/commands/outputArticles.js';
import { getDNSRecords } from './cli/helpers/cloudflare.js';
import CommandInvoker from './cli/CommandInvoker.js';

const commandInvoker = new CommandInvoker(publish, createPost, outputArticles);

prog
  .version('1.0.1')
  // Publish site to Pinata
  .command('publish', 'Publish a web-build')
  .argument('[pinataKey]', 'PINATA_KEY to deploy with')
  .argument('[pinataSecretKey]', 'PINATA_KEY to deploy with')
  .argument('[cloudflareTokenId]', 'PINATA_KEY to deploy with')
  .argument('[cloudflareZoneId]', 'PINATA_KEY to deploy with')
  .argument('[cloudflareDnsId]', 'PINATA_KEY to deploy with')
  .action((args, options, logger) => {
    commandInvoker.runPublish(args, options, logger);
  })
  .command('post', 'Create a post')
  .action((args, options, logger) => {
    commandInvoker.runCreatePost(args, options, logger);
  })
  .command('dns', 'Get cloudflare dns records')
  .action(async (args, options, logger) => {
    const data = await getDNSRecords();
    logger.info(chalk.cyan(JSON.stringify(data, 0, 2)));
  })
  .command('output', 'Output all dev.to articles to markdown files')
  .action((args, options, logger) => {
    commandInvoker.runOutputArticles(args, options, logger);
  })

prog.parse(process.argv);
