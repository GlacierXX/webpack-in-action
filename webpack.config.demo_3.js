/**
 * Created by Glacier on 16/10/27.
 * loader配置
 */
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_3');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack in action'
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    module: {
        loaders: [
            // loader执行顺序从右向左
            // css-loader 处理url() @import
            // style-loader 将css以style标签插入页面中
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: APP_PATH
            },
            // sass-loader 预编译sass文件,依赖node-sass
            // postcss-loader autoprefixer自动补全前缀
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass'],
                include: APP_PATH
            },
            // url-loader 处理图片等静态资源,小于限制值转成base64编码
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=50000'
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};