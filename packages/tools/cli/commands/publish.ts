/* eslint-disable global-require */
import path from 'path';
import pinataSDK from '@pinata/sdk';
import chalk from 'chalk';

import { editDNSRecord } from '../helpers/cloudflare';
import { pinFile, pinList, unpin } from '../helpers/pinata';

/**
 * Publish the output NextJS static files to pinata.
 * Configuring a DNS link on Clouldflare pointing the new ipfs location
 */

const publishWeb = () => {
  const PINATA_KEY = process.env.PINATA_KEY || '';
  const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || '';

  const pinata = new pinataSDK({ pinataApiKey: PINATA_KEY, pinataSecretApiKey: PINATA_SECRET_KEY });

  const __dirname = path.resolve(path.dirname(''));
  console.info(chalk.green(__dirname));
  const sourcePath = path.join(__dirname, '../../apps/web/out');

  console.info(chalk.green(sourcePath));
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
      console.info(chalk.green(JSON.stringify(result)));
      console.info(chalk.cyan('Uploading static folder to Pinata'));

      const addedResult = await pinFile({
        pinata,
        sourcePath,
        options,
        logger: console,
      });

      // To find your CLOUDFLARE_DNS_ID, uncomment this line
      // console.log(await getDNSRecords(process.env.CLOUDFLARE_ZONE_ID));

      await editDNSRecord({
        content: addedResult.IpfsHash,
        logger: console,
      });

      // Check if more than 3 entries exist for the same file name, delete the LRU
      const pinnedFiles = await pinList({
        pinata,
        fileName: options?.pinataMetadata?.name,
        logger: console,
      });

      if (pinnedFiles.length > 3) {
        const oldestPinnedFile = pinnedFiles[pinnedFiles.length - 1];
        const oldestHash = oldestPinnedFile?.ipfs_pin_hash;

        unpin({ pinata, hash: oldestHash, logger: console });
      }
    })
    .catch((err) => {
      console.info(
        chalk.red(
          `Error trying to authenticate with Pinata: ${JSON.stringify(err)}`,
        ),
      );
    });
}

export default publishWeb;
