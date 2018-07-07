'use strict';
/**
 * 启动应用
 */

const http = require('http');

const log = require('./common/log');

let port;
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        log.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        log.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    log.info('Listening on ' + bind);
}

/**
 *
 * @param app app实例
 * @param options 可选参数
 * @returns {Promise}
 */
module.exports = function (app, options) {
    /**
     * Get port from environment and store in Express.
     */

    port = normalizePort(process.env.PORT || options.port || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */
    return new Promise((resolve, reject)=> {
        server.listen(port);
        server.on('error', e=>{
            onError(e);
            reject(e);
        });
        server.on('listening', function() {
            onListening(server);
            resolve({
                port: port
            });
        });
    });
};