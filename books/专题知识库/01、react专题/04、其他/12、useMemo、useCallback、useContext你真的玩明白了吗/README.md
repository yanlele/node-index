## useMemo、useCallback、useContext 你真的玩明白了吗

<!-- toc -->

- [正确使用场景](#%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
  * [缓存 useEffect 的引用类型依赖](#%E7%BC%93%E5%AD%98-useeffect-%E7%9A%84%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B%E4%BE%9D%E8%B5%96)
  * [缓存子组件 props 中的引用类型](#%E7%BC%93%E5%AD%98%E5%AD%90%E7%BB%84%E4%BB%B6-props-%E4%B8%AD%E7%9A%84%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B)
- [useContext 使用](#usecontext-%E4%BD%BF%E7%94%A8)
  * [解决办法 - Provider 单独封装](#%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95---provider-%E5%8D%95%E7%8B%AC%E5%B0%81%E8%A3%85)
  * [memo 优化直接被穿透，不再起作用](#memo-%E4%BC%98%E5%8C%96%E7%9B%B4%E6%8E%A5%E8%A2%AB%E7%A9%BF%E9%80%8F%E4%B8%8D%E5%86%8D%E8%B5%B7%E4%BD%9C%E7%94%A8)
  * [对 context 进行原子化](#%E5%AF%B9-context-%E8%BF%9B%E8%A1%8C%E5%8E%9F%E5%AD%90%E5%8C%96)
- [参考文档](#%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3)

<!-- tocstop -->

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


### useContext 使用
useContext 这个 api，同时结合 useReducer 是可以代替 redux 来做状态管理的。                      
看一个例子：            
[https://codesandbox.io/s/laughing-cookies-s4qjco?file=/src/App.tsx](https://codesandbox.io/s/laughing-cookies-s4qjco?file=/src/App.tsx)          
```tsx
import React, { createContext, useContext, useReducer } from "react";

const ContainerContext = createContext({ count: 0 });
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const { state, dispatch } = useContext(ContainerContext);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

function Tip() {
  return <span>计数器</span>;
}

function Container() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContainerContext.Provider value={{ state, dispatch }}>
      <Counter />
      <Tip />
    </ContainerContext.Provider>
  );
}

export default Container;
```

**useContext 的机制是使用这个 hook 的组件在 context 发生变化时都会重新渲染。**
例如在 `ContainerContext.Provider` 组件下面的 Tip 组件， 会因为 context 发生变化而重新渲染；


#### 解决办法 - Provider 单独封装
我们把状态管理单独封装到一个 Provider 组件里面，然后把子组件通过 props.children 的方式传进去；
```tsx
// ...
function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContainerContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ContainerContext.Provider>
  );
}

const App = () => {
  return (
    <Provider>
      <Counter />
      <Tip />
    </Provider>
  );
};
// ...
```
这个时候 APP 组件就成为了无状态组件，state 变化的时候 props.children 不会改变，不会被重新渲染，这个时候再看 Tip 组件，状态更新的时候就不会跟着重新渲染了。


**但是这样依然会有别的问题：**
当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。 [官方文档](https://zh-hans.reactjs.org/docs/context.html#caveats) 对这部分内容也有说明。

最好的办法是对 value 进行缓存：
```tsx
// ...
function Provider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ContainerContext.Provider value={value}>
      {props.children}
    </ContainerContext.Provider>
  );
}
// ...
```

#### memo 优化直接被穿透，不再起作用
很多时候我们又会在使用 memo 的组件中使用 context，用 context 的地方在context发生变化的时候无论如何都会发生重新渲染，所以很多时候会导致 memo 优化失效。           
具体可以看这里的讨论，react 官方解释说设计如此；
项目中主要解决方案是把 context 往上提，然后通过属性传递：         

以前的写法：          
```tsx
React.memo(()=> {
 const {count} = useContext(ContainerContext);
 return <span>{count}</span>
})
```

现在的写法：
```tsx
const Child = memo((props)=>{
    // ...
})
function Parent() {
  const {count} = useContext(ContainerContext);
  return <Child count={count} />;
}
```

#### 对 context 进行原子化
随着业务代码越来越复杂，在不经意间我们就会把一些不相关的数据放在同一个context 里面。这样就导致了context 中任何数据的变化都会导致使用这个 context 的组件重新 render。
所以一般来说， 需要对 context 进行组合拆分， 原子化原则。






### 参考文档
- [useMemo、useCallback、useContext 你真的玩明白了吗](https://juejin.cn/post/7146107198215553055)


