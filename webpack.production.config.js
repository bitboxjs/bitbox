const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const banner = require('./banner')
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
    resolve: {
        extensions: ['', '.js','.box']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new SmartBannerPlugin(banner(pkg)),
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
        loaders: [
            {
                test: /\.box$/,
                exclude: /node_modules/,
                loaders: [
                    'babel?presets[]=es2015&presets[]=stage-0',
                    path.resolve('src/transform/loader')
                ]
            },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                "presets": ["es2015", "stage-0"]
            }
        },
        {
            test: /\.json?$/,
            loader: 'json'
        }
    ]
    }
};
