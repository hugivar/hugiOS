#! /usr/bin/env node
const { dirname, resolve } = require('path');
require('ts-node').register();
require(resolve(dirname(require.main.filename), '../cli.ts'));