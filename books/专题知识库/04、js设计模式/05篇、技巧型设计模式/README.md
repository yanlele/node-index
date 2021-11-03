## 第五篇、技巧型设计模式

目录

<!-- toc -->

- [第二十七章-链式模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%83%E7%AB%A0-%E9%93%BE%E5%BC%8F%E6%A8%A1%E5%BC%8F)
- [第二十八章-委托模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E5%85%AB%E7%AB%A0-%E5%A7%94%E6%89%98%E6%A8%A1%E5%BC%8F)
  * [描述:](#%E6%8F%8F%E8%BF%B0)
  * [实际场景](#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF)
  * [代码示例](#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B)
- [第二十九章-数据访问对象模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B9%9D%E7%AB%A0-%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%BC%8F)
  * [描述：](#%E6%8F%8F%E8%BF%B0)
  * [实际场景](#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-1)
- [第三十章-节流模式](#%E7%AC%AC%E4%B8%89%E5%8D%81%E7%AB%A0-%E8%8A%82%E6%B5%81%E6%A8%A1%E5%BC%8F)
  * [描述](#%E6%8F%8F%E8%BF%B0)
  * [实际场景](#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-2)
- [第三十一章-简单模板模式](#%E7%AC%AC%E4%B8%89%E5%8D%81%E4%B8%80%E7%AB%A0-%E7%AE%80%E5%8D%95%E6%A8%A1%E6%9D%BF%E6%A8%A1%E5%BC%8F)
  * [描述：](#%E6%8F%8F%E8%BF%B0-1)
- [第三十二章-惰性模式](#%E7%AC%AC%E4%B8%89%E5%8D%81%E4%BA%8C%E7%AB%A0-%E6%83%B0%E6%80%A7%E6%A8%A1%E5%BC%8F)
  * [描述](#%E6%8F%8F%E8%BF%B0-1)
  * [实际场景](#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-3)
- [第三十三章-参与者模式](#%E7%AC%AC%E4%B8%89%E5%8D%81%E4%B8%89%E7%AB%A0-%E5%8F%82%E4%B8%8E%E8%80%85%E6%A8%A1%E5%BC%8F)
  * [描述](#%E6%8F%8F%E8%BF%B0-2)
  * [实际场景](#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-4)
- [第三十四章-等待着模式](#%E7%AC%AC%E4%B8%89%E5%8D%81%E5%9B%9B%E7%AB%A0-%E7%AD%89%E5%BE%85%E7%9D%80%E6%A8%A1%E5%BC%8F)
  * [描述](#%E6%8F%8F%E8%BF%B0-3)
  * [实际场景](#%E5%AE%9E%E9%99%85%E5%9C%BA%E6%99%AF-5)

<!-- tocstop -->

### 第二十七章-链式模式
描述：                     
通过在对象方法中将对象返回， 实现对同一个对象多个方法的链式调用。简化对该对象的多个方法的多次调用时，对该对象的多次引用。               
最典型的使用就是jQuery

简单的来说， 这种设计模式就是封装一个对象， 然后对象方法处理数据， 数据就放在对象的属性上面， 然后方法返回this指针， 就可以了。

来看一个实际使用的一个实例：               
```js
/*
* sum(1).sum(1,2).sum(3,4).sum(2).sum(2,3,4,5,6,7,8).result()  // 48
* */
class Test {
    constructor() {
        this.resultNumber = 0;
    }
    sum() {
        let args = arguments,
            len = args.length;
        if (len > 0) {
            for (let num of args) {
                this.resultNumber += num;
            }
        }
        return this;
    }
    result() {
        return this.resultNumber;
    }
}
let test = new Test();

let resultNumber = test.sum(1).sum(1, 2).sum(3, 4).sum(2).sum(2, 3, 4, 5, 6, 7, 8).result();
console.log(resultNumber);     // 48
```

其他的示例：                                          
[01、原型式继承存在的问题](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27章、链式模式/01、原型式继承存在的问题.js)                                                    
[02、对于类jQuery链式调用模式的研究](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27章、链式模式/02、对于类jQuery链式调用模式的研究.js)                                                
[03、链式模式的一个实际使用实例](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/27章、链式模式/03、链式模式的一个实际使用实例.js)                                                      


### 第二十八章-委托模式
#### 描述:                                     
多个对象接受并处理同一个请求， 他们请求委托给另一个对象统一处理请求。                                         
这种设计模式是只针对于浏览器端的来使用的， 至于node没有dom, 所以没有这个特性。                                                                  

#### 实际场景
第一个场景                                                                       
日历模块， 用户点击每个日期格子的时候将格子的背景色变为灰色， 大多数的做法就是把每个日期格子都绑定一个事件， 做法如下：
```js
let ul = document.getElementById('container');
let li = ul.getElementById('li'),
    len = li.length - 1;
for (; len >= 0; len--) {
    li[i].onclick = function () {
        this.style.backgroundColor = 'gery';
    }
}
```

委托模式实际上就是讲事件委托给更高层面上的肤元素去绑定执行。
```js

let ul = document.getElementById('container');
ul.onclick = function (e = window.event) {
    let tar = e.target || e.srcElement;
    if (tar.nodeName.toLowerCase() === 'li') {
        tar.style.color = 'blue';
    }
}
```

第二个场景                                                       
还有一种使用场景： 就是比如我们的dom 是动态添加的， 我们可以把它触发的时间， 暂时委托给父级。 这样的jquery中非常的常见。
```js
$(document).on('click', '#target', function() {
    // 处理逻辑
})
```

第三个场景                                               
委托模式可以解决一些内存泄漏的问题。
```html
<div id="container">
    <button id="btn">dom</button>
</div>

<script>
/*
* 下面一段代码中， g变量中保存了元素绑定的click事件没有清楚， 这个时间就会泄露到内存中去
* 失去了对其的控制
* */
let g = function (id) {
    return document.getElementById(id);
};
g('btn').onclick = function () {
    g('container').innerHTML = '触发了事件'
};

/*
* 利用委托模式解决上面所面临的问题
* */
g('container').onclick = function (e = window.event.srcElement) {
    let target = e && e.target;
    if(target.id === 'btn') {
        g('container').innerHTML = '触发了事件'
    }
}
</script>
```

#### 代码示例
[01、实际场景-点击日期格子变色](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/28章、委托模式/01、实际场景-点击日期格子变色.html)                                                
[02、实际场景-处理内存泄漏问题](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/28章、委托模式/02、实际场景-处理内存泄漏问题.html)                                                                                    


### 第二十九章-数据访问对象模式
#### 描述： 
抽象和封装对数据源的访问与存储。                                                        


#### 实际场景

场景一： 本地存储 localStorage
```js
class BaseLocalStorage {
    constructor(preId, timeSign = '|-|') {
        this.preId = preId;
        this.timeSing = timeSign;
        this.status = {
            SUCCESS: 0,         // 成功
            FAILURE: 1,         // 失败
            OVERFLOW: 2,        // 溢出
            TIMEOUT: 3,         // 过期
        };
        this.storage = localStorage || window.localStorage;
    }

    // 获取本地存储数据库数据真实字段
    getKey(key) {
        return this.preId + key;
    }

    /**
     * 添加或者修改数据
     * @param key           数据字段标识
     * @param value         数据值
     * @param callback      回到函数
     * @param time          添加时间
     */
    set(key, value, callback, time) {
        // 默认操作状态是成功的
        let status = this.status.SUCCESS,
            getKey = this.getKey(key);
        try {
            time = +new Date(time) || time.getTime();
        } catch (e) {
            // 传入的时间参数或者时间参数有无获取默认时间， 一个月
            time = +new Date() + 1000 * 60 * 60 * 24 * 31;
        }

        try {
            this.storage.setItem(getKey, time + this.timeSing + value);
        } catch (e) {
            // 溢出失败， 返回溢出状态
            status = this.status.OVERFLOW;
        }
        callback && callback.call(this, status, getKey, value);
    }

    /**
     * 获取数据
     * @param key           数据字段标识
     * @param callback      回调函数
     * @returns {*}
     */
    get(key, callback) {
        let status = this.status.SUCCESS,
            getKey = this.getKey(key),
            value = null,                   // 默认值为空
            timeSignLen = this.timeSing.length,         // 时间戳与存储数据之间的拼接长度
            index,                  // 时间戳与春出数据之间的拼接符其实位置
            time,                   // 时间戳
            result;                 // 最终获取到的数据
        try {
            value = this.storage.getItem(getKey);
        } catch (e) {
            result = {
                status: this.status.FAILURE,
                value: null
            };
            callback && callback.call(this, result.status, result, value);
            return result;
        }

        // 获取成功
        if (value) {
            index = value.indexOf(this.timeSing);
            time = +value.slice(0, index);          // 获取时间戳
            if (+new Date(time) > +new Date() || time === 0) {
                // 获取数据结果（拼接后面的字符串）
                value = value.slice(index + timeSignLen);
            } else {
                // 获取则结果为null
                value = null;
                status = this.status.TIMEOUT;
                time.remove(key);
            }
        } else {
            status = this.status.FAILURE;
        }

        // 设置结果
        result = {
            status: status,
            value: value
        };
        callback && callback.call(this, result.status, result.value);
        return result;
    }

    /**
     * 删除数据
     * @param key           数据字段标识
     * @param callback      回调函数
     */
    remove(key, callback) {
        let status = this.status.FAILURE,
            getKey = this.getKey(key),
            value = null;
        value = this.storage.getItem(getKey);
        if (value) {
            // 删除数据
            this.storage.removeItem(getKey);
            status = this.status.SUCCESS;
        }
        callback && callback.call(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSing) + this.timeSing.length))
    }
}


/*使用实例*/
let LS = new BaseLocalStorage('LS__');
LS.set('a', 'xiao ming', function () {
    console.log(arguments)
});
LS.get('a', function () {
    console.log(arguments)
});
LS.remove('a', function () {
    console.log(arguments)
});
LS.remove('a', function () {
    console.log(arguments)
});
LS.get('a', function () {
    console.log(arguments)
});
```

场景二： 对于mongodb 的使用情况


### 第三十章-节流模式
#### 描述
对于复杂的业务逻辑进行节流控制， 执行最后一次操作并取消其他操作， 提高性能。


#### 实际场景
场景一： 返回顶部                                   
返回顶部按钮添加动画， 每次拖动页面滚动时， 他都要不停的抖动。 原因是拖动页面滚动条件是， 不停的出发了scroll 时间， 所以返回东部按钮不听的执行动画。                                    
```js
let throttle = function () {
    let isClear = arguments[0], fn;
    // 第一个参数表示是否清楚计时器
    if (typeof isClear === 'boolean') {
        // 第二个参数则为函数
        fn = arguments[1];
        fn.__trottleID && clearTimeout(fn.__trottleID);
    } else {
        // 第一个参数为函数
        fn = isClear;
        // 第二个参数为函数执行时候的参数
        let param = arguments[1];
        let p = Object.assign({
            context: null,
            args: [],
            time: 300
        }, param);
        arguments.callee(true, fn);
        fn.__trottleID = setTimeout(function () {
            fn.apply(p.context, p.args)
        }, p.time)
    }
};

// 实际使用
function moveScroll() {
    let top = $(document).scrollTo();
    $('#back').animate({top: top + 30}, 400, 'easeOutCubic')
}
// 监听页面滚动事件
$(window).on('scroll', function () {
    throttle(moveScroll);
})
```

场景二： [优化浮层](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/30章、节流模式/02、场景2-优化浮层.html)

场景三： [图片的延迟加载](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/30章、节流模式/03、场景3-图片的延迟加载.html)

场景四： [统计打包](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/30章、节流模式/04、场景4-统计打包.html)


### 第三十一章-简单模板模式
#### 描述：
很简单， 就是类似于一个模板引擎而已， 更多的时候， 可以多考虑一下， 一个模板引擎的设计模式；

略。。。。。。。


### 第三十二章-惰性模式
#### 描述
减少每次代码执行的重复性的分支判断， 通过对对象重定义来拼比原对象中的分支判断。

#### 实际场景
**场景一：**                            
解决函数执行时候的重复性的分支判断。
```js
A.on3 = function (dom, type, fn) {
    if (document.addEventListener) {
        A.on3 = function (dom, type, fn) {
            dom.addEventListener(type, fn, false);
        }
    } else if (document.attachEvent) {
        A.on3 = function (dom, type, fn) {
            dom.attachEvent('on' + type, fn);
        }
    } else {
        A.on3 = function (dom, type, fn) {
            dom['on' + type] = fn;
        }
    }
    A.on3(dom, type, fn);
};
```
代码示例： [场景1-解决重复性的分支判断](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/32章、惰性模式/01、场景1-解决重复性的分支判断.html)

**场景二：**                        
创建XHR场景
```js
let createXHR2 = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        createXHR2 = function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject !== 'undefined') {
        createXHR2 =  function () {
            if (typeof arguments.callee.activeXString !== 'string') {
                let versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                    i = 0,
                    len = versions.length;
                for (; i < len; i++) {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                }
            }
        }
    } else {
        createXHR2 = function () {
            throw new Error('您的浏览器不支持Ajax.');
        }
    }
    return createXHR2;
}
```

### 第三十三章-参与者模式
#### 描述
在特定的作用于中执行给定的函数， 并将参数原封不动的传递。

#### 实际场景
**场景一：**                            
天气模块， 打开页面后定时从后端拉去数据， 缓存下来， 一旦用户点击查看天气按钮， 就展开天气模块， 并现实天气信息。                     
这个场景比价复杂， 可以一步一步看示例代码： [场景1](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/33章、参与者模式/01、场景1.html)


### 第三十四章-等待着模式
#### 描述
通过对多个异步进程的监听， 来触发未来发生的动作。

#### 实际场景
**场景1：**                                                
接口拆分， 以前的新闻搜索接口拆分为新闻搜索接口和新闻推荐结果接口。                              
解决这个情况的急要用到等待这模式， 监听两个异步请求的结果， 然后根据之前的分发逻辑执行就可以了。                   
等待着模式就是解决那些不确定先后完成的异步逻辑。                        
监听的是所有的异步逻辑完成， 这样才会自动执行成功回调函数， 如果有一个异步函数执行失败了，那么就执行失败回调函数。
这点儿很类似于promise.all方法                                
[场景1-等待对象](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/34章、等待着模式/01、场景1-等待对象.html)                                                
[场景2-封装一个异步请求](/books/专题知识库/04、js设计模式/05篇、技巧型设计模式/34章、等待着模式/02、封装异步请求.html)
