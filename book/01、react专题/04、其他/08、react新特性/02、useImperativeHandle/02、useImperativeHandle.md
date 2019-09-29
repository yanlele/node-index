## useImperativeHandle

useImperativeHandle 是 hook 中提供的允许我们 ref 一个function component 的方案，也是 Hook 在 TypeScript 中使用最复杂的场景。                        
useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
```typescript jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

在本例中，渲染 <FancyInput ref={fancyInputRef} /> 的父组件可以调用 fancyInputRef.current.focus()。


### 来一段有生命力的例子

parent:             
```typescript jsx
import React, { FC, forwardRef, useEffect, useRef } from 'react';
import Child, { ChildRef } from './Child';

const ChildRefComponent = forwardRef(Child);

const UseImperativeHandle: FC = () => {
  const childRef = useRef<ChildRef>(null);

  useEffect(() => {
    console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
    console.log(childRef.current);
    console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
  }, []);

  return (
    <>
      <ChildRefComponent ref={childRef} parent="name" />
    </>
  );
};

export default UseImperativeHandle;
```

Child.tsx:                  
```typescript jsx
import React, { RefForwardingComponent, useImperativeHandle } from 'react';

interface Props {
  parent: string;
}

export interface ChildRef {
  name: string;
  age: number;
}

const Child: RefForwardingComponent<ChildRef, Props> = (props, ref) => {
  console.log(props);

  useImperativeHandle(ref, () => ({
    name: 'yanle',
    age: 27,
  }));

  return <div>my child component</div>;
};

export default Child;
```

### 参考文章
- [官方文档 - useimperativehandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)
- [TypeScript 中使用React Hook](https://www.jianshu.com/p/fa21a7d4a193)

