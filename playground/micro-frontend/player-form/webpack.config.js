const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
var m = require('react-dom');

module.exports = (webpackConfigEnv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: "nezhos",
        projectName: "player-form",
        webpackConfigEnv,
    });

    return merge(defaultConfig, {
        // customizations can go here
    });
};