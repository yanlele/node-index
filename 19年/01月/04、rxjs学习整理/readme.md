# rxjs整理学习


主要整理rxjs 6版本


## RxJS 的 import 路径有以下 5 种：
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
