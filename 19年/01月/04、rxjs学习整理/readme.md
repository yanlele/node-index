# rxjs整理学习


目录
- [Rxjs使用入门](#Rxjs使用入门)
    - [RxJS 的 import 路径有以下 5 种](#RxJS的import路径有以下5种)
    - [一个简单的例子](#一个简单的例子)
    - [创建一个简单的Observable例子](#创建一个简单的Observable例子)
    - [观察者 Observer](#观察者-Observer)
    - [退订（unsubscribe）](#退订（unsubscribe）)
    - [简单操作符示例](#简单操作符示例)
    - [弹珠图](#弹珠图)
    
- [创建 Observable](#创建-Observable)
    - [of方法](#of方法)
    - [form方法](#form方法)
    - [fromEvent方法](#fromEvent方法)
    - [formEventPattern方法](#formEventPattern方法)
    - [interval和timer](#interval和timer)
    - [range](#range)
    - [empty、throwError、never](#empty、throwError、never)
    - [defer](#defer)
    
- [操作符](#操作符)
    - [pipeable操作符](#pipeable操作符)
    - [几个类似数组方法的基础操作符](#几个类似数组方法的基础操作符)
    - [一些过滤的操作符](#一些过滤的操作符)
    - [合并类操作符](#合并类操作符)
    
- [场景使用]()
    
- [一个小的练习](#一个小的练习)
    


    
    
    
    

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

### 简单操作符示例
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
创建 Observable 的这些方法就是用来创建 Observable 数据流的，**注意和操作符不同，它们是从 rxjs 中导入的，而不是 rxjs/operators 。**

### of方法
之前我们写的这种形式：
```js
import {Observable, of} from 'rxjs';
const source$ = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
});
const observer = {
    next: item => console.log(item)
};
const subscription = source$.subscribe(observer);
```

使用 of 方法将会非常简洁：
```js
import {Observable, of} from 'rxjs';

const source$ = of(1, 2, 3);
const observer = {
    next: item => console.log(item)
};
const subscription = source$.subscribe(observer);
```

### form方法
如果上面的代码用from则是这样的写法， 实现的功能是一样的
```js
import {from, Observable, of} from 'rxjs';

const source$ = from([1, 2, 3]);
const observer = {
    next: item => console.log(item)
};
const subscription = source$.subscribe(observer);
```
from 可以将可遍历的对象（iterable）转化为一个 Observable，字符串也部署有 iterator 接口，所以也支持。                             
from 还可以根据 promise 创建一个 Observable。
我们用 fetch 或者 axios 等类库发送的请求都是一个 promise 对象，我们可以使用 from 将其处理为一个 Observable 对象。

### fromEvent方法
用 DOM 事件创建 Observable，第一个参数为 DOM 对象，第二个参数为事件名称。具体示例见前面 RxJS 入门章节的一个简单例子。


### formEventPattern方法
将添加事件处理器、删除事件处理器的 API 转化为 Observable。
```js
import {fromEventPattern} from 'rxjs';

function addClickHandler(handler) {
    document.addEventListener('click', handler);
}

function removeClickHandler(handler) {
    document.removeEventListener('click', handler);
}

fromEventPattern(
    addClickHandler,
    removeClickHandler
).subscribe(x => console.log(x));
```

也可以是我们自己实现的和事件类似，拥有注册监听和移除监听的 API。
```js
import {fromEventPattern} from 'rxjs'

class EventEmitter {
    private readonly handlers: {};

    constructor() {
        this.handlers = {}
    }

    on(eventName, name = null, handler) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        if (name) {
            console.log(`订阅人: ${name}`);
        }
        if (typeof handler === 'function') {
            this.handlers[eventName].push(handler)
        } else {
            throw new Error('handler 不是函数！！！')
        }
    }

    off(eventName, handler) {
        this.handlers[eventName].splice(this.handlers[eventName].indexOf(handler), 1)
    }

    emit(eventName, ...args) {
        this.handlers[eventName].forEach(handler => {
            handler(...args)
        })
    }
}

const event = new EventEmitter();

const subscription = fromEventPattern(
    event.on.bind(event, 'say', 'yanle'),
    event.off.bind(event, 'say')
).subscribe(x => console.log(x));

let timer = (() => {
    let number = 1;
    return setInterval(() => {
        if (number === 5) {
            clearInterval(timer);
            timer = null
        }
        event.emit('say', number++)
    }, 1000)
})();

setTimeout(() => {
    subscription.unsubscribe()
}, 3000);
```
这里有一个值得注意的地方， subscribe 订阅方法的时候， 给的方法入参， 是订阅对象的最后一个参数。

### interval和timer
interval 和 JS 中的 setInterval 类似，参数为间隔时间，下面的代码每隔 1000 ms 会发出一个递增的整数。                         
```js
interval(1000).subscribe(console.log)
// 0// 1// 2// ...
```
timer 则可以接收两个参数，第一个参数为发出第一个值需要等待的时间，第二个参数为之后的间隔时间。
第一个参数可以是数字，也可以是一个 Date 对象，第二个参数可省。


### range
操作符 of 产生较少的数据时可以直接写如 of(1, 2, 3)，但是如果是 100 个呢？这时我们可以使用 range 操作符。


### empty、throwError、never
empty 是创建一个立即完结的 Observable，
throwError 是创建一个抛出错误的 Observable，
never 则是创建一个什么也不做的 Observable（不完结、不吐出数据、不抛出错误）。                             
这三个操作符单独用时没有什么意义，主要用来与其他操作符进行组合。                                
目前官方不推荐使用 empty 和 never 方法，而是推荐使用常量 EMPTY 和 NEVER（注意不是方法，已经是一个 Observable 对象了）。


### defer
defer 创建的 Observable 只有在订阅时才会去创建我们真正想要操作的 Observable。
defer 延迟了创建 Observable，而又有一个 Observable 方便我们去订阅，这样也就推迟了占用资源。
```js
defer(() => ajax(ajaxUrl))
```
只有订阅了才会去发送 ajax 请求。                             


## 操作符
操作符其实看作是处理数据流的管道，每个操作符实现了针对某个小的具体应用问题的功能，
RxJS 编程最大的难点其实就是如何去组合这些操作符从而解决我们的问题。                                
在 RxJS 中，有各种各样的操作符，有转化类、过滤类、合并类、多播类、错误处理类、辅助工具类等等。
一般不需要自己去实现操作符，但是我们需要知道操作符是一个函数，实现的时候必须考虑以下功能：                                   
- 返回一个全新的 Observable 对象
- 对上游和下游的订阅和退订处理
- 处理异常情况
- 及时释放资源

### pipeable操作符
现在需要这样使用：
```typescript
import {Observable} from 'rxjs';
import {filter, map} from "rxjs/operators";

const source$ = new Observable(observer => {
    observer.next(2);
    observer.next(4);
    observer.next(8);
});

const observer = {
    next: item => console.log(item)
};

const subscription = source$
    .pipe(
        filter((x: number) => {
            return x === 2;
        }),
        map((x: number) => {
            return  x * 2
        }),
    )
    .subscribe(observer);
```
其实也很好理解，pipe 就是管道的意思，数据流通过操作符处理，流出然后交给下一个操作符。


### 几个类似数组方法的基础操作符

map、filter 和数组的 map、filter 方法类似，                        
scan 则是和 reduce 方法类似，                               
mapTo 是将所有发出的数据映射到一个给定的值。
```js
import {mapTo} from 'rxjs/operators'
fromEvent(document, 'click').pipe(
  mapTo('Hi')
).subscribe(x => console.log(x))
```
每次点击页面时都会输出 Hi。


### 一些过滤的操作符
- take 是从数据流中选取最先发出的若干数据
- takeLast 是从数据流中选取最后发出的若干数据
- takeUntil 是从数据流中选取直到发生某种情况前发出的若干数据
- first 是获得满足判断条件的第一个数据
- last 是获得满足判断条件的最后一个数据
- skip 是从数据流中忽略最先发出的若干数据
- skipLast 是从数据流中忽略最后发出的若干数据
```js
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

interval(1000).pipe(
    take(3)
).subscribe(
    x => console.log(x),
    null,
    () => console.log('complete')
);
```


### 合并类操作符
合并类操作符用来将多个数据流合并。

**1）concat、merge**                                  
concat、merge 都是用来把多个 Observable 合并成一个，
但是 concat 要等上一个 Observable 对象 complete 之后才会去订阅第二个 Observable 对象获取数据并把数据传给下游，
而 merge 时同时处理多个 Observable。
```js
import {interval} from 'rxjs'
import {merge, take} from 'rxjs/operators'

interval(500).pipe(
    take(3),
    merge(interval(300).pipe(take(6)))
).subscribe(x => console.log(x));
```
concat 的结果应该比较好理解，merge 借助弹珠图也比较好理解，它是在时间上对数据进行了合并。
```
source : ----0----1----2|source2: --0--1--2--3--4--5|
            merge()example:       --0-01--21-3--(24)--5|
```
merge 的逻辑类似 OR，经常用来多个按钮有部分相同行为时的处理。

**注意最新的官方文档和RxJS v5.x 到 6 的更新指南中指出不推荐使用 merge、concat、combineLatest、race、zip 这些操作符方法，而是推荐使用对应的静态方法。**

将上面的 merge 改成从 rxjs 中导入，使用方式变成了合并多个 Observable，而不是一个 Observable 与其他 Observable 合并。
```js
import {interval, merge} from 'rxjs'
import {take} from 'rxjs/operators'

merge(
    interval(500).pipe(take(3)),
    interval(300).pipe(take(6))
).subscribe(x => console.log(x));
```

**2）concatAll、mergeAll、switchAll**                                    
用来将高阶的 Observable 对象压平成一阶的 Observable，和 loadash 中压平数组的 flatten 方法类似。
concatAll 会对内部的 Observable 对象做 concat 操作，和 concat 操作符类似，如果前一个内部 Observable 没有完结，
那么 concatAll 不会订阅下一个内部 Observable，mergeAll 则是同时处理。
switchAll 比较特殊一些，它总是切换到最新的内部 Observable 对象获取数据。
上游高阶 Observable 产生一个新的内部 Observable 时，switchAll 就会立即订阅最新的内部 Observable，
退订之前的，这也就是 ‘switch’ 的含义。
```js
import {interval} from 'rxjs';
import {map, switchAll, take} from 'rxjs/operators';

interval(1500).pipe(
    take(2),
    map(x => interval(1000).pipe(
        map(y => x + ':' + y),
        take(2))
    ),
    switchAll()
).subscribe(console.log);  // 0:0// 1:0// 1:1
```
内部第一个 Observable 对象的第二个数据还没来得及发出，第二个 Observable 对象就产生了。

**3）concatMap、mergeMap、switchMap**                      
从上面的例子我们也可以看到高阶 Observable 常常是由 map 操作符将每个数据映射为 Observable 产生的，
而我们订阅的时候需要将其压平为一阶 Observable，而就是要先使用 map 操作符再使用 concatAll 或 mergeAll 或 switchAll 这些操作符中的一个。
RxJS 中提供了对应的更简洁的 API。使用的效果可以用下面的公式表示：                               
`concatMap = map + concatAll  mergeMap = map + mergeAll  switchMap = map + switchAll`

**4）zip、combineLatest、withLatestFrom**                              
**zip** 有拉链的意思，这个操作符和拉链的相似之处在于数据一定是一一对应的。                               
```js
import {interval} from 'rxjs';
import {zip, take} from 'rxjs/operators';

const source$ = interval(500).pipe(take(3));
const newest$ = interval(300).pipe(take(6));

source$.pipe(
    zip(newest$, (x, y) => x + y)
).subscribe(x => console.log(x));// 0// 2// 4
```
zip 是内部的 Observable 都发出相同顺序的数据后才交给下游处理，最后一个参数是可选的 resultSelector 参数，这个函数用来处理操作符的结果。
上面的示例运行过程如下：                                            
newest 发出第一个值 0，但这时 source 还没有发出第一个值，所以不执行 resultSelector 函数也不会像下游发出数据                                          
source 发出第一个值 0，此时 newest 之前已发出了第一个值 0，执行 resultSelector 函数得到结果 0，发出这个结果                                            
newest 发出第二个值 1，但这时 source 还没有发出第二个值，所以不执行 resultSelector 函数也不会像下游发出数据                                          
newest 发出第三个值 2，但这时 source 还没有发出第三个值，所以不执行 resultSelector 函数也不会像下游发出数据                                          
source 发出第二个值 1，此时 newest 之前已发出了第一个值 1，执行 resultSelector 函数得到结果 2，发出这个结果                                            
newest 发出第四个值 3，但这时 source 还没有发出第四个值，所以不执行 resultSelector 函数也不会像下游发出数据                                          
source 发出第三个值 2，此时 newest 之前已发出了第一个值 2，执行 resultSelector 函数得到结果 4，发出这个结果                                            
source 完结，不可能再有对应的数据了，整个 Observable 完结                                          

上面如果没有传递最后一个参数 resultSelector 函数，
将会依次输出数组 [0, 0]、[1, 1]、[2, 2]。在更新指南中，
官方指出不推荐使用 resultSelector 参数，将会在 v7 中移除。
加上之前提到的推荐使用静态方法，这个示例应该改成这样：
```js
import {interval, zip} from 'rxjs';
import {take, map} from 'rxjs/operators';

const source$ = interval(500).pipe(take(3));
const newest$ = interval(300).pipe(take(6));
const add = (x, y) => x + y;

zip(source$, newest$).pipe(
    map(x => add(...x))
).subscribe(x => console.log(x));
```


使用 zip 当有数据流吐出数据很快，而有数据流发出值很慢时，要小心数据积压的问题。
这时快的数据流已经发出了很多数据，由于对应的数据还没发出，RxJS 只能保存数据，
快的数据流不断地发出数据，积压的数据越来越多，消耗的内存也会越来越大。                             

**combineLatest** 与 zip 不同，只要其他的 Observable 已经发出过值就行，顾名思义，就是与其他 Observable 最近发出的值结合。                    
```js
import {interval, combineLatest} from 'rxjs';
import {take} from 'rxjs/operators';

const source$ = interval(500).pipe(take(3));
const newest$ = interval(300).pipe(take(6));

combineLatest(source$, newest$).subscribe(x => console.log(x));
// [0, 0]// [0, 1]// [0, 2]// [1, 2]// [1, 3]// [2, 3]// [2, 4]// [2, 5]
```


**withLatestFrom** 没有静态方法，只有操作符方法，前面的方法所有 Observable 地位是平等的，而这个方法是使用这个操作符的 Observable 起到了主导作用，即只有它发出值才会进行合并产生数据发出给下游。
```js
import {interval} from 'rxjs';
import {take, withLatestFrom} from 'rxjs/operators';

const source$ = interval(500).pipe(take(3));
const newest$ = interval(300).pipe(take(6));

source$.pipe(
    withLatestFrom(newest$)
).subscribe(x => console.log(x));// [0, 0]// [1, 2]// [2, 4]
```
source 发出 0 时，newest 最新发出的值为 0，结合为 [0, 0] 发出                                    
source 发出 1，此时 newest 最新发出的值为 2，结合为 [1, 2] 发出                                   
source 发出 2，此时 newest 最新发出的值为 4，结合为 [2, 4] 发出                                   
source 完结，整个 Observable 完结                                  

**5）startWith、forkJoin、race**
**startWith** 是在 Observable 的一开始加入初始数据，同步立即发送，常用来提供初始状态。
```typescript
import {fromEvent, from} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

const source$ = fromEvent(document.querySelector('#btn'), 'click');
let number = 0;
const fakeRequest = x => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(number++)
        }, 1000)
    })
};

source$.pipe(
    startWith('initData'),
    switchMap(x => {
        console.log(x); // initData`
        return from(fakeRequest(x))
    })
).subscribe((x: string) => document.querySelector('#number').textContent = x);
```
这里通过 startWith 操作符获取了页面的初始数据，之后通过点击按钮获取更新数据。                            
forkJoin 只有静态方法形式，类似 Promise.all ，它会等内部所有 Observable 都完结之后，
将所有 Observable 对象最后发出来的最后一个数据合并成 Observable。                            

race 操作符产生的 Observable 会完全镜像最先吐出数据的 Observable。
```typescript
import {interval, race} from "rxjs";
import {mapTo} from "rxjs/operators";

const obs1 = interval(1000).pipe(mapTo('fast one'));
const obs2 = interval(3000).pipe(mapTo('medium one'));
const obs3 = interval(5000).pipe(mapTo('slow one'));

race(obs3, obs1, obs2)
    .subscribe(
        winner => console.log(winner)
    );// result:// a series of 'fast one'
```




## 场景使用
### 第一个场景使用： 链式调用api请求最简单的用法
```typescript jsx
import { Epic, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
const actionEpic: Epic = (action$, state$, dependencies) => 
    action$.pipe(
        ofType(SELECT_ACTION_TYPE),
        mergeMap((payload: {options}) => 
            rxjsApi(options).pipe(
                mergeMap(()=> rxjsApi2()),
                map(response => resoultAction(response))
            )
        ),
        catchError(err=>resolveErrorAction(err))
    );
```




## 一个小的练习

待补充


























## 参考文章
- [RxJS v6 学习指南](https://www.imooc.com/article/70323)
- [rxjs6学习笔记----结合react，redux使用](https://blog.csdn.net/github_36487770/article/details/81168346)
- [rxjs 常用的管道操作符](https://www.cnblogs.com/ajanuw/p/8986776.html)
- [使用 RxJS 处理多个 Http 请求: mergeMap](https://segmentfault.com/a/1190000010088631)
