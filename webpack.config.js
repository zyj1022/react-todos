//---------------------------------------------------
// Created by kingzhi 2016-6-26
//---------------------------------------------------

var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:4000',
		'webpack/hot/only-dev-server',
		"./src/entry.js"
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: "bundle.js"
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loaders: ['react-hot', 'babel'],
			exclude: /node_modules/
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.scss$/,
			loader: "style!css!sass"
		}]
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
