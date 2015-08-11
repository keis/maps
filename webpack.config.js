var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: ['webpack/hot/only-dev-server', './index'],
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
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    }]
  }
}
