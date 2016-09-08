const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.js'),
    deps: path.resolve(__dirname, './src/deps.js')
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js'
  },
  devtool: '#inline-source-map',
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components']
  },
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loader: 'babel', 
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/, 
        loader: 'style!css'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, 
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.html?$/,
        loader: 'raw'
      }
    ]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
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
      'build'
    ])
  ]
};
