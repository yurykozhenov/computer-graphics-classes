const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SOURCE_FOLDER = 'src';
const DESTINATION_FOLDER = 'build';

const MODULES_FOLDERS = ['node_modules', 'bower_components'];
const MODULES_FOLDERS_REGEX = MODULES_FOLDERS.map(module => new RegExp(module));

// const PRODUCTION = process.env.NODE_ENV === 'production';
// const DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: path.resolve(__dirname, SOURCE_FOLDER, 'app'),
    deps: path.resolve(__dirname, SOURCE_FOLDER, 'deps')
  },
  output: {
    path: path.resolve(__dirname, DESTINATION_FOLDER),
    filename: '[name].bundle.js'
  },
  devtool: '#inline-source-map',
  resolve: {
    // root: path.resolve(__dirname, './src')
    modulesDirectories: MODULES_FOLDERS
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: MODULES_FOLDERS_REGEX
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'babel'],
        exclude: MODULES_FOLDERS_REGEX
      },
      {
        test: /\.html?$/,
        loader: 'raw'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  },
  eslint: {
    failOnError: true // Forces to write eslint-happy code
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
        '.bower.json', ['main']
      )
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'deps'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: 'index.html'
      }
    ]),
    new CleanWebpackPlugin([
      DESTINATION_FOLDER
    ])
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    //   .concat(PRODUCTION ? [
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //       warnings: false
    //     },
    //     output: {
    //       comments: false
    //     }
    //   })
    // ] : []
  ]
};
