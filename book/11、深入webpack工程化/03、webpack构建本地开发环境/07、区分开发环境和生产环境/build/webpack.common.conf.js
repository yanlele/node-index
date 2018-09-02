const productionConfig = require('./webpack.prod.conf');
const developmentConfig = require('./webpack.dev.conf');

const merge = require('webpack-merge');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generateConfig = env => {
    /*插件部分*/
    //提取代码的公用插件
    const extractLess = new ExtractTextWebpackPlugin({
        filename: (getPath) => {
            return getPath('css/[name].min.[hash:5].css').replace('css/js', 'css');
        },
        allChunks: false
    });


    /*loader部分*/
    // 打包编译JS
    const scriptLoader = [
        {
            loader: 'babel-loader'
        }
    ];
    //打包编译css
    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                minimize: env === 'production',
                // modules: true,
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                sourceMap: env === 'development',
                plugins: [
                    require('postcss-cssnext')()
                ].concat(
                    env === 'production' ?
                        require('postcss-sprites')({
                            spritePath: './dist/assets/img/sprites',
                            retina: true
                        }) : []
                )
            }
        },
        {
            loader: 'less-loader'
        }
    ];
    //打包编译样式
    const styleLoader = env === 'production'
        ? ExtractTextWebpackPlugin.extract({
            fallback: {
                loader: 'style-loader',
                options: {
                    singleton: true,
                    transform: './css.transform.js'
                }
            },
            use: cssLoaders
        }) : [{
            loader: 'style-loader',
            options: {
                // singleton: true,
                transform: './css.transform.js',
                sourceMap: true
            }
        }].concat(cssLoaders);
    // 打包编译文件
    const fileLoader = env === 'development' ? [
        {
            loader: 'file-loader',
            options: {
                options: {
                    outputPath: './img/',
                }
            }
        }
    ] : [
        {
            loader: 'url-loader',
            options: {
                limit: 1024 * 2,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        outputPath: './img/',
                    }
                }
            }
        }
    ];

    return {
        entry: {
            app: './src/app.js'
        },

        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'js/[name].bundle.[hash:5].js',
            publicPath: '/',
            chunkFilename: '[name].bundle.[hash:5].js',              //动态打包文件名
        },

        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, '../src/lib/jquery.min.js')                  // 之所以要用jquery$ ,表示这是一个文件而已；
            }
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, '../src')],
                    exclude: [path.resolve(__dirname, '../src/lib/jquery.min.js')],
                    use: scriptLoader
                },
                {
                    test: /\.less$/,

                    use: styleLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader.concat(
                        env === 'production' ?
                            {
                                loader: 'img-loader'
                            }: []
                    )
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
                },
                {
                    test: /\.(eot|woff2|woff|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024 * 50,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        // useRelativePath: true,
                                        publicPath: '../fonts',
                                        outputPath: 'fonts',
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            extractLess,

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                chunks: ['app'],
                minify: {
                    collapseWhitespace: false                //祛除空格
                }
            }),

            new Webpack.ProvidePlugin({
                $: 'jquery'
            }),
        ]
    }
};

module.exports = env => {
    let config = env === 'production' ? productionConfig : developmentConfig;

    return merge(generateConfig(env), config)
};