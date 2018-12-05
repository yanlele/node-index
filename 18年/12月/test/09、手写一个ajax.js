let getJson = function (url) {
    return new Promise(function(resolve , reject) {
        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.setRequestHeader('Context-Type', 'application/json');
        client.onreadystatechange = function () {
            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        };
        client.send();
    })
};