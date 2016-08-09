var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: path.join(__dirname, '../lib'),
  devtool: 'eval',
  entry: './index.js',
  // {
  //   jsx: './index.js',
  //   html: './index.html',
  //   vendor: [
  //       'cerebral',
  //   	'cerebral-model',
  //   	'cerebral-model-immutable',
  //   	'cerebral-provider-modules',
  //   	'cerebral-module-devtools'
  //   ]
  // },
  output: {
    path: path.join(__dirname, '../../bitbox/dist'),
    filename: 'bit.js',
    library: 'bit',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /lib/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /lib/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
          query: {
            presets: ["es2015", "stage-0"],
            plugins: ["transform-runtime"]
          }
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bit.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './lib',
    hot: true
  }
}
