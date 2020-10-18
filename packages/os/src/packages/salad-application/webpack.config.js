const CopyWebpackPlugin = require('copy-webpack-plugin')
const metadata = require('./metadata.json')

const mode = (process.env.NODE_ENV || 'development').toLowerCase()

module.exports = {
  mode,
  output: {
    publicPath: `/app/${metadata.name}/`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  devtool: 'source-map',
  externals: {
    osjs: 'OSjs',
  },
  plugins: [new CopyWebpackPlugin(['icon.png'])],
}
