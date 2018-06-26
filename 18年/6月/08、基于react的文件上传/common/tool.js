import {pathPrefix, uploadSize, tokenUri, appName, protocol, auditURI, $app} from './const';
import {fetch} from './api';

let diff = 0;
const baseURI = $app.getAttribute('data-base');
const runtime = $app.getAttribute('data-runtime');

//日志方法
export const log = window.console;

/**
 * 获取当前路径地址
 * @param  {Object} routing 路由对象
 * @return {String}         路径地址
 */
export function getCurPath(routing) {
    let pathname = routing.location.pathname;
    if(!/\/$/.test(pathname)) {
        pathname += '/';
    }
    return pathname.replace(pathPrefix, '');
}

/**
 * 获取当前路由参数
 * @param  {Object} routing 路由对象
 * @return {Object}         返回请求参数
 */
export function getQuery(routing) {
    return routing.location.query || {};
}

/**
 * 获取跳转路径
 * @param  {String} path 路径地址
 * @return {String}      正确路径
 */
export function getPath(path) {
    if(!/^\//.test(path)) {
        path = '/' + path;
    }
    return pathPrefix + path;
}

/**
 * 获取标准分页数据
 * @param  {Object} data 源数据
 * @return {Object}      标准分页数据
 */
export function getPageData(data) {
    return {
        current: data.page,
        total: data.total,
        pageSize: data.pageSize,
        showSizeChanger: true,
        showTotal: function(total) {
            return `共有 ${total} 条记录`;
        },
        pageSizeOptions: ['10', '50', '100']
    };
}

/**
 * 获取表格过滤项
 * @param  {Object} enumObj 枚举对象
 * @return {Array}          过滤数组
 */
export function getEnumsArray(enumObj) {
    return Object.keys(enumObj).map(function(key) {
        return {
            text: enumObj[key],
            value: key
        };
    });
}

/**
 * 序列化化数据
 * @param  {Object} data 数据对象
 * @return {String}      URL用数据
 */
export function serialize(data) {
    let str = '';
    for(let key in data) {
        str += key + '=' + encodeURIComponent(data[key]) + '&';
    }
    str = str.replace(/&$/, '');
    return str;
}

/**
 * 查询是否
 * @param  {[type]}  fieldsError [description]
 * @return {Boolean}             [description]
 */
export function formHasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

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

export function setTimeDiff(curDate) {
    diff = new Date().getTime() - new Date(curDate).getTime();
}

export function getCurDate(timediff) {
    return new Date(new Date().getTime() + diff - timediff);
}


// 七牛上传相关方法
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
 * 上传图片
 * @param  {Object} file 文件对象
 * @return {Object}      Promise对象
 */
export function getUploadToken(file, option) {
    if(uploadSize && file.size > uploadSize) {
        return Promise.reject(new Error('上传文件超过指定文件限制，文件必须小于' + getSizeInfo(uploadSize)));
    }
    const data = Object.assign({
        name: file.name,
        belongToDomain: 'homesite',
        belongToSystem: 'task'
    }, option);
    return fetch('upload-token', data, 'jsonp', {
        jsonpCallback: 'jsonpCallback'
    });
}

/**
 * 获取上传图片的实际地址
 * @param  {Object} file 文件对象或者key值
 * @return {String}      文件预览地址
 */
export function getUploadDownloadPath(file) {
    let key;
    if(typeof file === 'string') {
        key = file;
    }else {
        key = file.response.data.key;
    }
    return `${tokenUri}/redirect?key=${encodeURIComponent(key)}`;
}

/**
 * 获取上传文件信息
 * @param  {Object} file 文件对象
 * @return {Object}      文件信息,参照http://zbjrms.t10.zbjdev.com/resource/getDownloadParamJsonp?key=default/default/test.txt/origine/90236886-0a4b-47c1-9fc5-59466017ce2d&jsonpCallback=test
 */
export function getUploadDownloadInfo(file) {
    return fetch('upload-file-info', {
        key: file.response.data.key
    }, 'jsonp', {
        jsonpCallback: 'jsonpCallback'
    })
        .then(function(data) {
            if(data.success) {
                return Promise.resolve(data.data);
            }
            return Promise.reject(new Error(data.description));
        });
}

/**
 * 更新boss页面url地址
 * 
 * @param {*} url 更新后的地址
 */
export function updateHistory(url) {
    if(runtime !== 'dev') window.top.postMessage('updateHistory:::' + encodeURIComponent(url), `${protocol}//boss.${baseURI}`);
}


// 上传地址
export const uploadUrl = protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com';