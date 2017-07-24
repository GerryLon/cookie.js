const path = require('path');
const webpack = require('webpack');

const rootDir = __dirname;

module.exports = {
	entry: path.resolve(rootDir, './src/cookie.js'),
	output: {
		path: path.resolve(rootDir, 'dist'),
		filename: 'cookie.min.js',
		libraryTarget: 'umd',
		library: 'cookie'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			exclude: /node_modules/,
      // uglifyOptions: {
      	warnings: true,
      	compress: true
      // }
    })
	]
};