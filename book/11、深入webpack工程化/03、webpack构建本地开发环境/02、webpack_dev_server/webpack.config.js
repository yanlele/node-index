const path = require('path');
const Webpack = require('webpack');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Jarvis = require('webpack-jarvis');

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.[hash:5].js',
        publicPath: '/',
        chunkFilename: '[name].bundle.[hash:5].js',              //动态打包文件名
    },

    devServer: {
        port: 3001
    },

    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/lib/jquery.min.js')                  // 之所以要用jquery$ ,表示这是一个文件而已；
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            transform: './css.transform.js'
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,
                                // modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 2,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../img',
                                    outputPath: './img/',
                                }
                            }
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
            },
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: (getPath) => {
                return getPath('css/[name].min.[hash:5].css').replace('css/js', 'css');
            },
            allChunks: false
        }),

        new PurifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ]),
        }),

        new Webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new HtmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // chunks: ['app'],
            minify: {
                collapseWhitespace: false                //祛除空格
            }
        }),

        new Webpack.optimize.UglifyJsPlugin(),

        new CleanWebpackPlugin(['dist']),

        new Jarvis({
            port: 3002
        })
    ]
};
