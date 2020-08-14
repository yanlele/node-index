# Promise 对象

<!-- toc -->

- [1、Promise 的含义](#1promise-%E7%9A%84%E5%90%AB%E4%B9%89)
- [2、基本用法](#2%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
- [3、Promise.prototype.then()](#3promiseprototypethen)
- [4、Promise.prototype.catch()](#4promiseprototypecatch)
- [5、Promise.all()](#5promiseall)
- [6、Promise.race()](#6promiserace)
- [7、Promise.resolve()](#7promiseresolve)
- [8、Promise.reject()](#8promisereject)
- [9、两个有用的附加方法](#9%E4%B8%A4%E4%B8%AA%E6%9C%89%E7%94%A8%E7%9A%84%E9%99%84%E5%8A%A0%E6%96%B9%E6%B3%95)
  * [9.1、done()](#91done)
  * [9.2、finally()](#92finally)
- [10、Promise的使用](#10promise%E7%9A%84%E4%BD%BF%E7%94%A8)

<!-- tocstop -->

### 1、Promise 的含义
Promise 是异步编程的一种解决方案，比传统的解决方案 —— 回调函数和事件 —— 更合理和更强大。它由社区最早提出和实现， ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

Promise对象有以下两个特点。           
（ 1 ）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled ）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是 “ 承诺 ” ，表示其他手段无法改变。           
（ 2 ）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（ Event ）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。             
有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。         
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。            

### 2、基本用法

实例1：基本用法        
```javascript
    var promise = new Promise(function(resolve, reject) {
    	// ... some code
        if (/*  异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
    });
```

实例2：只要一new Promise后就会立即执行。          
```javascript
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
```

实例3：下面是一个用 Promise 对象实现的 Ajax 操作的例子。（非常经典）          
```javascript
    var getJSON = function (url) {
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
```

### 3、Promise.prototype.then()

Promise 实例具有then方法，也就是说，then方法是定义在原型对象 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是 Resolved 状态的回调函数，第二个参数（可选）是 Rejected 状态的回调函数。          
then方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。           
```javascript
    getJSON("/posts.json").then(function(json) {
        return json.post;
    }).then(function(post) {
        // ...
    });
```

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用。           
```javascript
    getJSON("/post/1.json").then(function (post) {
        return getJSON(post.commentURL);
    }).then(function funcA(comments) {
        console.log("Resolved: ", comments);
    }, function funcB(err) {
        console.log("Rejected: ", err);
    });
```

上面代码中，第一个then方法指定的回调函数，返回的是另一个 Promise 对象。这时，第二个then方法指定的回调函数，就会等待这个新的 Promise 对象状态发生变化。如果变为 Resolved ，就调用funcA，如果状态变为 Rejected ，就调用funcB。              


### 4、Promise.prototype.catch()     
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。         
实例：     
```javascript
    getJSON("/posts.json").then(function (posts) {
        // ...
    }).catch(function (error) {
        //  处理 getJSON  和 前一个回调函数运行时发生的错误
        console.log(' 发生错误！ ', error);
    });
```

跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数， Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。           
```javascript
    var someAsyncThing = function () {
        return new Promise(function (resolve, reject) {
        //  下面一行会报错，因为 x 没有声明
            resolve(x + 2);
        });
    };
    someAsyncThing().then(function () {
        console.log('everything is great');
    });
```

### 5、Promise.all()     
Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。           
var p = Promise.all([p1, p2, p3]);          
上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 对象的实例。             

实例：         
```javascript
    Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2])=>{
        console.log(`result1:${res1.result}, result2:${res2.userID}`)
    });
```

### 6、Promise.race()            
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

### 7、Promise.resolve()         
有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。        
```javascript
    var jsPromise = Promise.resolve($.ajax('/whatever.json'));  
```

### 8、Promise.reject()          
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。它的参数用法与Promise.resolve方法完全一致。               


### 9、两个有用的附加方法         
ES6 的 Promise API 提供的方法不是很多，有些有用的方法可以自己部署。下面介绍如何部署两个不在 ES6 之中、但很有用的方法。          
#### 9.1、done()     
Promise 对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为 Promise 内部的错误不会冒泡到全局）。因此，我们可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。              
```javascript
    asyncFunc()
        .then(f1)
        .catch(r1)
        .then(f2)
        .done();
```

#### 9.2、finally()      
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。               
```javascript
    server.listen(0)
        .then(function () {
    // run test
        })
        .finally(server.stop);
```

### 10、Promise的使用           
使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。          
```javascript
    function getFoo() {
        return new Promise(function (resolve, reject) {
            resolve('foo');
        });
    }
    
    var g = function* () {
        try {
            var foo = yield getFoo();
            console.log(foo);
        } catch (e) {
            console.log(e);
        }
    };
    
    function run(generator) {
        var it = generator();
    
        function go(result) {
            if (result.done) return result.value;
            return result.value.then(function (value) {
                return go(it.next(value));
            }, function (error) {
                return go(it.throw(error));
            });
        }
    
        go(it.next());
    }
    
    run(g);
```

### 参考文章
- [超详细的 Promise 理解与实现](https://juejin.im/post/6857934319886893064)
- [前端 Promise 常见的应用场景](https://juejin.im/post/6844904131702833159)
- [Promise 执行过程的正确理解姿势](https://juejin.im/post/6844903974563233799)
- [【JavaScript】必须要会的手写Promise](https://juejin.im/post/6844904142087913486)
