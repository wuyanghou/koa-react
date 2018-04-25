const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const ExtractTextPlugin = require("extract-text-webpack-plugin");


const config = {
  // in development,
  // 'webpack-dev-server/client' and 'webpac/hot/dev-server' will be automatically added
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    //开发环境下不要使用 chunkhash  文件会变成undefined
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      'STATIC': resolve('static'),
      'UTIL': resolve('src/utils'),
      'ASSETS': resolve('src/assets'),
      'SERVICE':resolve('src/services')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      // {
      //   test:/\.less$/,
      //   include: [/node_modules/],
      //   use:[
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //     },
      //     {
      //       loader: 'less-loader',
      //     }
      //   ]
      // },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
        // })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.webworker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  plugins: [
    //自动在打包出来的文件夹里面生成index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = ''
  config.output.filename = 'app.[chunkhash].js';
  // Exclude react and react-dom in the production bundle
  // 不将第三方类库打包的方法之一，需要在index.html里手动引入依赖，例如cdn上的资源
  // config.externals = {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
  config.plugins = config.plugins.concat([
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json')
    }),
    //将vendor文件自动注射到index.html
    new AddAssetHtmlPlugin({
      filepath: require.resolve("./vendor.js"),
      hash: true,
      includeSourcemap: false
    }),
    //将css从js里抽取出来
    new ExtractTextPlugin({filename: "[name].[hash:5].css", allChunks: true}),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist/static'),
        ignore: ['.*']
      }
    ])
  ])

} else {
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = {
    contentBase: false,
    clientLogLevel: 'warning',
    quiet: true,
    port: 8000,
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/koa': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }

  // HMR support
  config.plugins = config.plugins.concat([
    //模块热替换
    new webpack.HotModuleReplacementPlugin(),
    //用文件路径而非默认的数字ID来作为模块标识。当改变其他js文件时 不会重新打包common.js(如果存在的话)建议用于  开发环境
    new webpack.NamedModulesPlugin(),
    //或者
    //用相对路径的Hash值来作为模块标识。当改变其他js文件时 不会重新打包common.js(如果存在的话) 建议用于       生产环境
    // new webpack.HashedModuleIdsPlugin()
]);
}
module.exports = config
