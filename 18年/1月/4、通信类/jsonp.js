/**
 * 功能类库
 */
/**
 * [util 工具类]
 * @type {Object}
 */
var util = {};

/**
 * [function 返回数组的指定项]
 * @param  {[type]} array [description]
 * @param  {[type]} item  [description]
 * @return {[type]}       [description]
 */
util.indexOf = function (array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === item) {
            return i;
        }
    }
    return -1;
};

/**
 * [function 判断是否为函数]
 * @param  {[type]} source [description]
 * @return {[type]}        [description]
 */
util.isFunction = function (source) {
    return '[object Function]' === Object.prototype.toString.call(source);
};

/**
 * [isIE 判断是不是ie]
 * @return {Boolean} [如果是ie返回版本号，不是则返回false]
 */
util.isIE = function () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/**
 * [function 对象浅复制]
 * @param  {[type]} dst [description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
util.extend = function (dst, obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            dst[i] = obj[i];
        }
    }
};

/**
 * [function 获取一个随机的5位字符串]
 * @param  {[type]} prefix [description]
 * @return {[type]}        [description]
 */
util.getName = function (prefix) {
    return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

/**
 * [function 在页面中注入js脚本]
 * @param  {[type]} url     [description]
 * @param  {[type]} charset [description]
 * @return {[type]}         [description]
 */
util.createScript = function (url, charset) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    charset && script.setAttribute('charset', charset);
    script.setAttribute('src', url);
    script.async = true;
    return script;
};

/**
 * [function jsonp]
 * @param  {[type]} url      [description]
 * @param  {[type]} onsucess [description]
 * @param  {[type]} onerror  [description]
 * @param  {[type]} charset  [description]
 * @return {[type]}          [description]
 */
util.jsonp = function (url, onsuccess, onerror, charset) {
    var callbackName = util.getName('tt_player');
    window[callbackName] = function () {
        if (onsuccess && util.isFunction(onsuccess)) {
            onsuccess(arguments[0]);
        }
    };
    var script = util.createScript(url + '&callback=' + callbackName, charset);
    script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            // 移除该script的 DOM 对象
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            // 删除函数或变量
            window[callbackName] = null;
        }
    };
    script.onerror = function () {
        if (onerror && util.isFunction(onerror)) {
            onerror();
        }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
};

/**
 * [json 实现ajax的json]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
util.json = function (options) {
    var opt = {
        url: '',
        type: 'get',
        data: {},
        success: function () {
        },
        error: function () {
        },
    };
    util.extend(opt, options);
    if (opt.url) {
        var xhr = XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        var data = opt.data,
            url = opt.url,
            type = opt.type.toUpperCase(),
            dataArr = [];
        for (var k in data) {
            dataArr.push(k + '=' + data[k]);
        }
        if (type === 'GET') {
            url = url + '?' + dataArr.join('&');
            xhr.open(type, url.replace(/\?$/g, ''), true);
            xhr.send();
        }
        if (type === 'POST') {
            xhr.open(type, url, true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(dataArr.join('&'));
        }
        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 304) {
                var res;
                if (opt.success && opt.success instanceof Function) {
                    res = xhr.responseText;
                    if (typeof res === 'string') {
                        res = JSON.parse(res);
                        opt.success.call(xhr, res);
                    }
                }
            } else {
                if (opt.error && opt.error instanceof Function) {
                    opt.error.call(xhr, res);
                }
            }
        };
    }
};

/**
 * [function crc32加密]
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
util.crc32 = function (url) {
    var a = document.createElement('a');
    a.href = url;
    var T = (function () {
        var c = 0,
            table = new Array(256);
        for (var n = 0; n != 256; ++n) {
            c = n;
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            c = ((c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1));
            table[n] = c;
        }
        return typeof Int32Array !== 'undefined' ? new Int32Array(table) : table;
    })();
    var crc32_str = function (str) {
        var C = -1;
        for (var i = 0, L = str.length, c, d; i < L;) {
            c = str.charCodeAt(i++);
            if (c < 0x80) {
                C = (C >>> 8) ^ T[(C ^ c) & 0xFF];
            } else if (c < 0x800) {
                C = (C >>> 8) ^ T[(C ^ (192 | ((c >> 6) & 31))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xFF];
            } else if (c >= 0xD800 && c < 0xE000) {
                c = (c & 1023) + 64;
                d = str.charCodeAt(i++) & 1023;
                C = (C >>> 8) ^ T[(C ^ (240 | ((c >> 8) & 7))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 2) & 63))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | ((d >> 6) & 15) | ((c & 3) << 4))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | (d & 63))) & 0xFF];
            } else {
                C = (C >>> 8) ^ T[(C ^ (224 | ((c >> 12) & 15))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | ((c >> 6) & 63))) & 0xFF];
                C = (C >>> 8) ^ T[(C ^ (128 | (c & 63))) & 0xFF];
            }
        }
        return C ^ -1;
    };
    var r = a.pathname + '?r=' + Math.random().toString(10).substring(2);
    if (r[0] != '/') {
        r = '/' + r;
    }
    var s = crc32_str(r) >>> 0;
    var is_web = location.protocol.indexOf('http') > -1;
    return (is_web ? [location.protocol, a.hostname] : ['http:', a.hostname]).join('//') + r + '&s=' + s;
};

export default util;
