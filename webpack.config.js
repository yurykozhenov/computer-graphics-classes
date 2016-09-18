const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SOURCE_FOLDER = 'src';
const DESTINATION_FOLDER = 'build';

const MODULES_FOLDERS = ['node_modules', 'bower_components'];
const MODULES_FOLDERS_REGEX = MODULES_FOLDERS.map(module => new RegExp(module));

const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: path.resolve(__dirname, SOURCE_FOLDER, 'app'),
    vendor: ['angular', 'skeleton', 'font-awesome/css/font-awesome.css'] // path.resolve(__dirname, SOURCE_FOLDER, 'vendor')
  },
  output: {
    path: path.resolve(__dirname, DESTINATION_FOLDER),
    filename: 'bundle.js'
  },
  devtool: PRODUCTION ? null : '#inline-source-map',
  resolve: {
    root: path.resolve(__dirname, SOURCE_FOLDER),
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
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
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
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/index.html',
        to: 'index.html'
      }
    ]),
    new CleanWebpackPlugin([
      DESTINATION_FOLDER
    ]),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ].concat(PRODUCTION ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ] : [])
};
