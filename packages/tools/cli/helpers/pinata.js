/* eslint-disable global-require */
const chalk = require('chalk');

const pinFile = ({ pinata, sourcePath, options, logger }) =>
  pinata
    .pinFromFS(sourcePath, options)
    .then((addedResult) => {
      logger.info(chalk.cyan('Successfully pinned to Pinata'));

      return addedResult;
    })
    .catch((err) => {
      logger.info(
        chalk.red(
          `Error trying to add ${
            options.pinataMetadata.name
          } to Pinata: ${JSON.stringify(err, 0, 2)}`,
        ),
      );
    });

const pinList = ({ pinata, fileName, logger }) =>
  pinata
    .pinList({
      status: 'pinned',
      pageLimit: 10,
      pageOffset: 0,
      metadata: {
        name: fileName,
      },
    })
    .then((addedResult) => {
      logger.info(chalk.green('Gathered pinned files'));

      return addedResult.rows.filter(
        (item) => item?.metadata?.name === fileName,
      );
    })
    .catch((err) => {
      logger.info(
        chalk.red(`Error trying to list ${fileName} to Pinata: ${err}`),
      );
    });

const unpin = ({ pinata, hash, logger }) =>
  pinata
    .unpin(hash)
    .then(() => {
      logger.info(chalk.green('Removed pinned file', hash));
    })
    .catch((err) => {
      logger.info(chalk.red(`Error trying to unpin ${hash} to Pinata: ${err}`));
    });

module.exports = { pinFile, pinList, unpin };
