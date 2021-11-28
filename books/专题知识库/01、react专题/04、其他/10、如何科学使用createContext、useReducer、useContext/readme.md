## 如何科学使用createContext、useReducer、useContext

<!-- toc -->

- [如何使用createContext、useReducer、useContext组合](#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8createcontextusereducerusecontext%E7%BB%84%E5%90%88)
  * [定义reducer](#%E5%AE%9A%E4%B9%89reducer)
  * [定义context](#%E5%AE%9A%E4%B9%89context)
  * [使用实例](#%E4%BD%BF%E7%94%A8%E5%AE%9E%E4%BE%8B)
- [总结一下](#%E6%80%BB%E7%BB%93%E4%B8%80%E4%B8%8B)

<!-- tocstop -->

### 如何使用createContext、useReducer、useContext组合

#### 定义reducer
```typescript jsx
import { Action, ReducerActionType, ReducerInitDataState } from '@/pages/reducer/reducerData/interface';

export const ReducerInitData: ReducerInitDataState = {
  count: 0,
  name: '',
};

export const ReducerType: ReducerActionType = {
  updateCount: 'UPDATE_COUNT',
  updateName: 'UPDATE_NAME',
};

export const reducerFn = (state: ReducerInitDataState, action: Action) => {
  switch (action.type) {
    case ReducerType.updateCount:
      return {
        ...state,
        count: action.payload,
      };
    case ReducerType.updateName:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};
```

#### 定义context
```typescript jsx
import { createContext } from 'react';
import { ReducerInitData } from '@/pages/reducer/reducerData';
import { noop } from 'lodash';

export const ReducerContext = createContext({ state: ReducerInitData, dispatch: noop });
```


#### 使用实例
```typescript jsx
import React, { FC, memo, useCallback, useContext, useReducer } from 'react';
import { reducerFn, ReducerInitData, ReducerType } from '@/pages/reducer/reducerData';
import { ReducerContext } from '@/pages/reducer/consts';
import { Button } from 'antd';
import WrapperReducerHOC from '@/pages/reducer/hoc/WrapperReducerHOC';

const ChildTow = memo(() => {
  console.log('child tow');
  const { state } = useContext(ReducerContext);
  return (
    <div>
      child tow - {state.count}
    </div>
  );
});

const ChildTow2: FC<Partial<{ count: number }>> = memo(props => {
  const { count } = props;
  console.log('child tow 2');
  return (
    <div>
      child tow 2 - {count}
    </div>
  );
});

const ChildTow2WrapperComponent = WrapperReducerHOC(ChildTow2, () => {
  const { state } = useContext(ReducerContext);
  return {
    count: state.count,
  };
});

const ChildOne = memo(() => {
  console.log('child one');
  return (
    <>
      <ChildTow />
      <ChildTow2 />
      <ChildTow2WrapperComponent />
    </>
  );
});

// reducer 主体组件
const Reducer: FC = () => {
  const [state, dispatch] = useReducer(reducerFn, ReducerInitData);

  // 观察是否渲染
  console.log('reducer');

  // 更新 count
  const handleClickUpdateCount = useCallback(() => {
    dispatch({
      type: ReducerType.updateCount,
      payload: 5,
    });
  }, []);

  // 更新 name
  const handleClickUpdateName = useCallback(() => {
    dispatch({
      type: ReducerType.updateName,
      payload: 'YanLe',
    });
  }, []);

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      <div>
        <Button onClick={handleClickUpdateCount}>click - update count</Button>
        <Button onClick={handleClickUpdateName}>click - update name</Button>
        <ChildOne />
      </div>
    </ReducerContext.Provider>
  );
};

export default Reducer;
```


### 总结一下
1. 总所周知， createContext 有一个严重的弊端， 就是如果 provider value 的内容发生改变，那么其挂载的所有组件以及子组件都要重新渲染。
如果用 reducer 内容挂在在provider上面， 对性能来说无疑是一个灾难。 
   
2. 在子组件添加 `memo` 的话 可以一定程度上放置重复渲染问题出现。一定程度上是指：你使用到了 reducer 那么他还是会渲染， 如果没有使用， 就不会渲染。

3. 如果希望进一步优化组件渲染， 可以添加一个高阶组件， 这个作用就是， 在一个函数里面， 把 useContext 返回的值， 作为参数传递给子组件。
这样在子组件再做一层 `memo` 就可以用参数来判定决定渲染与否。
```typescript jsx
import React, { FC } from 'react';

export const WrapperReducerHOC = <P extends any, T extends any>(WrapperComponent: FC<P>, fn: Function) => (props: T) => {
  const state = fn(props);
  return <WrapperComponent {...state} {...props} />;
};

export default WrapperReducerHOC;
```

4. 就算是按照 3 的方式做了， 其实还是有一定的问题，那就是：只能取组件需要用到的值，如果取多了， 依然还是会渲染的。
举栗子就是，我在 `ChildTow2` 组件中， 只使用到了 `count` 数据， 如果我在上述高阶组件中， fn 返回的值中有 `name` 值，
那么 `ChildTow2` 还是会渲染。
   
5. createContext 最佳实践，个人认为是传递常量，而不是传递变量。
