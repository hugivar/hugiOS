/* eslint-disable global-require */
const path = require('path');
const pinataSDK = require('@pinata/sdk');
const chalk = require('chalk');

const { editDNSRecord } = require('../helpers/cloudflare');
const { pinFile, pinList, unpin } = require('../helpers/pinata');
/**
 * Publish the output NextJS static files to pinata.
 * Configuring a DNS link on Clouldflare pointing the new ipfs location
 *
 * @param logger - The Logger
 */

function publishWeb({ logger, ...args }) {
  const { pinataKey, pinataSecretKey } = args;

  const PINATA_KEY = pinataKey || process.env.PINATA_KEY;
  const PINATA_SECRET_KEY = pinataSecretKey || process.env.PINATA_SECRET_KEY;

  const pinata = pinataSDK(PINATA_KEY, PINATA_SECRET_KEY);

  logger.info(chalk.green(__dirname));
  const sourcePath = path.join(__dirname, '../../../out');

  logger.info(chalk.green(sourcePath));
  const options = {
    pinataMetadata: {
      name: 'out',
      keyvalues: {
        customKey: 'customValue',
        customKey2: 'customValue2',
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  // Execute the script
  pinata
    .testAuthentication()
    .then(async (result) => {
      logger.info(chalk.green(JSON.stringify(result)));
      logger.info(chalk.cyan('Uploading static folder to Pinata'));

      const addedResult = await pinFile({
        pinata,
        sourcePath,
        options,
        logger,
      });

      // To find your CLOUDFLARE_DNS_ID, uncomment this line
      // console.log(await getDNSRecords(process.env.CLOUDFLARE_ZONE_ID));

      await editDNSRecord({
        args,
        content: addedResult.IpfsHash,
        logger,
      });

      // Check if more than 3 entries exist for the same file name, delete the LRU
      const pinnedFiles = await pinList({
        pinata,
        fileName: options?.pinataMetadata?.name,
        logger,
      });

      if (pinnedFiles.length > 3) {
        const oldestPinnedFile = pinnedFiles[pinnedFiles.length - 1];
        const oldestHash = oldestPinnedFile?.ipfs_pin_hash;

        unpin({ pinata, hash: oldestHash, logger });
      }
    })
    .catch((err) => {
      logger.info(
        chalk.red(
          `Error trying to authenticate with Pinata: ${JSON.stringify(err)}`,
        ),
      );
    });
}

module.exports = publishWeb;
