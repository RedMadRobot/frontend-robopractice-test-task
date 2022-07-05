/* eslint-disable no-undef */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

// merge confgig
const webpackConfig = merge([
  common,
  {
    output: {
      compareBeforeEmit: false,
      filename: 'js/[name].[hash:16].js',
    },

    optimization: {
      minimizer: [
        new ImageMinimizerWebpackPlugin({
          minimizer: {
            implementation: ImageMinimizerWebpackPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ['imagemin-gifsicle', { interlaced: true }],
                ['imagemin-jpegtran', { quality: 75, progressive: true }],
                ['imagemin-mozjpeg', { quality: 75, progressive: true }],
                ['imagemin-optipng', { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  'svgo',
                  {
                    plugins: extendDefaultPlugins([
                      {
                        name: 'removeViewBox',
                        active: false,
                      },
                      {
                        name: 'addAttributesToSVGElement',
                        params: {
                          attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                        },
                      },
                    ]),
                  },
                ],
              ],
            },
          },
        }),
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style/[name].[hash:16].css',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash:16][ext]',
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: 'svg/[name].[hash:16][ext]',
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name].[hash:16][ext]',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
        },
      ],
    },
  },
]);

// include build
module.exports = () => webpackConfig;
