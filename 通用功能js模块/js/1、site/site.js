/**
 * 常用功能函数
 * @exports:
    getParam(name): 获取url参数，name为参数名，不传递name则返回所有url参数json对象;
    param(obj): 将对象转为查询字符串
    redirect(url, obj): 跳转到某页面，obj对象将转化为url参数
*/

function isFunction(obj) {
    return ({}).toString.call(obj) == '[object Function]'
}

function buildParams(prefix, obj, add) {
    if (Array.isArray(obj)) {
        obj.forEach(function(item) {
            add(prefix, item)
        })

    } else {
        add(prefix, obj)
    }
}

const site = {
    getParam: function(name){
        var url = window.location.href;
        var start = url.indexOf('?'), end = url.indexOf('#');
        if(start == -1) return name?'':{};
        var str = url.substring(start+1, end == -1?url.length:end);
        //str.replace(/script/g,'').replace(/[\<\>\"\']/g,'');
        var arr = str.split('&');
        var obj = {};
        for(var i=0; i<arr.length; i++) {
            var a = arr[i].split('=');
            obj[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        }
        if(name) return obj[name];
        else return obj;
    },
    param: function(obj){
        let prefix,
            s = [],
            add = function(key, value) {
                value = isFunction(value) ? value() : (value == null ? '' : value)
                s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
            }

        for (prefix in obj) {
            buildParams(prefix, obj[prefix], add)
        }

        return s.join('&').replace(/%20/g, '+')
    },
    redirect:function(url,obj){
        var params = this.param(obj||{});
        window.location.href = url + (params?'?':'') + params;
    }
};

const sendData = {
    username: '1111',
    task_id: 'rest.taskId',
    from_date: 'rest.fromDate',
    to_date: 'rest.toDate',
};

console.log(site.param(sendData));


module.exports = site;
