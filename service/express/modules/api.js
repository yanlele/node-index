'use strict';
/**
 * 初始化api
 */
const getaway = require('@zbj/orochi-gateway');
const getawayMock = require('@zbj/api-gateway-mock');
const log = require('../common/log');

/**
 * 初始化项目API
 * @param  {String} server 当前server对象
 * @return {Object}        Promise对象
 */
module.exports = function(server) {
    if(server.config.closeApi) {
        log.info('检测到API关闭配置,略过初始化API');
        return Promise.resolve();
    }
    log.info('开始初始化API');
    return new Promise(function(resolve) {
        // 检测是否开启mock配置
        if(server.config.mock) {
            log.info('根据配置启用-mock方法');
            getawayMock.init(server);
        }else {
            log.info('根据配置启用-非mock方法');
            getaway.init(server);
        }
        log.success('初始化API成功');
        return resolve();
    });
};