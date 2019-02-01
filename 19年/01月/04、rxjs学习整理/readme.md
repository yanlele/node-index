# rxjs整理学习


主要整理rxjs 6版本

## Rxjs使用入门
### RxJS 的 import 路径有以下 5 种：
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

## 创建 Observable
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
```
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









## 参考文章
- [RxJS v6 学习指南](https://www.imooc.com/article/70323)















