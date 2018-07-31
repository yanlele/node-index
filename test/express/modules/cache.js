'use strict';
/**
 * 初始化缓存服务
 */
const cache = require('@zbj/orochi-cache');
const log = require('../common/log');

/**
 * 初始化项目缓存客户端
 * @param  {String} server 当前server对象
 * @return {Object}        Promise对象
 */
module.exports = function(server) {
    if(server.config.closeCacheClient) {
        log.info('检测到缓存客户端关闭配置,略过初始化缓存客户端');
        return Promise.resolve([null, false]);
    }
    log.info('开始初始化缓存客户端');
    return cache.init(server.config).then(function() {
        log.success('初始化缓存客户端成功');
        return Promise.resolve();
    });
};