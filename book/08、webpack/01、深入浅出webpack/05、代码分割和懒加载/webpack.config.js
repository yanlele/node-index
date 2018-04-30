let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        publicPath: "./dist/",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webapck.optimize.CommonsChunkPlugin({
            async: 'async-common',
            children: true,
            minChunks: 2
        }),
        new webapck.optimize.CommonsChunkPlugin({
            names: ['vendor', 'mainfest'],
            minChunks: Infinity
        })
    ]
};