let webapck = require('webpack');
let path = require('path');

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB': './src/pageB',
        'vendor': ['lodash'],               // 这个东西就是一个数组，可以把我们第三方引用包打包出来作为公用模块代码
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webapck.optimize.CommonsChunkPlugin({
            name: 'common',                     //common 是两个page的公用代码
            minChunks: 2,
            chunks: ['pageA', 'pageB']
        }),
        new webapck.optimize.CommonsChunkPlugin({
            names: ['vendor', 'mainfest'],      // 这里就区分出来了，vendor, 和mainfest;vender，是三方模块大妈，mainfest是webpack生成代码
            minChunks: Infinity
        })
    ]
};