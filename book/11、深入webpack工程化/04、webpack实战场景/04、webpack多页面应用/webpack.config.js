const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const baseConfig = {
    entry: {
        react: 'react'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            },
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[hash].css'
        }),


        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity
        })
    ]
};

const generatePage = function({
    title = '',
    entry = '',
    template = './src/index.html',
    name = '',
    chunks = []
} = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                filename: name + '.html'
            })
        ]
    }
};

const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        name: 'a',
        chunks: ['react', 'a'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        name: 'b',
        chunks: ['react', 'b'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        name: 'c',
        chunks: ['react', 'c'],         // 这个地方的chunks 就是自己的代码加上公用的代码
    })
];

console.log(pages.map(page => merge(baseConfig, page)));
module.exports = pages.map(page => merge(baseConfig, page));