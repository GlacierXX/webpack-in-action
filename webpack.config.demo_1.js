/**
 * Created by Glacier on 16/10/26.
 * 基本配置
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_1');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    // 入口文件,默认文件夹下的index.js
    entry: APP_PATH,
    // 输出目录和文件名
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack in action'
        })
    ]
};