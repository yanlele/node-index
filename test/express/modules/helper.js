'use strict';
/**
 * 初始化helper
 */

const path = require('path');
const fs = require('fs');
const Handlebars = require('hbs');
const recursive = require('recursive-readdir');
const log = require('./log');


/**
 * 初始化项目模板helper
 * @param  {String} appDir  项目目录
 * @param  {Object} config  配置
 * @return {Object}         Promise对象
 */
module.exports = function(appDir, config) {
    log.info('开始初始化项目helper');
    const helperDir = path.join(__dirname, '../helpers/');
    log.success('初始化内置helper成功');
    // 自定义helper扩展
    if (fs.existsSync(helperDir)) {
        log.info('查询到handlebars自定义helper文件夹,开始解析');
        // 自定义方法
        recursive(helperDir, function (err, files) {
            if(err) {
                log.error('查询handlebars自定义helper错误');
                return reject(err);
            }
            files.forEach(function(filePath) {
                const helper = require(filePath);
                if(typeof helper === 'function') {
                    Handlebars.registerHelper(helper(Handlebars));
                }
                else Handlebars.registerHelper(helper);
            });
        });
    }else{
        log.info('没有handlebars自定义helper文件夹,被略过');
    }
    log.success('初始化自定义helper成功');
};