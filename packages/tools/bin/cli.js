#! /usr/bin/env node
const { dirname, resolve } = require('path');
const tsConfigPaths = require("tsconfig-paths");

require('ts-node').register({ project: resolve(dirname(require.main.filename), '../tsconfig.json') });
require('dotenv').config({ path: resolve(dirname(require.main.filename), '../.env') })

const baseUrl = resolve(dirname(require.main.filename), "../");

tsConfigPaths.register({
    baseUrl,
    paths: {
        "cli/commands/*": [
            "./cli/commands/*"
        ],
        "cli/helpers/*": [
            "./cli/helpers/*"
        ],
    },
});


require(resolve(dirname(require.main.filename), '../cli/main.ts'));