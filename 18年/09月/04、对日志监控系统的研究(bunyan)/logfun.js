'use strict';
/**
 * 输出控制台日志记录
 */
const chalk = require('chalk');
const moment = require('moment');
const now  = moment(new Date()).format('YYYY-MM-DD HH:ss:mm');
const logTypeList = [
    {
        'type': 'info',
        'color': 'gray',
        'icon': '>'
    },
    {
        'type': 'error',
        'color': 'red',
        'icon': '✗'
    },
    {
        'type': 'success',
        'color': 'green',
        'icon': '✔'
    },
    {
        'type': 'trace',
        'color': 'dim',
        'icon': '*'
    },
    {
        'type': 'debug',
        'color': 'blue',
        'icon': '*'
    },
    {
        'type': 'warn',
        'color': 'yellow',
        'icon': '!'
    },
    {
        'type': 'fatal',
        'color': 'bgRed',
        'icon': '✗'
    }
];

logTypeList.forEach(function(logType) {
    exports[logType.type] = function() {
        let args = Array.prototype.slice.call(arguments, 0);
        if(logType.icon) args = [logType.icon].concat(args);
        global.console.log(`[${now} - ${logType.type}] ${chalk[logType.color].apply(global.console, args)}`);
    };
});