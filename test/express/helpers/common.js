'use strict';
/**
 * 自定义公共helper方法
 * @author zhangjingj
 * @createtime 2018-05-25
 */
// 对象方法
/**
 * 获取对象的特定key值
 * @param   {Object} context   obj对象
 * @param   {String} ...props  key值，如test.a.b，可以传多个参数，如'test.a' 'name'
 * @returns {Any}              返回值
 */
exports.objGet = function(context) {
    const props = Array.prototype.slice.call(arguments, 1, arguments.length - 1).filter(function(key) {
        return key;
    }).join('.');
    let returnValue = context;
    let objPropArr = props.split('.');
    objPropArr.every(function(key) {
        if(returnValue && returnValue[key]) {
            returnValue = returnValue[key];
            return true;
        }
        return false;
    });
    return returnValue;
};