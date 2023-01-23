## useMemo、useCallback、useContext 你真的玩明白了吗

这两个 hook 在首次 render 时需要做一些额外工作来提供缓存， 同时既然要提供缓存那必然需要额外的内存来进行缓存。

### 正确使用场景

**使用场景：**                           
1. 缓存 useEffect 的引用类型依赖                             
2. 缓存子组件 props 中的引用类型


#### 缓存 useEffect 的引用类型依赖
```tsx
import { useEffect } from 'react'
export default () => {
  const msg = {
    info: 'hello world',
  }
  useEffect(() => {
    console.log('msg:', msg.info)
  }, [msg])
}
```
上面： 每次组件在render 的时候 msg 都会被重新创建，msg 的引用在每次 render 时都是不一样的。
所以这里 useEffect 在每次render 的时候都会重新执行。

改进 - 使用 useMemo：
```tsx
import { useEffect, useMemo } from "react";
const App = () => {
  const msg = useMemo(() => {
    return {
      info: "hello world",
    };
  }, []);
  useEffect(() => {
    console.log("msg:", msg.info);
  }, [msg]);
};
export default App;
```

改进 - 使用 userCallback:
```tsx
import { useEffect, useCallback } from "react";
const App = (props) => {
  const print = useCallback(() => {
    console.log("msg", props.msg);
  }, [props.msg]);
  useEffect(() => {
    print();
  }, [print]);
};

export default App;
```





### 参考文档
- [useMemo、useCallback、useContext 你真的玩明白了吗](https://juejin.cn/post/7146107198215553055)


