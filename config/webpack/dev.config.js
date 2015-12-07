var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
require('es6-promise').polyfill();

const rootDir = path.join(__dirname, '../', '../');

const PATHS = {
  app: path.join(rootDir, 'app'),
  build: path.join(rootDir, 'build')
};

var node_dir = path.join(rootDir, 'node_modules');

var config = {

  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },

  resolve: { alias: {} },

  entry: PATHS.app,

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  devtool: 'inline-source-map',

  module: {
    noParse: [],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "autoprefixer-loader?browsers=last 4 version", "sass?sourceMap"],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },

  sassLoader: {
    includePaths: [
      path.join(node_dir, 'normalize-scss', 'sass'),
      path.join(node_dir, 'normalize-scss', 'node_modules', 'support-for', 'sass')]
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};

config.addVendor('normalize-scss', path.join(node_dir, 'normalize-scss', 'sass'));

module.exports = config;
