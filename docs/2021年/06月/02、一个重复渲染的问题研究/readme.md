## 一个重复渲染的问题研究

问题：一个方法里面，使用多个setState, 是否会引起多次重复渲染?

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
