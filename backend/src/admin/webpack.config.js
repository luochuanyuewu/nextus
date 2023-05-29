'use strict';
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config

  config.plugins.push(new webpack.NormalModuleReplacementPlugin(
    /^tippy\.js$/,
    'tippy.js/dist/tippy-bundle.umd.min.js'
  ))

  //https://github.com/Baboo7/strapi-plugin-import-export-entries#installation
  // config.plugins.push(new MonacoWebpackPlugin());

  return config;
};
