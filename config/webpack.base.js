// modules
const webpack = require('webpack')
const path = require('path')

// resolve path
const resolve = dir => path.resolve(__dirname, '..', dir)

// variables
const isProd = process.env.NODE_ENV === 'production'

// webpack config
const config = {
  devtool: isProd ? '#source-map' : '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'stage-0',
            'env',
            { plugins: ['transform-class-properties'] }
          ]
        }
      },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
      ]
    : []
}

// export config
module.exports = config
