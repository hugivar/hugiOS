// const root = `${__dirname}/..`;

global.__DEV__ = false;
global.__API_URL__ = '';

// require('@babel/register')({
//   root,
//   cwd: root,
//   configFile: `${root}/tools/babel.config.js`,
//   extensions: ['.js', '.jsx', '.ts', '.tsx']
// });
require('dotenv').config();

const prog = require('caporal');
const chalk = require('chalk');

const publish = require('./cli/commands/publish');
const createPost = require('./cli/commands/createPost');
const cloudflare = require('./cli/helpers/cloudflare');

const CommandInvoker = require('./cli/CommandInvoker');

const commandInvoker = new CommandInvoker(publish, createPost);

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
    const data = await cloudflare.getDNSRecords();
    logger.info(chalk.cyan(JSON.stringify(data, 0, 2)));
  });

prog.parse(process.argv);
