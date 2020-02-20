const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const config = require('./config')

module.exports = () => ({
  context: __dirname,
  mode: config.env == 'prod' ? 'production' : 'development',
  devtool: config.env == 'prod' ? 'none' : 'source-map',
  name: config.name,
  entry: {
    [config.name]: `webpack-polyfill-injector?${JSON.stringify({
      modules: [
        './src/main.js',
        './src/main.scss'
      ]
    })}!`
  },
  output: {
    path: config.outputpath,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [          
          { 
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/fonts/',
          publicPath: '/fonts/'
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/img/',
          publicPath: '/assets/img/'
        }
      }
    ]
  },
  plugins: [
    new PolyfillInjectorPlugin({
      singleFile: true,
      polyfills: [
        'Array.prototype.fill',
        'Array.prototype.find',
        'Array.prototype.findIndex',
        'String.prototype.startsWith',
        'String.prototype.includes',
        'Array.from',
        'Object.entries',
        'Object.values',
        'Object.assign', 
        'fetch',
        'Promise',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new LiveReloadPlugin({
      protocol: 'http',
      hostname: 'localhost',
      delay: config.env == 'wpdev' ? 6000 : 100,
      appendScriptTag: true
    })
  ],
  resolve: {
    modules: [
      '../node_modules'
    ],
    alias: {
      ['~']: path.resolve(__dirname + '/src')
    },
    extensions: ['.js']
  }
})