import moment from 'moment';
/**
 * 查询是否为空对象
 * @param  {Object}  obj 查询对象
 * @return {Boolean}     查询结果
 */
export function isObjEmpty(obj) {
    // Speed up calls to hasOwnProperty
    let hasOwnProperty = Object.prototype.hasOwnProperty;

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}



/**
 * 获取文件大小信息
 * @param  {Number} size kb数
 * @return {String}      实际大小
 */
export function getSizeInfo(size) {
    if(size === 0) return '0KB';
    let sOutput;
    for (let aMultiples = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], nMultiple = 0, nApprox = size / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = parseInt(nApprox) + aMultiples[nMultiple];
    }
    return sOutput;
}



/**
 * 格式化数字
 * @param  {Number} number 格式化前数字
 * @param  {Number} digit  位数
 * @return {Number}        格式化后数字
 */
export function formatNumber(number, digit) {
    const accuracyNum = Math.pow(10, digit);
    return parseFloat(Math.round(number * accuracyNum) / accuracyNum);
}

/**
 * 格式化价格
 * @param  {Number} price 价格
 * @return {String}       格式化后的价格
 */
export function formatPrice(price) {
    return formatNumber(price, 2).toFixed(2);
}

/**
 * 格式化日期
 * @param  {Any}    dateData 支持时间戳10/13位,日期对象,字符串
 * @param  {String} format   格式化形式
 * @return {String}          格式化后日期
 */
export function formatDate(dateData, format) {
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
                return moment(dateData).format(format);
            }
            break;
    }
    return '-';
}


// 日期标准格式
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateFormatOnlyDate = 'YYYY-MM-DD';
export const timeFormat = 'HH:mm';
export const dateFormatWithMin = 'YYYY-MM-DD HH:mm';