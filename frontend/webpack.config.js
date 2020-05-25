const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv').config();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    disableHostCheck: true,
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html', favicon: 'favicon.ico' }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      // 'process.env.SERVICE_URL': JSON.stringify(process.env.SERVICE_URL),
      // 'process.env.GOOGLE_CLIENT_ID': JSON.stringify(
      //   process.env.GOOGLE_CLIENT_ID
      // ),
    }),
  ],
});
