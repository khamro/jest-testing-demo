var path = require('path');
var webpack = require('webpack');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var SpritesmithPlugin = require('webpack-spritesmith');
var pkg = require('./package.json'); 

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
  externals: ['lodash/isEmpty'].concat(Object.keys(pkg.dependencies)),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', query: { sourceMaps: true } },
            //  { loader: 'postcss-loader' },
              { loader: 'sass-loader', query: { sourceMaps: true } }
            ]
          }),
          
      },
      {
        test: /\.(png|jpg|svg)(\?.*)?$/,
        loader: 'url-loader?limit=16384'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
        enforce: "pre"
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