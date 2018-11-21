# 深入Redux架构

[http://www.cnblogs.com/MuYunyun/p/6530715.html](http://www.cnblogs.com/MuYunyun/p/6530715.html)

## 1、关于redux

### 1.1、什么情况需要用redux？
- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据

简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。多交互、多数据源场景就比较适合使用Redux。

### 1.2、设计思想
- Web 应用是一个状态机，视图与状态是一一对应的。
- 所有的状态，保存在一个对象里面。

### 1.3、Redux工作流程

![04-01](./img/react04-01.png)                              

首先，用户发出 Action。                         
`store.dispatch(action);`                               

然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。                                                    
`let nextState = todoApp(previousState, action);`


State 一旦有变化，Store 就会调用监听函数。                                 
// 设置监听函数                       
`store.subscribe(listener);`

listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。                                
```javascript
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```

如果现在没理解以上流程，不要急，看完以下API就差不多能懂得Redux的核心机制了。

## 2、API                                

### Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供createStore这个函数，用来生成 Store。                     
下面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。                         
```javascript
import { createStore } from 'redux';
const store = createStore(fn);
```

### State
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。                          
当前时刻的 State，可以通过store.getState()拿到。
```javascript
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。


### Action
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。                          
Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。                                
```javascript
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。                        
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。


### Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。                    
```javascript
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux');
```

### store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。                     
```javascript
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```
上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。                          
结合 Action Creator，这段代码可以改写如下。
```javascript
store.dispatch(addTodo('Learn Redux'));
```

### Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。                             
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。下面是一个实际的例子
```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```
上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。
其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。                                        
实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。
为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。                           
```javascript
import { createStore } from 'redux';
const store = createStore(reducer);
```
上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。
以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。


### store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。                      
```javascript
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```
显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。                        
store.subscribe方法返回一个函数，调用这个函数就可以解除监听。                      
```javascript
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
unsubscribe();
```


## 3、中间件与异步操作
一个关键问题没有解决：异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。                             
怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。

为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？                         
（1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。                       
（2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。                        
（3）Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。                        
想来想去，只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能。                              

### 中间件的用法
本文不涉及如何编写中间件，因为常用的中间件都有现成的，只要引用别人写好的模块即可。                       
```javascript
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

上面代码中，redux-logger提供一个生成器createLogger，可以生成日志中间件logger。
然后，将它放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。

这里有两点需要注意：
（1）createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。
```javascript
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
);
```

（2）中间件的次序有讲究。
```javascript
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```
上面代码中，applyMiddleware方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如，logger就一定要放在最后，否则输出结果会不正确。


## 4、异步操作的基本思路

理解了中间件以后，就可以处理异步操作了。

同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。                                 
- 操作发起时的 Action
- 操作成功时的 Action
- 操作失败时的 Action

以向服务器取出数据为例，三种 Action 可以有两种不同的写法。
```
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

除了 Action 种类不同，异步操作的 State 也要进行改造，反映不同的操作状态。下面是 State 的一个例子。
```javascript
let state = {
  // ... 
  isFetching: true,
  didInvalidate: true,
  lastUpdated: 'xxxxxxx'
};
```
上面代码中，State 的属性isFetching表示是否在抓取数据。didInvalidate表示数据是否过时，lastUpdated表示上一次更新时间。

现在，整个异步操作的思路就很清楚了。                              
- 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
- 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

### 总结
在异步请求的时候，其实很多时候都是直接发出请求如果请求成功了之后，在存入reducers, 并不是不管成功与否，都存入reducers。                                        


### redux-thunk中间件
异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？
奥妙就在 Action Creator 之中。
```javascript
class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    dispatch(getApplyList(selectedPost))
  }
}
// ...
```
上面代码是一个异步组件的例子。加载成功后（componentDidMount方法），它送出了（dispatch方法）一个 Action，向服务器要求数据 fetchPosts(selectedSubreddit)。
这里的fetchPosts就是 Action Creator。                         
下面就是getApplyList的代码，关键之处就在里面， 这是我在公司的代码风格写法。
```javascript
export function getApplyList(query) {
    return function(dispatch) {
        dispatch(modalUpdate({
            loadingTable: true
        }));
        fetch('apply', query)
            .then(function(res) {
                dispatch(updateApply(res.data));                // 这个是调用的action Mppper
                dispatch(modalUpdate({
                    loadingTable: false
                }));
            }).catch(function(err) {
                dispatch(modalUpdate({
                    pageWarn: err.message,
                    loadingTable: false
                }));
            });
    };
}

// 对应的action Mapper
export function updateApply(data) {
    return {
        type: UPDATE_APPLY,
        data
    };
}
```

这里是博客文章的代码风格写法
```javascript
const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
};

// 使用方法一
store.dispatch(fetchPosts('reactjs'));
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
);
```
上面代码中，fetchPosts是一个Action Creator（动作生成器），返回一个函数。
这个函数执行后，先发出一个Action（requestPosts(postTitle)），然后进行异步操作。
拿到结果后，先将结果转成 JSON 格式，然后再发出一个 Action（ receivePosts(postTitle, json)）。                                    

上面代码中，有几个地方需要注意。
- （1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
- （2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
- （3）在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。
- （4）异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

这样的处理，就解决了自动发送第二个 Action 的问题。但是，又带来了一个新的问题，Action 是由store.dispatch方法发送的。
而store.dispatch方法正常情况下，参数只能是对象，不能是函数。                               
这时，就要使用中间件**redux-thunk**。
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
```
上面代码使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。                       
因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch。


## 5、React-Redux的用法
为了方便使用，Redux 的作者封装了一个 React 专用的库 React-Redux，本文主要介绍它。                       
这个库是可以选用的。实际项目中，你应该权衡一下，是直接使用 Redux，还是使用 React-Redux。后者虽然提供了便利，但是需要掌握额外的 API，并且要遵守它的组件拆分规范。

本人项目中使用的最多的就是 react-redux;                      

React-Redux 将所有组件分成两大类：**UI 组件（presentational component）和容器组件（container component）**。

### UI组件
UI 组件有以下几个特征。                           
- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API

下面就是一个 UI 组件的例子。
```javascript
const Title = value => <h1>{value}</h1>;
```
因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

### 容器组件
容器组件的特征恰恰相反。
- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

你可能会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。                         
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

### connect()

