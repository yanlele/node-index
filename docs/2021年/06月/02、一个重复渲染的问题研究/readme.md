## 一个react重复渲染的问题研究

### 问题1：一个方法里面，使用多个setState, 是否会引起多次重复渲染?

总所周知的事情， useState 设置值是异步的：
```typescript jsx
import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count);
    setCount(count => count + 1);
    console.log(count);
    setTime(+new Date());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <p>
          <button type="button" onClick={handleClick}>
            time is: {time}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
```

上面的两个 console 执行的结果都是设置之前的值。那么问题来了，为何我使用了两个 setState , 为何没有渲染两次。
这个问题是如何优化的？
具体原因要看看源码了， 源码里面有一个 memoizedState 的东西。

涉及到 state 的状态合并，react 认为当你在事件绑定中操作 state 是非常频繁的，
所以为了节约性能 react 会把多次 setState 进行合并为一次，最后在一次性的更新 state，
而定时器里面操作 state 是不会把多次合并为一次更新的。

具体可以参考这个：
[react 16 Hooks渲染流程](https://www.cnblogs.com/dh-dh/p/11278022.html)
[Modal.success 中 hook 无法实时更新问题](https://blog.csdn.net/qq_33988065/article/details/110493675)
[React(v16.8) Hooks 简析](https://www.cnblogs.com/vicky24k/p/11151862.html)



### 问题2
在看另外一个有趣的问题:
```typescript jsx
function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);

  // 这个的执行结果是每次都会加 6
  const handleClick = useCallback(() => {
    setCount(count => count + 1);
    setCount(count => count + 2);
    setCount(count => count + 3);
  }, []);

  // 这个的执行结果是每次只会加3
  const handleClick2 = useCallback(() => {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <p>
          <button type="button" onClick={handleClick2}>
            time is: {time}
          </button>
        </p>
      </header>
    </div>
  );
}
```


### 参考文档
- [说一下React Hooks在平时开发中需要注意的问题和原因？](https://github.com/lgwebdream/FE-Interview/issues/906)
- [memoizedState](https://react.iamkasong.com/hooks/structure.html#memoizedstate)
- [从源码剖析useState的执行过程](https://blog.csdn.net/weixin_33854644/article/details/91440230)
