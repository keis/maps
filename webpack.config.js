var webpack = require('webpack')

module.exports = {
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
  ]
}
