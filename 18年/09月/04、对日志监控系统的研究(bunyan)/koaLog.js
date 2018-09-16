const chalk = require('chalk');
const moment = require('moment');
const now = moment(new Date()).format('YYYY-MM-DD HH:ss:mm');
const fs = require('fs');
const path = require('path');

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


const defaultPath = path.resolve(__dirname, 'logs');
const applicationName = '我是程序日志';

function writeLogFile(options) {
    let filePath = path.resolve(options.defaultPath, applicationName.applicationName + '_' + options.type + '.log');
    fs.writeFile(filePath, options.writeMessage, {
        'flag': 'a'
    }, function (err) {
        new Error('写入文件失败')
    })
}



/**
 *
 * @param options
 * @returns {log} 必须要包含 defaultPath 和 applicationName
 * @constructor
 */
function KoaLog(options) {
    let defaultOptions = {
        defaultPath: __dirname
    };
    // get package.json name
    try {
        const pkg = require('./package.json');
        if(pkg && pkg.name) {
            defaultOptions.applicationName = pkg.name;
        }
    } catch(e) {
        defaultOptions.applicationName = ''
    }
    options = Object.assign(defaultOptions, options);

    logTypeList.forEach(function (logType) {
        logType.type = function () {
            let args = Array.prototype.slice.call(arguments, 0);
            let writeMessage = `[${now} - ${logType.type}] ${args}` + '\n';
            if (logType.icon) args = [logType.icon].concat(args);
            let message = `[${now} - ${logType.type}] ${chalk[logType.color].apply(global.console, args)}`;
            global.console.log(message);
            if (logType.type === 'info' || logType.type === 'error' || logType === 'fate') {
                // 如果是这三种情况的日志，就需要输入 到日志文件夹

                fs.exists(defaultPath, function (filePathMsg) {
                    if (filePathMsg) {
                        // 文件夹存在 直接写入日志
                        writeLogFile(Object.assign(options, {type: logType.type, writeMessage}));
                    } else {
                        new Error('文件夹不存在');
                    }
                })
            }
        };
    });

    function log(ctx, next) {
        console.log(this);
    }
    return log;
}

KoaLog({
    defaultPath: path.resolve(__dirname, 'logs'),
    applicationName: 'app'
})();

module.exports = KoaLog;