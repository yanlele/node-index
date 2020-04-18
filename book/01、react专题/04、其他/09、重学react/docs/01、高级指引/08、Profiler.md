## Profiler

Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。
它的目的是识别出应用中渲染较慢的部分，或是可以使用类似 memoization 优化的部分，并从相关优化中获益。


### 用法
Profiler 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 
它需要两个 prop ：一个是 id(string)，一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 onRender(function)。



