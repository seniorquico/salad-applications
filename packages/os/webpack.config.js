const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const npm = require('./package.json')

const { DefinePlugin } = webpack

const mode = (process.env.NODE_ENV || 'development').toLowerCase()

const plugins = []
if (mode === 'production') {
  plugins.push(
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        discardComments: true,
        map: {
          inline: false,
        },
      },
    }),
  )
}

module.exports = {
  mode,
  entry: {
    osjs: path.resolve(__dirname, npm.main),
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(gif|jpe?g|png|svg|webp)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: /fontsource/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 500 * 1024,
    maxAssetSize: 500 * 1024,
  },
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      OSJS_VERSION: npm.version,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/client/index.ejs'),
      favicon: path.resolve(__dirname, 'src/client/favicon.png'),
      title: 'SaladOS',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...plugins,
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
