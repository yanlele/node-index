/**
 * create by yanlele
 * create time 2018-11-22 14:36
 */


let getJson = function (url) {
    return new Promise(function (resolve, reject) {
        let client = new XMLHttpRequest();
        // ActiveXObject('Microsoft.XMLHttp')

        client.open('get', url);
        client.setRequestHeader('Accept', 'application/json');
        client.setRequestHeader('Content-Type', 'application/json');
        client.responseType = 'json';
        client.onreadystatechange = function () {
            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
    })
};

