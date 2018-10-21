import gulp from 'gulp'
import path from 'path'
import process from 'process'
import webpack from 'webpack'
import file from 'gulp-file';

import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

const isProduction = true // (process.env.NODE_ENV === 'production')


export const config = {
  entry: './index.js',
  mode: isProduction ? "production" : "development",
  output: {
    filename: 'rum-storage-umd.js',
    path: path.resolve(__dirname, '../dist'),
    library: '@rnd7/rum-storage',
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


export const buildUMD = () => {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if(err) console.log('Webpack', err)
    console.log(stats.toString({ }))
    resolve()
  }))
}
export const buildESM = () => {
  return rollup({
    input: './src/index.js',
    output: {
      file: 'bundle.js',
      format: 'esm'
    },
    plugins: [
      babel({
        presets: [
          [
            "@babel/preset-env", {
              "modules": false
            }
          ]
        ],
        babelrc: false,
        exclude: 'node_modules/**'
      })
    ]
  })
  .then(bundle => {
    return bundle.generate({
      moduleName: '@rnd7/rum-storage',
      format: 'esm'
    })
  })
  .then(gen => {
    return file('rum-storage-esm.js', gen.code, {src: true})
      .pipe(gulp.dest('dist/'))
  })

}

export default gulp.parallel(buildUMD, buildESM)
