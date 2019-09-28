## Children和cloneElement的研究

首先举一个场景的例子：                         
如果我们这样使用组件                      
```
import React, { FC } from 'react';
import Parent from './Parent';
import Child from './Child';
import ParentChildren from './ParentChildren';

const PropsChild: FC = () => {
  return (
    <div>
      <h2>PropsChild</h2>
      <hr />
      <h3>单个child 场景</h3>
      <Parent>
        <Child />
      </Parent>

      <hr />
      <h3>多个childRen场景</h3>
      <ParentChildren>
        <Child name="first child" />
        <Child />
        <Child />
      </ParentChildren>
    </div>
  );
};

export default PropsChild;
```

在父组件里面， 希望用 `{props.children}` 这样的渲染方式嵌套的子组件， 会存在一个问题， 如果我希望在父组件封装一些特化的逻辑， 
然后再把传输传递给不同的子组件。 这个时候该如何处理呢？

 






### 参考文章

- [this.props.children和React.cloneElement](https://www.jianshu.com/p/a267c674ec7e)
- [React.cloneElement](https://www.jianshu.com/p/2ccf0cd14388)
- [this.props.children传值到子组件](https://www.jianshu.com/p/0127d5f662c0)
