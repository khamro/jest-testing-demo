var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var proxy = require('./dev/proxy.js');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	proxy : proxy
}).listen(config.devServer.port, 'localhost', function (err, result) {
	if (err) {
		console.log(err);
	}
	console.log('Dev server listening at localhost:' + config.devServer.port);
});