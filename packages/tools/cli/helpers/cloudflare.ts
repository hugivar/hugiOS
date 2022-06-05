/* eslint-disable global-require */
import chalk from 'chalk';

interface IZone {
  zoneId: string;
};

interface IRecord {
  content: string;
  logger: any;
};

export const getDNSRecords = async ({ zoneId }: IZone) => {
  const { CLOUDFLARE_TOKEN_ID, CLOUDFLARE_ZONE_ID } = process.env;

  const cf = require('cloudflare')({
    token: CLOUDFLARE_TOKEN_ID,
  });

  return cf.dnsRecords.browse(zoneId || CLOUDFLARE_ZONE_ID);
};

export const getZoneStatus = async (zoneId: string) => {
  const { CLOUDFLARE_TOKEN_ID } = process.env;

  const cf = require('cloudflare')({
    token: CLOUDFLARE_TOKEN_ID,
  });

  return cf.zones.read(zoneId);
};

export const editDNSRecord = ({ content, logger }: IRecord) => {
  const CLOUDFLARE_TOKEN_ID = process.env.CLOUDFLARE_TOKEN_ID;
  const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
  const CLOUDFLARE_DNS_ID = process.env.CLOUDFLARE_DNS_ID;

  const cf = require('cloudflare')({
    token: CLOUDFLARE_TOKEN_ID,
  });

  return cf.dnsRecords
    .edit(CLOUDFLARE_ZONE_ID, CLOUDFLARE_DNS_ID, {
      type: 'TXT',
      name: '_dnslink.ipfs',
      content: `dnslink=/ipfs/${content}`,
      ttl: 1,
    })
    .then(() => {
      logger.info(chalk.cyan('Successfully updated the DNS record'));
    })
    .catch((err: any) => {
      logger.info(chalk.red(`Error trying to edit DNS record: ${err}`));
    });
};

