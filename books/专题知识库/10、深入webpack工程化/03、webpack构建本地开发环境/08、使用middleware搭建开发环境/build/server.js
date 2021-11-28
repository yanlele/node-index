const express = require('express');
const webpack = require('webpack');
const opn = require('opn');

const app = express();
const port = 3000;

const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const proxyMiddleWare = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const config = require('./webpack.common.conf')('development');
const proxyTable = require('proxy');
const compiler = webpack(config);

for (let context in proxyTable) {
    app.use(proxyMiddleWare(context, proxyTable[context]))
}

app.use(webpackDevMiddleWare(compiler,  {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleWare(compiler));

app.listen(port, function() {
    console.log('success listen to ' + port);
    opn('http://localhost' + port);
});