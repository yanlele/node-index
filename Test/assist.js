/**
 * 序列化化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
function serialize(data) {
    let str = '';
    for(let key in data) {
        str += key + '=' + encodeURIComponent(data[key]) + '&';
    }
    str = str.replace(/&$/, '');
    return str;
}
module.exports = serialize;