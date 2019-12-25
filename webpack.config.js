//webpack是node写出来的 要用node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJsOlugin = require('uglifyjs-webpack-plugin'); //压缩js插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //添加浏览器前缀的插件
let OptimizeCss = require('optimize-css-assets-webpack-plugin'); //压缩css插件
let webpack = require('webpack');

module.exports = {
    optimization: { //优化项
        minimizer: [
            new UglifyJsOlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCss({})
        ]
    },
    devServer: { //开发服务器的配置
        port: 3000, //设置端口号
        progress: true, //是否显示加载进度
        contentBase: './build', //基本打开文件
        compress: true //是否压缩
    },
    mode: 'development', //配置模式  两种：production development
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'build') //路径必须是绝对路径
    },
    plugins: [ //数组类型 放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {
            //     removeAttributeQuotes: true, //删除双引号
            //     collapseWhitespace: true, //折叠空行
            // },
            hash: true //添加hash戳
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        // new webpack.ProvidePlugin({ //在每个模块中都注入juqery
        //     $:'jquery' 第二种方式
        // })
    ],
    module: {
        rules: [ //规则 css-loader 主要处理@import引入的 css文件 希望单一 ,style-loader 把css插入到header中 
            // loader是有顺序的从有想左执行
            // sass sass-loader
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            // {
            //     test: require.resolve('jquery'),
            //     use:'expose-loader?$'
            // }  可以不在impor中写那么复杂 在规则中匹配也是可以的  第一种方式
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{

                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath:'/img/'
                    },
                }],
            },
            // {
            //     test: /\.(png|jpg|gif|jpeg)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 1,
            //             outputPath: '/img/',
            //             publicPath:'http://127.0.0.1'
            //         }
            //     }
                    
            //     ]
            // }
        ],


    },
    // externals: {
    //     jquery:'jquery' //这个时候juqery则不会被打包
    // },

}