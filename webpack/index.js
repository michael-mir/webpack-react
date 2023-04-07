const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./_paths.js');

// ENV
const { NODE_ENV = 'development' } = process.env || {};
const IS_PROD = NODE_ENV === 'production';

// Configuration
module.exports = {
  entry: { app: paths.index },
  output: {
    clean: true,
    publicPath: '/',
    path: paths.build,
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (path) => /\.module\.s[ac]ss$/.test(path),
                localIdentName: '[name]_[local]_[hash:base64:5]'
              },
              importLoaders: IS_PROD ? 3 : 1,
              sourceMap: !IS_PROD
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: !IS_PROD } },
          { loader: 'sass-loader', options: { sourceMap: !IS_PROD } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@/components': `${paths.src}/components`
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BUILDTIME': webpack.DefinePlugin.runtimeValue(Date.now, true)
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: NODE_ENV || 'development' }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      template: paths.html,
      filename: 'index.html',
      favicon: `${paths.public}/assets/favicon.png`,
      minify: { removeRedundantAttributes: true, collapseWhitespace: true, useShortDoctype: true }
    })
  ]
};
