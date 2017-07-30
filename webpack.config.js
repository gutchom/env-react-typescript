const webpack = require('webpack')
const { resolve } = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const isProduction = (process.env.NODE_ENV === 'production')
const baseDir = resolve(__dirname, 'src/scripts/')

module.exports = {
  entry: {
    app: ['babel-polyfill', baseDir + '/app/index.tsx',]
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'www/js'),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    }),
    new UglifyJSPlugin({
      compress: isProduction,
      mangle: false,
      beautify: !isProduction,
      sourceMap: !isProduction,
    }),
  ],
  node: {
    fs: 'empty',
  },
  devtool: isProduction ? false : 'inline-source-map',
  resolve: {
    modules: [
      baseDir + '/app',
      baseDir,
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.js', 'jsx', 'json'],
    alias: {
      app: baseDir + '/app',
    },
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [resolve(__dirname, 'node_modules')],
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
  },
}
