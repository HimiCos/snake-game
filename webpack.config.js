// 引入一個包
const path = require('path');
// 引入 HTML 插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入 clean 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 這個文件是webpack的配置文件，需要導出一個對象
module.exports = {
    mode: 'production',

    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        // 配置加載器
        rules: [
            {
                test: /\.ts$/,
                use: [
                    // 配置babel
                    {
                        loader: 'babel-loader',
                        options: {
                            // 設置緩存目錄
                            presets: [
                                [
                                    // 指定環境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目標瀏覽器
                                        targets: {
                                            "chrome": '100',
                                        },
                                        // 指定corejs的版本
                                        "corejs": '3',
                                        // 使用corejs的方式，"usage"表示按需加載
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/,
            },

            // 設置less文件的處理
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions',
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
            }
        ],
    },

    // 配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    
    // 用來設置引用模塊
    resolve: {
        extensions: ['.ts', '.js'],
    },
};