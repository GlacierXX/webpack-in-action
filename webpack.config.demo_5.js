/**
 * Created by Glacier on 16/10/27.
 * 第三方类库配置,两种方式
 * 1. 通过webpack的ProvidePlugin插件
 * 2. 通过imports-loader
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_5');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                include: APP_PATH,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: APP_PATH
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass'],
                include: APP_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=50000'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    jshint: {
        'esnext': true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack in action'
        })
        // 利用ProvidePlugin插件将全局变量插入代码中
        //new webpack.ProvidePlugin({
        //    $: 'jquery',
        //    jQuery: 'jquery',
        //    'window.jQuery': 'jquery'
        //})
    ]
};