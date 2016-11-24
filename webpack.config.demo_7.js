/**
 * Created by Glacier on 16/10/27.
 * 生产环境配置
 * 多页面环境配置
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_7');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// 模板路径
var TEMPLATE_PATH = path.resolve(APP_PATH, 'templates');

module.exports = {
    entry: {
        // pc端入口
        app: path.resolve(APP_PATH, 'index.js'),
        // mobile端入口
        mobile: path.resolve(APP_PATH, 'mobile.js'),
        // 第三方库
        vendors: ['jquery', 'moment']
    },
    output: {
        path: BUILD_PATH,
        // 对应入口分别生成app.js mobile.js vendors.js
        filename: '[name].[hash].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
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
    plugins: [
        // 使用UglifyJs压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'app',
            // 模板路径
            template: path.resolve(TEMPLATE_PATH, 'index.html'),
            // 生成html命名
            filename: 'index.html',
            // 引用的入口文件
            chunks: ['app', 'vendors'],
            // 将script标签插入的位置
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            title: 'mobile app',
            // 模板路径
            template: path.resolve(TEMPLATE_PATH, 'mobile.html'),
            // 生成html命名
            filename: 'mobile.html',
            // 引用的入口文件
            chunks: ['mobile', 'vendors'],
            // 将script标签插入的位置
            inject: 'body'
        })
    ]
};