#!/usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import publish from './commands/publish';
import createPost from './commands/createPost';
import outputArticles from './commands/outputArticles';
import { getDNSRecords } from './helpers/cloudflare';

export const setupWebisteComannder = (program: any) => {
  program
    .command('publish <pinataKey> <pinataSecretKey> <cloudflareTokenId> <cloudflareZoneId> <cloudflareDnsId>')
    .description('Publish site to Pinata')
    .action((pinataKey: string, pinataSecretKey: string, cloudflareTokenId: string, cloudflareZoneId: string, cloudflareDnsId: string) => {
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
    const dns = new Command('dns <zoneId>').description('get cloudflare dns records').action((zoneId: string) => {
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

  return program
}