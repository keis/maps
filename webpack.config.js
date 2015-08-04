var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }]
  }
}
