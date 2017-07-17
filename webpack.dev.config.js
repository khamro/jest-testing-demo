var webpackConfig = require('./webpack.config.devServer');
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var find = require('lodash/find');

var PORT_SERVER = 9000;

function changeEntry (){
  webpackConfig.entry = [
    path.join(__dirname, 'app', 'app.js'),
    'webpack-dev-server/client?http://localhost:' + PORT_SERVER + '/',
    'webpack/hot/only-dev-server'
  ];
}

function changeOutput (){
  webpackConfig.output = {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  };
}

function changePlugins (){
  var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{ context: path.resolve(__dirname) ,from: path.join('app/index.html'), force: true }])
  ];
  Array.prototype.push.apply(webpackConfig.plugins, plugins);
}

function addDevServerConfig (){
  webpackConfig.devServer = {
    port: PORT_SERVER,
    historyApiFallback: true,
    changeOrigin: true,
    publicPath: 'http://localhost:' + PORT_SERVER + '/',
    contentBase: path.join(__dirname, 'dist/'),
    hot: true,
    progress: true,
    inline: true,
    debug: true,
    stats: {
      colors: true
    }
  };
}

function changeLoaders (){
  var cssLoader = find(webpackConfig.module.rules, function(loader) {
    return loader.name == "cssLoader"
  });
  delete cssLoader.use;
  cssLoader.use = ['style','css?sourceMap', 'sass?sourceMap'];
}

function changeExternals (){
  delete webpackConfig.externals;
}

function changeWebpackConfigForDevMode (){
  changeEntry();
  changeOutput();
  changePlugins();
  // changeLoaders();
  changeExternals();
  addDevServerConfig();
}

changeWebpackConfigForDevMode();

module.exports = webpackConfig;