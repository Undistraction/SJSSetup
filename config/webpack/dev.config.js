var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
// Pollyfill ES6 Promises
require('es6-promise').polyfill();

// Root directory of app
const rootDir = path.join(__dirname, '../', '../');

// Important paths within the app directory
const PATHS = {
  app: path.join(rootDir, 'app'),
  build: path.join(rootDir, 'build'),
  node: path.join(rootDir, 'node_modules')
};

var config = {

  // Add aliased vendors
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp(path));
  },

  // Configure resolution of assets
  resolve: {
    // Vendored aliases are added below using `config.addVendor`
    alias: {},
    // Handle these extensions
    extensions: ['', '.js', '.jsx']
  },

  entry: PATHS.app,

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  // Development Config
  devtool: 'inline-source-map',

  // Sass Loader Config
  sassLoader: {

    includePaths: [
      path.join(PATHS.node, 'normalize-scss', 'sass'),
      path.join(PATHS.node, 'normalize-scss', 'node_modules', 'support-for', 'sass')]
  },

  // Development Server Config
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },

  // Configure Modules
  module: {
    noParse: [],
    loaders: [
      // JavaScript
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'eslint'],
        include: PATHS.app
      },
      // Styles
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "autoprefixer-loader?browsers=last 4 version", "sass?sourceMap"],
        include: PATHS.app
      },
      // Images
      {
        test: /\.(png|jpg)$/,
        loaders: ['url-loader?limit=8192']
      }
    ]
  },

  // Configure Plugins
  plugins: [
    // Replacement of code on the fly without a full page reload
    new webpack.HotModuleReplacementPlugin(),
    // Generate HTML index page automatically
    new HtmlwebpackPlugin({
      title: 'Kanban app'
    })
  ]
};

// Add vendored libs
config.addVendor('normalize-scss', path.join(PATHS.node, 'normalize-scss', 'sass'));

module.exports = config;
