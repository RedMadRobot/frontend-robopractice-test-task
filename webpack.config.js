const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = (env, argv) => {
	console.log(`This is the Webpack 5 "mode": ${JSON.stringify(argv)}`);
	console.log(`This is the Webpack 5 "mode": ${JSON.stringify(env)}`);
	return {
		entry: "./src/index.tsx",
		mode: argv.mode,
		output: {
			path: path.resolve(__dirname, 'dist'),
			clean: true,
			filename: 'bundle.js',
			assetModuleFilename: './src/assets/images/[name].[ext]',
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"]
		},
		devServer: {
			static: {
				directory: path.join(__dirname, "dist"),
			},
			compress: true,
			port: 3000,
			historyApiFallback: true,
			open: true,
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					loader: "ts-loader",
				},
				{
					test: /\.(s[ac]ss|css)$/i,
					use: [
						// Creates `style` nodes from JS strings
						{ loader: "style-loader" },
						// Translates CSS into CommonJS
						{ loader: "css-loader" },
						// Compiles Sass to CSS
						{ loader: "sass-loader", options: { sourceMap: true } },
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
				},
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "public", "index.html"),
			}),
			new MiniCssExtractPlugin({
				filename: "./src/index.css",
			}),
		],
		stats: {
			colors: true
		},
		devtool: argv.mode === "development" ? "inline-source-map" : false,
	}
};