## Profiler

Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。
它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。

### 用法
Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 
它需要两个 prop ：一个是 id(string)，一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 onRender(function)。
```tsx
import React, { FC, useState, Profiler as ReactProfiler, ProfilerOnRenderCallback } from 'react';

const Profiler: FC = () => {
  const [value, setValue] = useState('');

  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.group('info');
    console.log('id', id);
    console.log('phase', phase);
    console.log('actualDuration',actualDuration);
    console.log('baseDuration', baseDuration);
    console.log('startTime', startTime);
    console.log('commitTime', commitTime);
    console.log('interactions', interactions);
    console.groupEnd();
  }

  return (
    <div>
      <ReactProfiler id="profiler" onRender={onRender}>
        <input type="text" onChange={event => setValue(event.target.value)} /> <br />
        <p>输出内容：{value}</p>
      </ReactProfiler>
    </div>
  );
};

export default Profiler;
```

### onRender
参数：                                 
- id: string - 发生提交的 Profiler 树的 id。 如果有多个 profiler，它能用来分辨树的哪一部分发生了“提交”。
- phase: "mount" | "update" - 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。
- actualDuration: number - 本次更新在渲染 Profiler 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。（例如 React.memo，useMemo，shouldComponentUpdate）。 理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。
- baseDuration: number - 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。
- startTime: number - 本次更新中 React 开始渲染的时间戳。
- commitTime: number - 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。
- interactions: Set - 当更新被制定时，“interactions” 的集合会被追踪。（例如当 render 或者 setState 被调用时）。
