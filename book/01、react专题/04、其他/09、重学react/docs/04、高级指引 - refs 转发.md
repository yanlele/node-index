# Refs 转发

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。
对于大多数应用中的组件来说，这通常不是必需的。
但其对某些组件，尤其是可重用的组件库是很有用的。最常见的案例如下所述。


### 转发 refs 到 DOM 组件
```typescript jsx
import React, { createRef, FC, forwardRef, RefForwardingComponent, useEffect } from 'react';
import CodeViewContainer from '../../../components/BaseCodeView/CodeViewContainer';

/**
 * React 组件隐藏其实现细节，包括其渲染结果。其他使用 FancyButton 的组件通常不需要获取内部的 DOM 元素 button 的 ref。
 * 这很好，因为这防止组件过度依赖其他组件的 DOM 结构。
 *
 * Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。
 * 在下面的示例中，FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button：
 *
 * 这样，使用 FancyButton 的组件可以获取底层 DOM 节点 button 的 ref ，并在必要时访问，就像其直接使用 DOM button 一样。
 *
 * 我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
 * 我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
 * React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
 * 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
 * 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
 * */
const RefsDemo1: FC = () => {
  const buttonRef = createRef();
  useEffect(() => {
    console.log('buttonRef.current', buttonRef.current);
  }, []);

  return (
    <CodeViewContainer codePath="Refs/RefsDemo1">
      <FancyButton ref={buttonRef} />
    </CodeViewContainer>
  );
};

interface RefForwardProps {}

interface FancyButtonProps {}

const FancyButton: RefForwardingComponent<RefForwardProps, FancyButtonProps> = forwardRef((props, ref) => {
  return <button ref={ref}>{props.children}</button>;
});

export default RefsDemo1;
```

### 子组件向父组件转发内容
```typescript jsx
import React, { FC, forwardRef, RefForwardingComponent, useEffect, useImperativeHandle, useRef } from 'react';
import CodeViewContainer from '../../../components/BaseCodeView/CodeViewContainer';

interface Props {
  parent: string;
}

export interface ChildRef {
  name: string;
  age: number;
}

const ChildComponent: RefForwardingComponent<ChildRef, Props> = forwardRef((props, ref) => {
  console.log(props);

  useImperativeHandle(ref, () => ({
    name: 'yanle',
    age: 27,
  }));

  return <div>my child component</div>;
});

const RefsDemo2: FC = () => {
  const childRef = useRef<ChildRef>(null);

  useEffect(() => {
    console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
    console.log('childRef.current', childRef.current);
    console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
  }, []);

  return (
    <CodeViewContainer codePath="Refs/RefsDemo2">
      <ChildComponent ref={childRef} parent="name" />
    </CodeViewContainer>
  );
};

// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。
export default RefsDemo2;
```

