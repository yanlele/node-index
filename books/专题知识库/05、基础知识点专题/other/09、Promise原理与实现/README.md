## Primise原理与实现

目录

<!-- toc -->

- [Promise 核心](#promise-%E6%A0%B8%E5%BF%83)
- [ES6 Promise细节](#es6-promise%E7%BB%86%E8%8A%82)
- [动手实现](#%E5%8A%A8%E6%89%8B%E5%AE%9E%E7%8E%B0)
  * [内部属性](#%E5%86%85%E9%83%A8%E5%B1%9E%E6%80%A7)
  * [执行器](#%E6%89%A7%E8%A1%8C%E5%99%A8)
  * [then方法](#then%E6%96%B9%E6%B3%95)
    + [异步实现](#%E5%BC%82%E6%AD%A5%E5%AE%9E%E7%8E%B0)
    + [then 返回值](#then-%E8%BF%94%E5%9B%9E%E5%80%BC)
    + [具体代码](#%E5%85%B7%E4%BD%93%E4%BB%A3%E7%A0%81)
- [七段经典的Promise](#%E4%B8%83%E6%AE%B5%E7%BB%8F%E5%85%B8%E7%9A%84promise)
  * [demo1](#demo1)
  * [demo2](#demo2)
  * [demo3](#demo3)
  * [demo4](#demo4)
  * [demo5](#demo5)
  * [demo6](#demo6)
  * [demo7](#demo7)
- [参考文章](#%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0)

<!-- tocstop -->

### Promise 核心
- Promise 概括来说是对异步的执行结果的描述对象。（这句话的理解很重要）
- Promise 规范中规定了，promise 的状态只有3种：
    - pending
    - fulfilled
    - rejected                          
    Promise 的状态一旦改变则不会再改变。
- Promise 规范中还规定了 Promise 中必须有 then 方法，这个方法也是实现异步的链式操作的基本。

## ES6 Promise细节
- Promise 构造器中必须传入函数，否则会抛出错误。(没有执行器还怎么做异步操作。。。)
- Promise.prototype上的 catch(onrejected) 方法是 then(null,onrejected) 的别名,并且会处理链之前的任何的reject。
- Promise.prototype 上的 then和 catch 方法总会返回一个全新的 Promise 对象。
- 如果传入构造器的函数中抛出了错误,该 promise 对象的[[PromiseStatus]]会赋值为 rejected，并且[[PromiseValue]]赋值为 Error 对象。
- then 中的回调如果抛出错误，返回的 promise 对象的[[PromiseStatus]]会赋值为 rejected，并且[[PromiseValue]]赋值为 Error 对象。
- then 中的回调返回值会影响 then 返回的 promise 对象。(下文会具体分析)

## 动手实现                         
做了上面的铺垫，实现一个 Promise 的思路就清晰很多了，本文使用 ES6 来进行实现，
暂且把这个类取名为 GPromise吧(不覆盖原生的，便于和原生进行对比测试)。
下文中 GPromise 代指将要实现的类，Promise 代指 ES6中的 Promise 类。

### 内部属性
在浏览器中打印出一个 Promise 实例会发现其中会包括两用”[[ ]]”包裹起来的属性，这是系统内部属性，只有JS 引擎能够访问。
```
[[PromiseStatus]]
[[PromiseValue]]
```
以上两个属性分别是 Promise 对象的状态和最终值。                

我们自己不能实现内部属性，JS中私有属性特性(#修饰符现在还是提案)暂时也没有支持，
所以暂且用”_”前缀规定私有属性，这样就模拟了Promise 中的两个内部属性。
```js
class GPromise {
        constructor(executor) {
            this._promiseStatus = GPromise.PENDING;
            this._promiseValue;
            this.execute(executor);
        }

        execute(executor){
            //...
        }

        then(onfulfilled, onrejected){
            //...
        }
    }

GPromise.PENDING = 'pedding';
GPromise.FULFILLED = 'resolved';
GPromise.REJECTED = 'rejected';
```

### 执行器
- 传入构造器的executor为函数，并且在构造时就会执行。
- 我们给 executor 中传入 resolve 和 reject 参数，这两个参数都是函数，用于改变改变 _promiseStatus和 _promiseValue 的值。
- 并且内部做了捕获异常的操作，一旦传入的executor 函数执行抛出错误，GPromise 实例会变成 rejected状态，
    即 _promiseStatus赋值为’rejected’，并且 _promiseValue赋值为Error对象。
    
```js
execute(executor) {
    if (typeof executor != 'function') {
        throw new Error(` GPromise resolver ${executor} is not a function`);
    }
    //捕获错误
    try {
        executor(data => {
            this.promiseStatus = GPromise.FULFILLED;
            this.promiseValue = data;
        }, data => {
            this.promiseStatus = GPromise.REJECTED;
            this.promiseValue = data; 
        });
    } catch (e) {
        this.promiseStatus = GPromise.REJECTED;
        this.promiseValue = e;
    }
}
```

### then方法
#### 异步实现
then 方法内部逻辑稍微复杂点，并且有一点一定一定一定要注意到: then 方法中的回调是异步执行的，思考下下段代码:
```js
console.log(1);
new Promise((resolve,reject)=>{
    console.log(2);
    resolve();
})
.then(()=>console.log(3));
console.log(4);
```
执行结果是什么呢？答案其实是:1 2 4 3。                         

then 方法中的难点就是处理异步,其中一个方案是通过 setInterval来监听GPromise 对象的状态改变，
一旦改变则执行相应then 中相应的回调函数(onfulfilled和onrejected),这样回调函数就能够插入事件队列末尾，
异步执行，实验证明可行，这种方案是最直观也最容易理解的。

#### then 返回值                                
then 方法的返回值是一个新的 GPromise 对象，并且这个对象的状态和 then 中的回调返回值相关，回调指代传入的 onfulfilled 和 rejected。 
1. 如果 then 中的回调抛出了错误，返回的 GPromise 的 _promiseStatus 赋值为’rejected’， _promiseValue赋值为抛出的错误对象。 
2. 如果回调返回了一个非 GPromise 对象， then返回的 GPromise 的 _promiseStatus 赋值为’resolved’， _promiseValue赋值为回调的返回值。 
3. 如果回调返回了一个 GPromise 对象，then返回的GPromise对象 的_promiseStatus和 _promiseValue 和其保持同步。也就是 then 返回的GPromise记录了回调返回的状态和值，不是直接返回回调的返回值。

#### 具体代码
```js
then(onfulfilled, onrejected) {
        let _ref = null,
            timer = null,
            result = new GPromise(() => {});

        //因为 promise 的 executor 是异步操作,需要监听 promise 对象状态变化，并且不能阻塞线程
        timer = setInterval(() => {
            if ((typeof onfulfilled == 'function' && this._promiseStatus == GPromise.FULFILLED) ||
                (typeof onrejected == 'function' && this._promiseStatus == GPromise.REJECTED)) {
                //状态发生变化，取消监听
                clearInterval(timer);
                //捕获传入 then 中的回调的错误，交给 then 返回的 promise 处理
                try {
                    if (this._promiseStatus == GPromise.FULFILLED) {
                        _ref = onfulfilled(this._promiseValue);
                    } else {
                        _ref = onrejected(this._promiseValue);
                    }

                    //根据回调的返回值来决定 then 返回的 GPromise 实例的状态
                    if (_ref instanceof GPromise) {
                        //如果回调函数中返回的是 GPromise 实例，那么需要监听其状态变化，返回新实例的状态是根据其变化相应的
                        timer = setInterval(()=>{
                            if (_ref._promiseStatus == GPromise.FULFILLED ||
                                _ref._promiseStatus == GPromise.REJECTED) {
                                clearInterval(timer);
                                result._promiseValue = _ref._promiseValue;
                                result._promiseStatus = _ref._promiseStatus;
                            }
                        },0);

                    } else {
                        //如果返回的是非 GPromise 实例
                        result._promiseValue = _ref;
                        result._promiseStatus = GPromise.FULFILLED;
                    }
                } catch (e) {
                    //回调中抛出错误的情况
                    result._promiseStatus = GPromise.REJECTED;
                    result._promiseValue = e;
                }
            }
        }, 0);
        //promise 之所以能够链式操作，因为返回了GPromise对象
        return result;
    }
```

## 七段经典的Promise
Promise 的 then 的 注册微任务队列 和 执行 是分离的。                         
注册 : 是完全遵循 JS 和 Promise 的代码的执行过程。                       
执行 : 先 同步，再 微任务 ，再 宏观任务。                            

### demo1
```js
/**
 * promise 是可连续执行的？
 * 是可以的！
 */

new Promise((resolve, reject) => {
  console.log(1);
  // return reject();
  return resolve();
})
    .then(() => {
      console.log(2);
    })
    .then(()=> {
      console.log(3);
    })
    .then(()=> {
      console.log(4);
    })
    .catch(()=> {
      console.log('catch');
    })
    .finally(()=> {
      console.log('finally');
    });
```

### demo2
```js
new Promise((resolve, reject) => {
  console.log(1);
  return resolve()
}).then(() => {
  console.log(2);
  // 外部第一个 then 方法里面 return 一个 Promise，这个 return ，代表 外部的第二个 then 的执行需要等待 return 之后的结果。
  return new Promise((resolve) => {
    console.log(3);

    return resolve()
  })
      .then(() => {
        console.log(4);
      })
      .then(() => {
        console.log(5);
      })
}).then(() => {
  console.log(6);
}).then(() => {
  console.log(7);
});
```


### demo3
```js
// 我们核心要看 then 的回调函数是啥时候注册的，我们知道，事件机制是 “先注册先执行”，
// 即数据结构中的 “栈” 的模式，first in first out。那么重点我们来看下他们谁先注册的。

// 外部的第二个 then 的注册，需要等待 外部的第一个 then 的同步代码执行完成。
// 当执行内部的 new Promise 的时候，然后碰到 resolve，resolve 执行完成，
// 代表此时的该 Promise 状态已经扭转，之后开始内部的第一个 .then 的微任务的注册，此时同步执行完成。
new Promise((resolve) => {
  console.log(1);
  return resolve()
}).then(() => {
  console.log(2);
  // 内部的 resolve 之后，当然是先执行内部的 new Promise 的第一个 then 的注册，这个 new Promise 执行完成，立即同步执行了后面的 .then 的注册。
  new Promise((resolve) => {
    console.log(3);
    return resolve()
  })
      .then(() => {
        console.log(4);
      })
      // 然而这个内部的第二个 then 是需要第一个 then 的的执行完成来决定的，而第一个 then 的回调是没有执行，仅仅只是执行了同步的 .then 方法的注册，所以会进入等待状态。
      .then(() => {
        console.log(5);
      })
      .then(()=> {
        console.log(6);
      })
}).then(() => {
  // 外部的第一个 then 的同步操作已经完成了，
  // 然后开始注册外部的第二个 then，此时外部的同步任务也都完成了。
  // 外部第二个 then 完成之后， 进入等待， 内部的第二个 then 注册之后在执行
  console.log(7);
}).then(() => {
  console.log(8);
}).then(()=> {
  console.log(9);
});
```


### demo4
```js
/**
 * 链式调用的注册是前后依赖的 比如上面的外部的第二个 then 的注册，是需要外部的第一个的 then 的执行完成。
 *
 * 变量定义的方式，注册都是同步的 比如这里的 p.then 和 var p = new Promise 都是同步执行的。
 */
new Promise(resolve=> {
  console.log('1');
  resolve();
})
  .then(()=> {
    console.log(2);
    const p = new Promise(resove=> {
      console.log(3);
      resove();
    });

    p.then(()=> {
      console.log(4);
    });

    p.then(()=> {
      console.log(5);
    });
  })
  .then(()=> {
    console.log(6)
  })
  .then(()=> {
    console.log(7)
  });
```

### demo5
```js
/**
 * 这段代码中，外部的注册采用了非链式调用的写法，根据上面的讲解，
 * 我们知道了外部代码的 p.then 是并列同步注册的。
 * 所以代码在内部的 new Promise 执行完，p.then 就都同步注册完了。
 *
 * 内部的第一个 then 注册之后，
 * 就开始执行外部的第二个 then 了（外部的第二个 then 和 外部的第一个 then 都是同步注册完了）。
 * 然后再依次执行内部的第一个 then ,内部的第二个 then。
 * @type {Promise}
 */
const p = new Promise(resolve => {
  console.log(1);
  resolve()
});

p.then(() => {
  console.log(2);
  new Promise(resolve => {
    console.log(3);
    resolve();
  })
    .then(() => {
      console.log(4);
    })
    .then(() => {
      console.log(5);
    })
});

p.then(() => {
  console.log(6);
});

p.then(() => {
  console.log(7)
});
```

### demo6
```js
new Promise(resolve => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
    new Promise(resolve => {
      console.log(3);
      resolve();
    })
      .then(() => {
        console.log(4);
      })
      .then(() => {
        console.log(5);
      });

    return new Promise(resolve => {
      console.log(6);
      resolve();
    })
      .then(() => {
        console.log(7);
      })
      .then(() => {
        console.log(8);
      })
  })
  .then(() => {
    console.log(9);
  })
  .then(() => {
    console.log(10);
  });
```
 
### demo7
```js
new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then');
    new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then');
        return Promise.resolve();
      })
      .then(() => {
        console.log('内部第二个then');
      })
  })
  .then(() => {
    console.log('外部第二个then');
  })
  .then(() => {
    console.log('外部第三个then');
  })
```




## 参考文章
- [解析 Promise 原理，实现一个Promise](https://blog.csdn.net/u014775861/article/details/78030508)
- [深度揭秘 Promise 微任务注册和执行过程](https://juejin.im/post/5dc028dcf265da4d4b5fe94f)
- [Promise 执行过程的正确理解姿势](https://juejin.im/post/5dad3405f265da5bb252ff32)
