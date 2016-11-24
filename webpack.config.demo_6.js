/**
 * Created by Glacier on 16/10/27.
 * 生产环境配置
 * 分离app.js和第三方库
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_6');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        // 项目本身js
        app: path.resolve(APP_PATH, 'index.js'),
        // 第三方库
        vendors: ['jquery', 'moment']
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
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
            // 取消第三方类库不规范代码产生的警告
            compress: {
                warnings: false
            }
        }),
        // 将入口文件中的vendors数组打包成vendors.js
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'webpack in action'
        })
    ]
};