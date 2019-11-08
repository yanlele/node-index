## RXJS 入门

### 安装RXJS
直接 `yarn add rxjs --dev`                        
会自动安装TS定义， 所以TS项目不需要额外装包

### Observable 和 Observer 概念


#### 创建 Observable
Observable = Publisher + Iterator

```js
// RxJS v6+
import { Observable } from 'rxjs';

const { create } = Observable;

// 订阅事件
const onSubscribe = observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
};

// 数据流对象
const source$ = create(onSubscribe);

// 观察者
const theObserver = {
  next: item => console.log(item),
};

// 发布事件
source$.subscribe(theObserver);
```


#### 再复杂一点
上面的例子看不出来有何优点， 如果这样：
如果Observable 是不间断的推送出一串正整数

```js
// 如果Observable 是不间断的推送出一串正整数

// RxJS v6+
import { Observable } from 'rxjs';

const { create } = Observable;

const onSubscribe = observer => {
  let time = 0;
  const handleInterval = setInterval(()=> {
    time+=1;
    observer.next(time);
    if (time > 5) clearInterval(handleInterval)
  }, 500)
};

const source$ = create(onSubscribe);
const theObserver = {
  next: item => console.log(item),
};

source$.subscribe(theObserver);
```









