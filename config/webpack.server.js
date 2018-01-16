// modules
const webpack = require('webpack')
const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')
const webpackNodeExternals = require('webpack-node-externals')

// resolve path
const resolve = dir => path.resolve(__dirname, '..', dir)

// webpack config
const config = {
  target: 'node',
  entry: resolve('server/server.js'),
  output: {
    path: resolve('build'),
    filename: 'bundle.js'
  },
  externals: webpackNodeExternals()
}

// export config
module.exports = webpackMerge(webpackBase, config)
