'use strict';

// Requirements
const path = require('path');
const webpack = require('webpack');
// App global requirements
const jquery = require('jquery');
const moment = require('moment');
const toastr = require('toastr');

const entryPoint = './frontend/main.js';
const outputPath = path.resolve(__dirname, './build');
let fileName = 'app.js';

const plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    moment: 'moment',
    toastr: 'toastr'
  })
];

// Get the environment variable defined in the command (see package.json)
let env = process.env.WEBPACK_ENV;

// When compiling for production we want the app to be uglified.
if (env === 'production') {
  let UglifyPlugin = webpack.optimize.UglifyJsPlugin;

  plugins.push(new UglifyPlugin({minimize: true}));

  // We also add it as a global, the Vue lib needs it to determine if Dev tool should be active or not.
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }));
  // Change file name extension to min.js
  fileName = fileName.replace(/js/g, 'min.js');
}

const vueLoaderConfig = {
  loaders: {},
  cssSourceMap: false,
  cacheBusting: true,
  transformToRequire: {
    video: ['frontend', 'poster'],
    source: 'frontend',
    img: 'frontend',
    image: 'xlink:href'
  }
};

// Main webpack config
module.exports = {
  entry: {
    app: [ entryPoint ]
  },
  output: {
    path: outputPath,
    filename: fileName
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /(bower_components)/,
        // exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'] // Transpile the ES6 to es2015 standard
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',  // Resolving the vue var for standalone build
      '@': path.resolve(__dirname, './frontend'),
    }
  },
  plugins // set the previously defined plugins
};
