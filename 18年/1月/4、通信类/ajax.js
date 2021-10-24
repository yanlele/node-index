/*  通过ES6来创建一个ajax方式  */
let  getJson=(url)=>{
    let  promise=new Promise((resolve,reject)=>{
        let  client= new XMLHttpRequest();
        client.open('get',url);
        client.responseType='json';
        client.setRequestHeader('Accept','application/json');
        client.onreadystatechange=handler;
        client.send();

        function handler(){
            if(this.readyState!==4){
                /*
                 0	UNSENT	代理被创建，但尚未调用 open() 方法。
                 1	OPENED	open() 方法已经被调用。
                 2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
                 3	LOADING	下载中； responseText 属性已经包含部分数据。
                 4	DONE	下载操作已完成。
                * */
                return false;
            }

            if(this.status===200){
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }
    });

    return promise;
};

getJson('./test.json').then((res)=>{
    console.log(res);
});



/* 封装一个高级的ajax工具 */
extend = function (dst, obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            dst[i] = obj[i];
        }
    }
};

json = function (options) {
    var opt = {
        url: '',
        type: 'get',
        data: {},
        success: function () {
        },
        error: function () {
        },
    };
    extend(opt, options);
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
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
