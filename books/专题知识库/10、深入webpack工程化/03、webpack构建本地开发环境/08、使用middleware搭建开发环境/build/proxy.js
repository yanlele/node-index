
module.exports = {
    '/': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
            '': '/api/'
        }
    }
}