# rxjs整理学习


目录
- [Rxjs使用入门](#Rxjs使用入门)
    - [RxJS 的 import 路径有以下 5 种](#RxJS的import路径有以下5种)
    - [一个简单的例子](#一个简单的例子)
    - [创建一个简单的Observable例子](#创建一个简单的Observable例子)
    - [观察者 Observer](#观察者-Observer)
    - [退订（unsubscribe）](#退订（unsubscribe）)
    - [操作符](#操作符)
    - [弹珠图](#弹珠图)
    
    
    
    

主要整理rxjs 6版本

## Rxjs使用入门
### RxJS的import路径有以下5种
创建 Observable 的方法、types、schedulers 和一些工具方法                      
```js
import { 
    Observable, 
    Subject, 
    asapScheduler, 
    pipe, 
    of, 
    from, 
    interval, 
    merge, 
    fromEvent, 
    SubscriptionLike, 
    PartialObserver 
} from 'rxjs';
```

操作符 operators
```js
import { map, filter, scan } from 'rxjs/operators';
```

webSocket
```js
import { webSocket } from 'rxjs/webSocket';
```

ajax
```js
import { ajax } from 'rxjs/ajax';
```

测试
```js
import { TestScheduler } from 'rxjs/testing';
```


### 一个简单的例子
```js
import {fromEvent} from 'rxjs';
import {take} from 'rxjs/operators';

const eleBtn = document.querySelector('#btn');
const click$ = fromEvent(eleBtn, 'click');

click$.pipe(take(1))
    .subscribe(e => {
        console.log('只可点击一次');
        eleBtn.setAttribute('disabled', '')
    });
```

### 创建一个简单的Observable例子
要创建一个 Observable，只要给 new Observable 传递一个接收 observer 参数的回调函数，在这个函数中去定义如何发送数据。
```js
import {Observable} from 'rxjs';

const source$ = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
});
const observer = {
    next: item => console.log(item)
};
console.log('start');
source$.subscribe(observer);
console.log('end');
```
上面的代码通过 new Observable 创建了一个 Observable，调用它的 subscribe 方法进行订阅，执行结果为依次输出 'start'，1，2，3，'end'。

下面我们再看一个异步的例子：
```js
import {Observable} from 'rxjs';
   
const source$ = new Observable(observer => {
   let number = 1;
   setInterval(() => {
       observer.next(number++)
   }, 1000)
});
const observer = {
   next: item => console.log(item)
};
console.log('start');
source$.subscribe(observer);
console.log('end');
```


### 观察者 Observer
观察者 Observer 是一个有三个方法的对象：                               
next: 当 Observable 发出新的值时被调用，接收这个值作为参数                          
complete：当 Observable 完结，没有更多数据时被调用。complete 之后，next 方法无效                                                       
error：当 Observable 内部发生错误时被调用，之后不会调用 complete，next 方法无效                                                 
```js
import {Observable} from 'rxjs';

const source$ = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
    observer.next(3);
});
const observer = {
    next: item => console.log(item),
    complete: () => console.log('complete')
};

source$.subscribe(observer);
```
上面的代码会输出 1，2，'complete'，而不会输出 3。

```js
import {Observable} from 'rxjs';

const source$ = new Observable(observer => {
    try {
        observer.next(1);
        observer.next(2);
        throw new Error('there is an exception');
        observer.complete();
    } catch (e) {
        observer.error(e)
    }
});
const observer = {
    next: item => console.log(item),
    error: e => console.log(e),
    complete: () => console.log('complete')
};
source$.subscribe(observer);
```
注意 error 之后不会再调用 complete。


Observer 还有简单形式，即不用构建一个对象，而是直接把函数作为 subscribe 方法的参数。
```js
import {Observable} from 'rxjs';

const source$ = new Observable(observer => {
    try {
        observer.next(1);
        observer.next(2);
        throw new Error('there is an exception');
        observer.complete();
    } catch (e) {
        observer.error(e)
    }
});
source$.subscribe(
    item => console.log(item),
    e => console.log(e),
    () => console.log('complete')
);
```

### 退订（unsubscribe）
```js
import {Observable} from 'rxjs';

const source$ = new Observable(observer => {
    let number = 1;
    setInterval(() => {
        observer.next(number++)
    }, 1000)
});
const observer = {
    next: item => console.log(item)
};
const subscription = source$.subscribe(observer);

setTimeout(() => {
    subscription.unsubscribe()
}, 5000);
```

### 操作符
在 RxJS 中，操作符是用来处理数据流的。
我们往往需要对数据流做一系列处理，才交给 Observer，这时一个操作符就像一个管道一样，数据进入管道，完成处理，流出管道。
```js
import {interval, Observable} from 'rxjs';
import {map} from "rxjs/operators";

const source$ = interval(1000).pipe(
    map(x => x * x)
);
source$.subscribe(x => console.log(x));
```
interval 操作符创造了一个数据流，interval(1000) 会产生一个每隔 1000 ms 就发出一个从 0 开始递增的数据。
map 操作符和数组的 map 方法类似，可以对数据流进行处理。                                
这个 map 和数组的 map 方法会产生新的数组类似，它会产生新的 Observable。
每一个操作符都会产生一个新的 Observable，不会对上游的 Observable 做任何修改，这完全符合函数式编程“数据不可变”的要求。

### 弹珠图
弹珠图（Marble diagrams）就是用图例形象地表示 Observable 和各种操作符的一种方法。                      
用 - 表示一小段时间，X 代表有错误发生， | 表示结束，() 表示同步发生。                        
上面的例子可以如下表示：                        
```
source: -----0-----1-----2-----3--...
        map(x => x * x)
newest: -----0-----1-----4-----9--...
```

具体关于弹珠图的使用可以查看这个网站 [http://rxmarbles.com/](http://rxmarbles.com/)。

## 创建 Observable












## 参考文章
- [RxJS v6 学习指南](https://www.imooc.com/article/70323)
- [rxjs6学习笔记----结合react，redux使用](https://blog.csdn.net/github_36487770/article/details/81168346)















