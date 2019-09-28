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

### 处理给children传递参数的方法
祭出大法 `React.cloneElement`                       
直接上代码 `Parent.tsx`：                                       
```
import React, { FC, ReactElement, cloneElement } from 'react';

const Parent: FC = props => {
  return (
    <>
      <h3>我是parent 组件</h3>
      {props.children &&
        cloneElement(props.children as ReactElement, {
          hello: '我是单个parent示例',
        })}
    </>
  );
};

export default Parent;
```

上代码`Child.tsx`：                                       
```
import React, { FC } from 'react';

interface Props {
  name?: string;
  index?: number;
}

const Child: FC<Props> = props => {
  console.log('child.props output', props);  

  return <div>我是children 组件</div>;
};

export default Child;
```

使用再上面那个例子里面。
我们在子组件 `Child` 就能接受到 `Parent` 组件过来的参数了， 我们就可以在 `Parent` 组件做一些针对子主键特化的逻辑了。








### 参考文章

- [this.props.children和React.cloneElement](https://www.jianshu.com/p/a267c674ec7e)
- [React.cloneElement](https://www.jianshu.com/p/2ccf0cd14388)
- [this.props.children传值到子组件](https://www.jianshu.com/p/0127d5f662c0)
