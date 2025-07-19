/* eslint-disable global-require */
const chalk = require('chalk');

const getDNSRecords = async (zoneId) => {
  console.log('cloudflare line:5', zoneId);
  const { CLOUDFLARE_TOKEN_ID, CLOUDFLARE_ZONE_ID } = process.env;

  const cf = require('cloudflare')({
    token: CLOUDFLARE_TOKEN_ID,
  });

  return cf.dnsRecords.browse(zoneId || CLOUDFLARE_ZONE_ID);
};

const getZoneStatus = async (zoneId) => {
  const { CLOUDFLARE_TOKEN_ID } = process.env;

  const cf = require('cloudflare')({
    token: CLOUDFLARE_TOKEN_ID,
  });

  return cf.zones.read(zoneId);
};

const editDNSRecord = ({ args, content, logger }) => {
  const { cloudflareTokenId, cloudflareZoneId, cloudflareDnsId } = args;

  const CLOUDFLARE_TOKEN_ID =
    cloudflareTokenId || process.env.CLOUDFLARE_TOKEN_ID;
  const CLOUDFLARE_ZONE_ID = cloudflareZoneId || process.env.CLOUDFLARE_ZONE_ID;
  const CLOUDFLARE_DNS_ID = cloudflareDnsId || process.env.CLOUDFLARE_DNS_ID;

  const cf = require('cloudflare')({
    token: CLOUDFLARE_TOKEN_ID,
  });

  return cf.dnsRecords
    .edit(CLOUDFLARE_ZONE_ID, CLOUDFLARE_DNS_ID, {
      type: 'TXT',
      name: '_dnslink',
      content: `dnslink=/ipfs/${content}`,
      ttl: 1,
    })
    .then(() => {
      logger.info(chalk.cyan('Successfully updated the DNS record'));
    })
    .catch((err) => {
      logger.info(chalk.red(`Error trying to edit DNS record: ${err}`));
    });
};

module.exports = { getDNSRecords, getZoneStatus, editDNSRecord };
