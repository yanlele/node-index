/*
var promise = new Promise(function(resolve, reject) {
// ... some code
    if (/!*  异步操作成功 *!/){
        resolve(value);
    } else {
        reject(error);
    }
});
*/
/*

let promise=new Promise((resolve,reject)=>{
    if(1===1){
        resolve(value)
    } else{
        reject(error)
    }
});*/

/*
let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});
promise.then(function() {
    console.log('Resolved.');
});
console.log('Hi!');
// Promise
// Hi!
// Resolved
*/


/*var getJSON = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
    });
    return promise;
};

getJSON("/posts.json").then(function (json) {
    console.log('Contents: ' + json);
}, function (error) {
    console.error(' 出错了 ', error);
});

const getJson = function (url) {
    return new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        client.open('get', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.sned();

        function handler() {
            if (this.readyState !== 4) {
                return false;
            }

            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
    })
};*/


/*getJSON("/posts.json").then(function(json) {
    return json.post;
}).then(function(post) {
    // ...
});*/

/*getJSON("/post/1.json").then(function (post) {
    return getJSON(post.commentURL);
}).then(function funcA(comments) {
    console.log("Resolved: ", comments);
}, function funcB(err) {
    console.log("Rejected: ", err);
});*/


/*getJSON("/posts.json").then(function (posts) {
    // ...
}).catch(function (error) {
    //  处理 getJSON  和 前一个回调函数运行时发生的错误
    console.log(' 发生错误！ ', error);
});*/

/*var someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
    //  下面一行会报错，因为 x 没有声明
        resolve(x + 2);
    });
};
someAsyncThing().then(function () {
    console.log('everything is great');
});*/


/*asyncFunc()
    .then(f1)
    .catch(r1)
    .then(f2)
    .done();*/






