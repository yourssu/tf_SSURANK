const webpack = require('webpack');

// your app's webpack.config.js
const custom = require('../webpack.config.js'); // 👈 point this to wherever your own webpack.config.dev.js is


module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      },
      plugins: [
        ...config.plugins,
        // See https://stackoverflow.com/a/51194917/416714 and
      ]
    };
  },
}