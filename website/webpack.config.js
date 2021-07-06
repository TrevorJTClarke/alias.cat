const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.css'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ],
        type: 'javascript/auto'
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: path.resolve(__dirname, 'dist'),
    overlay: false,
    injectClient: false,
    disableHostCheck: true,
    historyApiFallback: true,
    noInfo: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    })
  ],
  performance: {
    hints: false
  }
}
