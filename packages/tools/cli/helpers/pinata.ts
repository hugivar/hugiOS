/* eslint-disable global-require */
import chalk from "chalk";

interface IPin {
  pinata: any;
  sourcePath?: string;
  hash?: string;
  options?: any;
  logger: any;
};

interface IPinList {
  pinata: any;
  fileName: string;
  logger: any;
};


export const pinFile = ({ pinata, sourcePath, options, logger }: IPin) =>
  pinata
    .pinFromFS(sourcePath, options)
    .then((addedResult: any) => {
      logger.info(chalk.cyan('Successfully pinned to Pinata'));

      return addedResult;
    })
    .catch((err: any) => {
      logger.info(
        chalk.red(
          `Error trying to add ${options.pinataMetadata.name
          } to Pinata: ${JSON.stringify(err)}`,
        ),
      );
    });

export const pinList = ({ pinata, fileName, logger }: IPinList) =>
  pinata
    .pinList({
      status: 'pinned',
      pageLimit: 10,
      pageOffset: 0,
      metadata: {
        name: fileName,
      },
    })
    .then((addedResult: any) => {
      logger.info(chalk.green('Gathered pinned files'));

      return addedResult.rows.filter(
        (item: any) => item?.metadata?.name === fileName,
      );
    })
    .catch((err: any) => {
      logger.info(
        chalk.red(`Error trying to list ${fileName} to Pinata: ${err}`),
      );
    });

export const unpin = ({ pinata, hash, logger }: IPin) =>
  pinata
    .unpin(hash)
    .then(() => {
      logger.info(chalk.green('Removed pinned file', hash));
    })
    .catch((err: any) => {
      logger.info(chalk.red(`Error trying to unpin ${hash} to Pinata: ${err}`));
    });

