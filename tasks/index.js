import gulp from 'gulp4'
import path from 'path'
import process from 'process'
import webpack from 'webpack'

const isProduction = true // (process.env.NODE_ENV === 'production')


export const config = {
  entry: './index.js',
  mode: isProduction ? "production" : "development",
  output: {
    filename: 'rum-storage.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'rum-idb-storage',
    libraryTarget: 'umd'
  },
  context: path.resolve(__dirname, '../src'),
  optimization: {
    minimize: isProduction ? true : false
  },
  devtool: 'source-map',
  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [],
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  }
}

export const build = () => {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if(err) console.log('Webpack', err)
    console.log(stats.toString({ }))
    resolve()
  }))
}

export default build
