const Webpack = require('webpack');
const Jarvis = require('webpack-jarvis');
const proxyConfig = require('proxy');

module.exports = {
    devtool: "cheap-module-source-map",

    devServer: {
        port: 3000,
        proxy: proxyConfig,
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