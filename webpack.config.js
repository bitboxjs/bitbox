var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json')

const hotMiddleware = 'webpack-hot-middleware/client?reload=true'

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        bit: [hotMiddleware, path.join(__dirname, 'packages/bitbox-bit/src')],
        box: [hotMiddleware ,path.join(__dirname, 'packages/bitbox-box/src')],
        bitbox: [hotMiddleware ,path.join(__dirname, 'packages/bitbox/src')],
        dom: [hotMiddleware, path.join(__dirname, 'packages/bitbox-dom/src')],
        component: [hotMiddleware, path.join(__dirname, 'packages/bitbox-component/src')],
        transform: [hotMiddleware, path.join(__dirname, 'packages/bitbox-transform/src')],
        dev: [hotMiddleware, path.join(__dirname, 'packages/bitbox-dev/src')],
        utils: [hotMiddleware, path.join(__dirname, 'packages/bitbox-utils/src')],
        demo: [hotMiddleware, path.join(__dirname, 'packages/bitbox-demo/src')]
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/',
        library: '[name]',
        libraryTarget: 'umd',
        chunkFilename: "[id].chunk.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'BBVERSION': JSON.stringify(pkg.version),
            'BBBUILD': JSON.stringify(Date())
        }),
        new webpack.optimize.CommonsChunkPlugin(`common.js`)
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            // include: [
            //     path.join(__dirname, 'src/'),
            //     path.join(__dirname, 'node_modules/inferno-src/src/')
            // ],
            loader: 'babel',
            query: {
                "presets": ["es2015", "stage-0"]
            }
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }]
    },
    devServer: {
        host: '0.0.0.0'
    }
};
