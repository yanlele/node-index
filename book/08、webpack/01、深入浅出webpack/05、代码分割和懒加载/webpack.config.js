let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        // 'pageB': './src/pageB',
        // 'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        publicPath: "./dist/",
        chunkFilename: "[name].chunk.js"
    },

    // plugins: [
    //     new webapck.optimize.CommonsChunkPlugin({
    //         name: 'common',
    //         minChunks: 2,
    //         chunks: ['pageA', 'pageB']
    //     }),
    //     new webapck.optimize.CommonsChunkPlugin({
    //         names: ['vendor', 'mainfest'],
    //         minChunks: Infinity
    //     })
    // ]
};