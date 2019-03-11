# react16 hooks

## React 内置的 Hook 如下：

- 基础 Hook：
    - [useState](#useState)
    - [useEffect](#useEffect)
    - [useContext](#useContext)
    
- 其他 Hook：
    - useReducer
    - useCallback
    - useMemo
    - useRef
    - useImperativeMehtods
    - useLayoutEffect
    

## useState
### 通过 function 更新 state
```jsx harmony
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}
```

### 延迟初始化
```jsx harmony
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```


## useEffect
### 清理 effect
通常，effect 会创建在组件离开屏幕之前需要清理的资源，比如订阅或者计时器ID。为此，传递给 useEffect 可能会返回一个清理函数：
```jsx harmony
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清理订阅
    subscription.unsubscribe();
  };
});
```
clear function 在从 UI 中删除组件之后就执行，以防止内存泄露。
此外，如果组件多次 rende（通常都会多次 render），则在执行下一个 effect 之前会清楚之前的 effect。
在上面的示例中，每次 render 都会创建一个新的订阅。

### 有条件的触发 effect
effect 的默认行为是在每次完成 render 后触发 effect。这样如果其中一个 输入发生变化，会始终创建 effect。                          
但是，在某些情况下，这可能是过度的，比如上面的订阅示例，应该仅在 prop 发生更改的时候，我们才会进行创建新的订阅。                         
要实现此功能，需要将第二个参数传递给 useEffect，它是 effect 所依赖的值数组：
```jsx harmony
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```
上面代码中，只有在 props.source 更改的时候才会重新创建订阅。

传入一个空数组 [] 告诉 React 你的 effect 不依赖组件中的任何值，因此这个 effect 只能在 mount 的时候执行，
而在 unmount 的时候清理，不会再更新的时候执行。

## useContext
```jsx harmony
const context = useContext(Context);
```
接受上下文对象（从 React.createContext 返回的值）并且返回当前的上下文值，由给定上下文的最近上下文提供程序给出。                      
当提供程序更新时，这个 Hook 将使用最新的上下文值触发 re-render。
```jsx harmony
const Context = React.createContext('light');

// Provider
class Provider extends Component {
  render() {
    return (
      <Context.Provider value={'dark'}>
        <DeepTree />
      </Context.Provider>
    )
  }
}

// Consumer
function Consumer(props) {
  const context = useContext(Context);
  return (
    <div>
      {context} // dark
    </div>
  );
}
```


-----------------------
# 附加 Hook
附件 Hook 实际上是上面的基础 Hook 的一种变体，也可以用于特定的边缘情况。（React 建议不作为先学习的内容）

## useReducer
```jsx harmony
const [state, dispatch] = useReducer(reducer, initialState);
```
这是 useState 的替代方案，接收类型为 (state, action) => newState 的 reducer，并返回与 dispatch 方法配对的当前 state。
（如果熟悉 Redux，你已经知道这是如果工作的）                   
下面是之前的计数器示例使用 reducer 重写的：                      
```jsx harmony
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, {count: initialCount});
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
### 延迟初始化
useReducer 接收可选的第三个参数是 initialAction。
如果提供了， 则在初始化渲染期间应用初始操作。这对于计算包含通过 props 传递的值的初始 state 非常有用
```jsx harmony
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return {count: action.payload};
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    {type: 'reset', payload: initialCount},
  );

  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
如果涉及多个子值的复杂状态逻辑时，useReducer 通常优于 useState，它还允许优化触发深度更新的组件的性能，因为可以传递调度而不是回调。

### useCallback
useCallback 和 useMemo 有些相似。它接收一个内联函数和一个数组，它返回的是一个记忆化版本的函数。                  
使用语法如下：                 
```jsx harmony
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
useCallback 的第一个参数是一个函数用来执行一些操作和计算。
第二个参数是一个数组，当这个数组里面的值改变时 useMemo 会重新执行更新这个匿名函数里面引用到 a 的值。
这样描述可能有点不太好理解，下面看一个例子：
主体运行的functionComponent:
```jsx harmony
import React, {useState, useEffect} from 'react';
import TestUseCallback from './TestUseCallback';

function Example() {
    const [num, setNum] = useState([1, 2, 3]);
    const handleClick = () => {
        setNum(num.map((item)=> item * 2));
    };
    return (
        <div>
            <button onClick={handleClick}>
                click me
            </button>
            <TestUseCallback num={num}/>
        </div>
    )
}
export default Example;
```

TestUseCallback 代码如下：
```jsx harmony
import React from 'react';
export default function TestUseCallback({ num }) {
    const memoizedCallback = React.useCallback(
        () => {
            // 一些计算
            return num;
        },
        [],
    );
    console.log('记忆 num > ', memoizedCallback());
    console.log('原始 num > ', num);
    return (
        <div>
            <p>TestUseCallback</p>
        </div>
    )
}
```
当 inputs 不传值得时候， num 发生变化的话， 结果如下：
```
记忆 num >  (3) [1, 2, 3]
原始 num >  (3) [1, 2, 3]

记忆 num >  (3) [1, 2, 3]
原始 num >  (3) [2, 4, 6]
```

如果我们想监听 num 值的更新重新做一些操作和计算，我们可以给第二个参数放入 num 值                       
结果如下：               
```
记忆 num >  (3) [1, 2, 3]
原始 num >  (3) [1, 2, 3]

记忆 num >  (3) [2, 4, 6]
原始 num >  (3) [2, 4, 6]
```

**useCallback(fn, inputs) 等效于 useMemo(() => fn, inputs).**

**注意:** 输入数组不作为参数传递给回调。
从概念上讲：回调内引用的每个值也应该出现在 inputs 数组中，将来，一个足够先进的编译器可以自动创建这个数组。


### useMemo
```jsx harmony
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
这个api实现的功能实际上是跟useCallback 是一样的。 


### useRef
```jsx harmony
const refContainer = useRef(initialValue);
```
useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传递的参数 initialValue。返回的对象将持续整个组件的生命周期。                                        
常见的使用场景是强制访问子组件：                    
```jsx harmony
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
请注意 useRef() 比直接使用 ref 属性有用。保持任何可变值的方式类似于在类中使用实例字段的方法。



## 关于react hooks 其他文章可以看这里
- [React Hooks之useContext](https://blog.csdn.net/weixin_44282875/article/details/85336106)




