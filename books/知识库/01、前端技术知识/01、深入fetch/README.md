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

## Request 简介
Request 对象表示一次 fetch 调用的请求信息。传入 Request 参数来调用 fetch, 可以执行很多自定义请求的高级用法:                      
- method - 支持 GET, POST, PUT, DELETE, HEAD
- url - 请求的 URL
- body(String): HTTP的请求参数
- headers - 对应的 Headers 对象
- referrer - 请求的 referrer 信息
- mode - 可以设置 cors, no-cors, same-origin
- credentials - 设置 cookies 是否随请求一起发送。可以设置: omit, same-origin
- redirect - follow, error, manual
- integrity - subresource 完整性值(integrity value)
- cache - 设置 cache 模式 (default, reload, no-cache)

Request 的示例如下:
```javascript
var request = new Request('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

fetch(request).then(function() { /* handle response */ });
```
只有第一个参数 URL 是必需的。在 Request 对象创建完成之后, 所有的属性都变为只读属性. 
请注意, Request 有一个很重要的 clone 方法, 特别是在 Service Worker API 中使用时 —— 一个 Request 就代表一串流(stream), 如果想要传递给另一个 fetch 方法,则需要进行克隆。

fetch 的方法签名(signature,可理解为配置参数), 和 Request 很像, 示例如下:
```javascript
fetch('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
}).then(function() { /* handle response */ });
```

## Response 简介
Response 代表响应, fetch 的 then 方法接收一个 Response 实例, 
当然你也可以手动创建 Response 对象 —— 比如在 service workers 中可能会用到. Response 可以配置的参数包括:                           
- type - 类型,支持: basic, cors
- url
- useFinalURL - Boolean 值, 代表 url 是否是最终 URL
- status - 状态码 (例如: 200, 404, 等等)
- ok - Boolean值,代表成功响应(status 值在 200-299 之间)
- statusText - 状态值(例如: OK)
- headers - 与响应相关联的 Headers 对象.

```javascript
// 在 service worker 测试中手动创建 response
// new Response(BODY, OPTIONS)
var response = new Response('.....', {
    ok: false,
    status: 404,
    url: '/'
});

// fetch 的 `then` 会传入一个 Response 对象
fetch('/')
    .then(function(responseObj) {
        console.log('status: ', responseObj.status);
    });
```

**Response 提供的方法如下:**                                               
- clone() - 创建一个新的 Response 克隆对象.
- error() - 返回一个新的,与网络错误相关的 Response 对象.
- redirect() - 重定向,使用新的 URL 创建新的 response 对象..
- arrayBuffer() - Returns a promise that resolves with an ArrayBuffer.
- blob() - 返回一个 promise, resolves 是一个 Blob.
- formData() - 返回一个 promise, resolves 是一个 FormData 对象.
- json() - 返回一个 promise, resolves 是一个 JSON 对象.
- text() - 返回一个 promise, resolves 是一个 USVString (text).


### 处理 JSON响应
假设需要请求 JSON —— 回调结果对象 response 中有一个json()方法,用来将原始数据转换成 JavaScript 对象:
```javascript
fetch('https://davidwalsh.name/demo/arsenal.json').then(function(response) { 
    // 转换为 JSON
    return response.json();
}).then(function(j) {
    // 现在, `j` 是一个 JavaScript object
    console.log(j); 
});
```

### 处理基本的Text / HTML响应
JSON 并不总是理想的请求/响应数据格式, 那么我们看看如何处理 HTML或文本结果:
```javascript
fetch('/next/page')
  .then(function(response) {
    return response.text();
  }).then(function(text) { 
    // <!DOCTYPE ....
    console.log(text); 
  });
```

### 处理Blob结果
如果你想通过 fetch 加载图像或者其他二进制数据, 则会略有不同:
```javascript
fetch('flowers.jpg')
    .then(function(response) {
      return response.blob();
    })
    .then(function(imageBlob) {
      document.querySelector('img').src = URL.createObjectURL(imageBlob);
    });
```

### 提交表单数据(Posting Form Data)
另一种常用的 AJAX 调用是提交表单数据 —— 示例代码如下:
```javascript
fetch('/submit', {
    method: 'post',
    body: new FormData(document.getElementById('comment-form'))
});
```

提交 JSON 的示例如下:
```javascript
fetch('/submit-json', {
    method: 'post',
    body: JSON.stringify({
        email: document.getElementById('email').value
        answer: document.getElementById('answer').value
    })
});
```


## fetch取消
fetch 并不支持 取消请求的功能