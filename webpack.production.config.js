var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var banner = require('./banner')
const SmartBannerPlugin = require('smart-banner-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
    entry: {
        bit: path.join(__dirname, 'packages/bitbox-bit/src'),
        box: path.join(__dirname, 'packages/bitbox-box/src'),
        bitbox: path.join(__dirname, 'packages/bitbox/src'),
        dom: path.join(__dirname, 'packages/bitbox-dom/src'),
        component: path.join(__dirname, 'packages/bitbox-component/src'),
        transform: path.join(__dirname, 'packages/bitbox-transform/src'),
        dev: path.join(__dirname, 'packages/bitbox-dev/src'),
        utils: path.join(__dirname, 'packages/bitbox-utils/src')
    },
    output: {
        path: path.join(__dirname, 'packages/bitbox/dist'),
        filename: '[name].js',
        publicPath: '/',
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new SmartBannerPlugin(banner(pkg)),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'BBVERSION': JSON.stringify(pkg.version),
            'BBBUILD': JSON.stringify(Date())
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                "presets": ["es2015", "stage-0"]
            }
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            //loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]')
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};
