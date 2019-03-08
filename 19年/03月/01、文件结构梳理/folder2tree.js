/**
 *
 * @fileoverview Show your folder structure with tree nodes. 用树形节点展示文件夹结构
 * @version 1.1
 * @author HJava, litten
 * @lastUpdate 2014-08-14 09:35
 * @function: 1. init(ctn ,data)
 */
(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root['folder2tree'] = factory();
    }
}(this, function() {

    var arr2obj = function(arr) {
        var obj = {};
        for(var i = 0, len = arr.length; i < len; i++) {
            var em = arr[i];
            if(typeof(em) === "string" || typeof(em) === "number") {
                obj[em] = em;
            } else if(typeof(em) === "object") {
                for(var key in em) {
                    obj[key] = arr2obj(em[key]);
                }
            }
        }
        return obj;
    }

    function getObjLen(obj) {
        var count = 0;
        for(var em in obj) {
            count++;
        }
        return count;
    }

    function getTree(data) {
        var result = createDiv();
        var all = show(data, '');
        for(var i = 0; i < all.length; i++) {
            result.appendChild(all[i]);
        }
        return result;
    }

    function show(data, content) {
        var all = [];
        var len = getObjLen(data);
        var count = 1;

        for(var i in data) {
            var front = content;
            var isLast = (count === len) ? true : false;
            front += isLast ? '&emsp;&nbsp;&nbsp;' : '│&emsp;';
            if(typeof data[i] === 'string' || typeof data[i] === 'number') {
                all.push(createDiv(i, data[i], content, isLast));
            } else if(typeof data[i] === "object") {
                all.push(createDiv(i, i, content, isLast));
                var arr = arguments.callee(data[i], front);
                var parent = createDiv(i, '', content, isLast);
                for(var j in arr) {
                    parent.appendChild(arr[j]);
                }
                all = all.concat(parent);
            } else {
                continue;
            }
            count++;
        }
        return all;
    }

    function createDiv(key, value, front, isLast) {
        var key = key || '';
        var value = value || '';
        var div = document.createElement('div');
        if(key !== '') {
            div.setAttribute('data-key', key);
        }
        if(value !== '') {
            var content = isLast ? '└─' : '├─';
            div.innerHTML = front + content + value;
        }
        return div;
    }

    return {
        /**
         * 初始化方法
         *
         * @param {Dom} ctn 父级dom节点
         * @param {Object} data 描述文件夹层级关系对象
         */
        init: function(ctn, data) {
            ctn = ctn || document.getElementsByTagName("body")[0];
            if(data) {
                if(data instanceof Array) {
                    data = arr2obj(data);
                }
                console.log(data);
                ctn.appendChild(getTree(data));
            } else {
                console.log("data is null");
            }
            console.log(ctn);
        }
    }
}));
