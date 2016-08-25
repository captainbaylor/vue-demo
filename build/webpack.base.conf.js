var path = require('path'),
  webpack = require('webpack');

var srcPath = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: './src/app.js',

    // 框架 / 类库 单独打包
    vendor: [
      'vue',
      'vue-router',
      'vue-resource',
      'vue-validator',
      'lodash',
      'superagent'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.less'],
    alias: {
      // 自定义路径别名
      COMPONENT: path.join(srcPath, 'components'),
      SERVICE: path.join(srcPath, 'services'),
      VIEW: path.join(srcPath, 'views'),
      UTIL: path.join(srcPath, 'utils'),
      VALIDATOR: path.join(srcPath, 'utils/validator')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'css!less'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(eot|woff|ttf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'mainifest']
    }),
    new webpack.DefinePlugin({
      // 配置开发全局常量
      __DEV__: process.env.NODE_ENV === 'development',
      __PROD__: process.env.NODE_ENV === 'production'
    })
  ]
};
