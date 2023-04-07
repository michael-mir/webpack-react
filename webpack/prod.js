const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const config = require('.');

module.exports = merge(config, {
  mode: 'production',
  target: 'browserslist',
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles/[name].css', chunkFilename: '[id].[hash].css' })
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    minimizer: [new TerserPlugin({ parallel: true }), new CssMinimizerPlugin()]
  }
});
