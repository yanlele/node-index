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

上面： 每次组件在render 的时候 msg 都会被重新创建，msg 的引用在每次 render 时都是不一样的。 所以这里 useEffect 在每次render 的时候都会重新执行。

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

#### 缓存子组件 props 中的引用类型

这个为了解决子组件非必要渲染场景。                
引起子组件重新渲染的原因：

1. 组件的 props 或 state 变化会导致组件重新渲染
2. 父组件的重新渲染会导致其子组件的重新渲染

有几个误区：

1. 子组件没有使用 memo:

```tsx
import { useCallback, useState } from "react";

const Child = (props) => {
};
const App = () => {
  const handleChange = useCallback(() => {
  }, []);
  const [count, setCount] = useState(0);
  return (
    <>
      <div
        onPress={() => {
          setCount(count + 1)
        }}
      >
        increase
      </div>
      <Child handleChange={handleChange} />
    </>
  );
};
export default App;
```

2. 父组件没有保持对传递方法的引用：
```tsx
import { useCallback, useState, memo } from "react";

const Child = memo((props) => {});
const App = () => {
  const handleChange = () => {};
  const [count, setCount] = useState(0);
  return (
    <>
      <div
        onPress={() => {
          setCount(count + 1);
        }}
      >
        increase
      </div>
      <Child handleChange={handleChange} />
    </>
  );
};
export default App;
```
`handleChange` 在 `App` 组件每次重新渲染的时候都会重新创建生成，引用当然也是不一样，势必会造成 Child 组件重新渲染。


正确解锁姿势：
```tsx
import { useCallback, useState, memo, useMemo } from "react";

const Child = memo((props) => {});
const App = () => {
  const [count, setCount] = useState(0);
  const handleChange = useCallback(() => {}, []);
  const list = useMemo(() => {
    return [];
  }, []);
  return (
    <>
      <div
        onPress={() => {
          setCount(count + 1);
        }}
      >
        increase
      </div>
      <Child handleChange={handleChange} list={list} />
    </>
  );
};

export default App;
```
对子应用添加 `memo`， 父组件在传递方法的时候， 用 `useCallback`, 传递值的时候使用 `useMemo`；
仅仅在需要发生变更的场景下， 对其传递的值或者应用进行变更。





### 参考文档

- [useMemo、useCallback、useContext 你真的玩明白了吗](https://juejin.cn/post/7146107198215553055)


