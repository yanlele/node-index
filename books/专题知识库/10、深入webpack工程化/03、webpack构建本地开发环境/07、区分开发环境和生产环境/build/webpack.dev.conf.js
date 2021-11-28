const Webpack = require('webpack');
const Jarvis = require('webpack-jarvis');

module.exports = {
    devtool: "cheap-module-source-map",

    devServer: {
        port: 3000,
        proxy: {
            '/': {
                target: 'http://localhost:3002',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '': '/api/'
                }
            }
        },
        hot: true,
        hotOnly: true,
    },

    plugins: [

        new Webpack.HotModuleReplacementPlugin(),

        new Webpack.NamedModulesPlugin(),

        new Jarvis({
            port: 3001
        }),
    ]
};