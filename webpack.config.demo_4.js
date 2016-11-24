/**
 * Created by Glacier on 16/10/27.
 * 使项目支撑ES6
 * 以source-map展示错误,便于开发调试
 * devServer配置代理
 * preLoaders配置
 */
var path = require('path');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app/demo_4');
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
    // 开发工具配置
    // eval 转换为字符串,末尾增加sourceURL,作为eval参数 eval(string //# souceURL)
    // source-map 生成.map文件,打包文件末尾增加sourceMappingURL
    // hidden-source-map 文件末尾不展示sourceMappingURL
    // inline-source-map 不生成.map文件,打包文件末尾增加sourceMappingURL,内容为base64编码的map信息
    // eval-source-map 转换为字符串,末尾增加sourceMappingURL,内容为base64编码的map信息,作为eval参数
    // cheap-source-map 同source-map,但不包含列信息和loader的sourceMap信息
    // cheap-module-source-map 同source-map,但不包含列信息和loader的列信息(生产环境推荐)
    // cheap-module-eval-source-map 同eval-source-map,但不包含列信息和loader的列信息(开发环境推荐)
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        // 代理项配置
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                // 是否验证SSL证书
                secure: false
            }
        }
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
            // babel-loader babel-preset-es2015插件转译ES6代码
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
    // postcss autoprefixer插件
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    // jshint支持es6代码的校验
    jshint: {
        'esnext': true
    }
};