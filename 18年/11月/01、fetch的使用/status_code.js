'use strict';
//状态码
module.exports = {
    SUCCESS: 200, //成功
    FORBIDDEN: 403, //无权限
    NOT_FOUND: 404, //无页面
    ERROR: 110, //可预期错误
    API_ERROR: 111, //API请求错误
    API_DUBBO_ERROR: 112, //API dubbo接口报错
    UNKNOWN_ERROR: 500, //未知错误
    GETWAY_ERROR: 502 //访问错误
};