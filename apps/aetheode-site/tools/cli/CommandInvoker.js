/* eslint-disable no-use-before-define */
/**
 * Class CommandInvoker.
 * Takes all CLI operations and calls certain CLI operation depends of variables.
 */
class CommandInvoker {
  /**
   * Sets CLI operations (functions).
   * @constructor
   *
   * @param publish - The function for deploying the site.
   */
  constructor(publish, createPost) {
    this.publish = publish;
    this.createPost = createPost;
  }

  /**
   * Calls CLI operation with correct location.
   *
   * @param func - The func to call.
   * @param location - The location for a new module [client|server|both].
   * @param args - The function for deleting existing module.
   */
  static runCommand(func, { ...args }) {
    const runFunc = () => func({ ...args });

    runFunc();
  }

  runPublish(args, options, logger) {
    runOperation(this.publish, args, options, logger);
  }

  runCreatePost(args, options, logger) {
    runOperation(this.createPost, args, options, logger);
  }
}

function runOperation(operation, args, options, logger) {
  CommandInvoker.runCommand(operation, {
    logger,
    ...args,
    ...options,
  });
}

module.exports = CommandInvoker;
