const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')

// resolve path
const resolve = dir => path.resolve(__dirname, '..', dir)

// plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CSSExtract = new ExtractTextPlugin('styles.css')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CopyStatics = new CopyWebpackPlugin([
  {
    from: resolve('statics'),
    to: 'statics',
    ignore: ['.*']
  }
])

// webpack config
const config = {
  entry: resolve('client/main.js'),
  output: {
    path: resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'statics/font-awesome/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'statics/img/[name].[ext]'
            }
          },
          'img-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    CSSExtract,
    CopyStatics
  ]
}

// export config
module.exports = webpackMerge(webpackBase, config)
