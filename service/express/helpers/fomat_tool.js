'use strict';

const moment = require('moment');

/**
 * 格式化数字
 * @param  {Number} number 格式化前数字
 * @param  {Number} digit  位数
 * @return {Number}        格式化后数字
 */
function formatNumber(number, digit) {
    const accuracyNum = Math.pow(10, digit);
    return parseFloat(Math.round(number * accuracyNum) / accuracyNum);
}

/**
 * 格式化价格
 * @param  {Number} price 价格
 * @return {String}       格式化后的价格
 */
exports.formatPrice = function(price) {
    return formatNumber(price, 2).toFixed(2);
};

/**
 * 只显示整钱
 * @param  {Number} price 金钱
 * @return {String}       格式化后的金钱
 */
exports.formatMoneny = function(price) {
    return formatNumber(price, 0);
};

/**
 * 获取长度
 * @param  {String} text 字符串
 */
exports.getStringLength = function(text, length) {
    let curLength =  text ? text.length : 0;
    return curLength <= length ? curLength : length;
};

/**
 * 格式化日期
 * @param  {Any}    dateData 支持时间戳10/13位,日期对象,字符串
 * @param  {String} format   格式化形式
 * @return {String}          格式化后日期
 */
exports.formatDate = function(dateData, format) {
    switch(typeof dateData) {
    case 'string':
    case 'number':
        dateData = dateData.toString();
        if(isNaN(dateData)) { // 如果是纯字符串
            return moment(new Date(dateData)).format(format);
        }
        if(dateData.length === 10) return moment(new Date(parseInt(dateData) * 1000)).format(format);
        if(dateData.length === 13) return moment(new Date(parseInt(dateData))).format(format);
        break;
    case 'object':
        if(dateData instanceof Date) {
            return moment().format(format);
        }
        break;
    }
    return '-';
};