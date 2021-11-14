const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/foo.js',
        vendor: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    plugins: [
        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),

        // 区分业务代码和第三方依赖代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        // 在提取出来一个runtime
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',   // 选中上面一个entry 没有的就可以了
        })
    ]
};