const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'textEditor',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.jest',
      }),
      new WebpackPwaMainifest({
        fingerprints: false,
        inject: true,
        name: 'textEditor',
        short_name: 'T.E.',
        description: 'offline capable text editor',
        bacground_color: "white",
        theme_color: "blue",
        start_url: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            size: [100, 120, 200, 250, 384, 500],
            description: path.join("assets", "icons"),
          }

        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', "css-loader"],
        },
        {
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presents: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ]
            }
          }
        }
      ],
    },
  };
};
