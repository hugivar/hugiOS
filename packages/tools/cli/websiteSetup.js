#!/usr/bin/env node

// global.__DEV__ = false;
// global.__API_URL__ = '';

// require('@babel/register')({
//   root,
//   cwd: root,
//   configFile: `${root}/tools/babel.config.js`,
//   extensions: ['.js', '.jsx', '.ts', '.tsx']
// });
import 'dotenv/config';
import prog from 'caporal';
import chalk from 'chalk';
import { Command } from 'commander';
import publish from './commands/publish.js';
import createPost from './commands/createPost.js';
import outputArticles from './commands/outputArticles.js';
import { getDNSRecords } from './helpers/cloudflare.js';

export const setupWebisteComannder = (program) => {
  program
    .command('publish <pinataKey> <pinataSecretKey> <cloudflareTokenId> <cloudflareZoneId> <cloudflareDnsId>')
    .description('Publish site to Pinata')
    .action((pinataKey, pinataSecretKey, cloudflareTokenId, cloudflareZoneId, cloudflareDnsId) => {
      publish({ logger: console, pinataKey, pinataSecretKey, cloudflareTokenId, cloudflareZoneId, cloudflareDnsId })
    })

  function makePostCommand() {
    const post = new Command('post').description('create a markdown post from template').action(() => {
      createPost({ logger: console })
    });

    return post;
  }

  // Get cloudflare dns records
  function makeDNSCommand() {
    const dns = new Command('dns <zoneId>').description('get cloudflare dns records').action(() => {
      getDNSRecords(zoneId);
    });

    return dns;
  }

  // Get cloudflare dns records
  function makeOutputCommand() {
    const dns = new Command('output').description('output all dev.to articles to markdown files').action(() => {
      outputArticles({ logger: console })
    });

    return dns;
  }

  program.addCommand(makePostCommand());
  program.addCommand(makeDNSCommand());
  program.addCommand(makeOutputCommand());

  program.parse(process.argv);

  return program
}