const { merge } = require('webpack-merge');

const config = require('.');
const paths = require('./_paths');

module.exports = merge(config, {
  cache: true,
  target: 'web',
  devtool: 'eval',
  mode: 'development',
  devServer: {
    port: 3000,
    compress: true,
    historyApiFallback: true,
    static: { directory: paths.build },
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
});
