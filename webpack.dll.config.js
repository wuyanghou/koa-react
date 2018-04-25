// webpack.dll.conf.js
const webpack = require('webpack');
const path = require('path')

const vendors = [
 'jquery',
  'react',
  'react-dom'
];
module.exports = {
  // 读取library.entry 里配置的node_module
  entry:{
    vendor: vendors,
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    // 文件输出到 ./manifest.json 中
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[hash]',
      context: __dirname,
    }),
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
};
