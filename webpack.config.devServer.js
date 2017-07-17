var path = require('path');
var webpack = require('webpack');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  entry: [
    path.join(__dirname, 'app', 'src', 'dop-filters.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dop-filter.js',
    publicPath: '/',
    library: 'DopFilter',
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    },
    'react-addons-transition-group': 'ReactTransitionGroup',
    "moment": "moment",
    "react-select": "react-select"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader','sass-loader']
      },
      {
        test: /\.(png|jpg|svg)(\?.*)?$/,
        loader: 'url-loader?limit=16384'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("dop-filter.css"),
    //new CopyWebpackPlugin([{ context: path.resolve(__dirname) ,from: path.join('app/index.html'), force: true }])
    // new SpritesmithPlugin({
    //   src: {
    //     cwd: path.resolve(__dirname, 'resources/images/'),
    //     glob: '*.png'
    //   },
    //   target: {
    //     image: path.resolve(__dirname, 'resources/sprite.png'),
    //     css: path.resolve(__dirname, 'resources/sprite.css')
    //   },
    //   apiOptions: {
    //     cssImageRef: "../sprite.png"
    //   }
    // })
  ],
  devtool: 'source-map'

}