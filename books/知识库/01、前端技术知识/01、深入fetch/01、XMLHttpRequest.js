/**
 * create by yanlele
 * create time 2018-11-16 16:17
 */

/*
let getJson = function (url) {
    let promise = new Promise(function (resolve, reject) {
        let client = new XMLHttpRequest();
            // client2 = new ActiveXObject('Microsoft.XMLHTTP');

        client.open('GET', url);
        client.onreadystatechange = handler;            // 每次状态发生变化，就会回调这个函数
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();

        function handler() {
            if(this.readyState !== 4) {
                return false;
            }

            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
    });
    return promise;
};*/


let getJson = function (url) {
    return new Promise(function (resolve, reject) {
        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.setRequestHeader('Accept', 'application/json');
        client.responseType = 'json';
        client.onreadystatechange = function () {
            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(this.statusText)
            }
        };
        client.send()
    })
};