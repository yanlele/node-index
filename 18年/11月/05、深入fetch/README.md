# 深入fetch

## fetch 的简单介绍
Fetch  被称为下一代Ajax技术,采用Promise方式来处理数据。
是一种简洁明了的API，比XMLHttpRequest更加简单易用。

页面中需要向服务器请求数据时，基本上都会使用Ajax来实现。
Ajax的本质是使用XMLHttpRequest对象来请求数据，而XMLHttpRequest对象是通过事件的模式来实现返回数据的处理。                                                
与XMLHttpRequest类似，Fetch允许你发出AJAX请求。
区别在于Fetch API使用Promise方式，Promise是已经正式发布的ES6的内容之一，
因此是一种简洁明了的API，比XMLHttpRequest更加简单易用。

## XMLHttpRequest 的使用
AJAX半遮半掩的底层API是饱受诟病的一件事情. XMLHttpRequest 并不是专为Ajax而设计的。 
虽然各种框架对 XHR 的封装已经足够好用, 但我们可以做得更好。更好用的API是 fetch 。
下面简单介绍 window.fetch 方法, 在最新版的 Firefox 和 Chrome 中已经提供支持。

在我看来 XHR 有点复杂。使用XHR的方式大致如下:
```javascript
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
```

## fetch 的使用
fetch 是全局量 window 的一个方法, 第一个参数是URL:
```javascript
// url (必须), options (可选)
fetch('/some/url', {
    method: 'get'
}).then(function(response) {

}).catch(function(err) {
    // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
});
```

fetch API 也使用了 JavaScript Promises 来处理结果/回调:
```javascript
// 对响应的简单处理
fetch('/some/url').then(function(response) {

}).catch(function(err) {
    // 出错了;等价于 then 的第二个参数,但这样更直观 :(
});

// 链式处理,将异步变为类似单线程的写法: 高级用法.
fetch('/some/url').then(function(response) {
    return new Promise()  //... 执行成功, 第1步...
}).then(function(returnedValue) {
    // ... 执行成功, 第2步...
}).catch(function(err) {
    // 中途任何地方出错...在此处理 :( 
});
```

## 请求头(Request Headers)
自定义请求头信息极大地增强了请求的灵活性。我们可以通过 new Headers() 来创建请求头:
```javascript
// 创建一个空的 Headers 对象,注意是Headers，不是Header
var headers = new Headers();

// 添加(append)请求头信息
headers.append('Content-Type', 'text/plain');
headers.append('X-My-Custom-Header', 'CustomValue');

// 判断(has), 获取(get), 以及修改(set)请求头的值
headers.has('Content-Type'); // true
headers.get('Content-Type'); // "text/plain"
headers.set('Content-Type', 'application/json');

// 删除某条请求头信息(a header)
headers.delete('X-My-Custom-Header');

// 创建对象时设置初始化信息
var headers = new Headers({
    'Content-Type': 'text/plain',
    'X-My-Custom-Header': 'CustomValue'
});
```
可以使用的方法包括: append, has, get, set, 以及 delete 。

需要创建一个 Request 对象来包装请求头:
```javascript
var request = new Request('/some-url', {
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetch(request).then(function() { /* handle response */ });
```


