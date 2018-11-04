import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp';
import {serialize, isObjEmpty} from './tool';
import STATUS_CODE from './status_code';

const apiPath = '/api';

const URLS = {
    'common': apiPath + '/url/',
};
let customHeader = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8'
};

/**
 * Fetch请求
 * @param  {String} action   请求路径
 * @param  {Object} data   请求参数
 * @param  {String} method 请求类型
 * @param  {Object} opts   请求选项
 * @return {Object}        Promise对象
 */
function fetchPost(action, data, method, opts) {
    let path = URLS[action];
    if (!path) return Promise.reject(new Error('无效的API地址'));
    let idReg = /:id/;
    if (idReg.test(path)) {
        path = path.replace(idReg, data.id);
        delete data.id;
    }
    let option = {
        method: method ? method.toLowerCase() : 'get'
    };
    switch (method) {
        case 'file':
            option.mode = 'cors';
            break;
        default:
            option.credentials = 'include';
            option.headers = customHeader;
    }

    switch (option.method) {
        case 'file':
            option.method = 'post';
            option.body = data;
            break;
        case 'get':
        case 'jsonp':
            if (!isObjEmpty(data)) {
                path += (/\?/.test(path) ? '&' : '?') + serialize(data);
            }
            break;
        default:
            if (!isObjEmpty(data)) {
                option.body = JSON.stringify(data);
            }
    }
    if (option.method === 'jsonp') {
        return fetchJsonp(path, Object.assign({
            jsonpCallback: 'jsonpcallback'
        }, opts))
            .then(response => response.json());
    } else {
        return fetch(path, Object.assign({}, option, opts))
            .then(response => response.json())
            .then(function (data) {
                if (method === 'file') {
                    return Promise.resolve(data.key);
                }
                else {
                    if (data.status !== STATUS_CODE.SUCCESS) return Promise.reject(new Error(data.msg));
                    return Promise.resolve(data);
                }
            });
    }
}

exports.fetch = fetchPost;