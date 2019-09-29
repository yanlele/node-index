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

### 处理给props.children传递参数的方法
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

#### 大法`React.cloneElement`
```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

**第一个参数：element**                       
通常用的最多的是搭配React.Children.map和this.props.children使用，如下：                 
```
React.Children.map(props.children, child => {
    return React.cloneElement(child, {...props}, children)
})
```

注意点：               
在使用 `React.cloneElement` 的时候， 第一个参数， 只能是一个节点元素， 不能大于1个， 一旦子元素数量大于1，type为undefined的React对象。
所以使用的时候， 一定要判定 props.children 是否只有一个节点。 




### 多个child组件传递参数场景
问题： 如果 `Parent` 组件下面， 如果有多个子节点 `Child` 组件。 如果在我们子组件调用的时候要给子组件传递参数。                  
而且也要在 `Parent` 处理特化逻辑之后， 在传递给 子组件 `Child`, 该如何处理？                       

祭出大法： `React.Children`                      
上代码`ParentChildren.tsx`                     
```
import React, { FC, Children as RChildren, cloneElement, ReactElement } from 'react';
import { get } from 'lodash';

const ParentChildren: FC = props => {
  return (
    <>
      {RChildren.map(props.children, (child, index) => {
        console.log('child.props inject', get(child, 'props'));
        return cloneElement(child as ReactElement, {
          index,
        });
      })}
    </>
  );
};

export default ParentChildren;
```

子组件代码和使用代码 如上                                   

这样的写法， 就可以在父子主键嵌套调用的时候， 给子组件传递参数。 同事也能在父组件给子组件特化的逻辑。                        


#### ReactChildren
`React.Children` 大法如何使用？                        

定义如下：                      
```
interface ReactChildren {
    map<T, C>(children: C | C[], fn: (child: C, index: number) => T): T[];
    forEach<C>(children: C | C[], fn: (child: C, index: number) => void): void;
    count(children: any): number;
    only<C>(children: C): C extends any[] ? never : C;
    toArray<C>(children: C | C[]): C[];
}
```


### 参考文章
- [this.props.children和React.cloneElement](https://www.jianshu.com/p/a267c674ec7e)
- [React.cloneElement](https://www.jianshu.com/p/2ccf0cd14388)
- [this.props.children传值到子组件](https://www.jianshu.com/p/0127d5f662c0)
- [React.Children的用法](https://blog.csdn.net/uuihoo/article/details/79710318)
