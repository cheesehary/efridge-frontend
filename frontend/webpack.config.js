const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv').config();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 9999,
    disableHostCheck: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html', favicon: 'favicon.ico' }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
});
