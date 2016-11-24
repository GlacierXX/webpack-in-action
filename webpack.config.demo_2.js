/**
 * Created by Glacier on 16/10/26.
 * 开发服务器配置
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_2');
var BUILD_PATH = path.relative(ROOT_PATH, 'build');

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
        // 页面404时访问主页
        historyApiFallback: true,
        // 热替换
        hot: true,
        // 自动刷新
        // iframe(默认) 页面嵌在iframe中
        // inline 客户端被加入到入口文件配置中
        inline: true
    }
};