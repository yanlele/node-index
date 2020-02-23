## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。


### 基础使用

如果在使用 `Context` 的时候， 传递值需要这样：                  
```jsx harmony
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用 `Context` 之后可以这样：                    
```jsx harmony
import React, { Component, createContext } from 'react';
import { Button } from 'antd';
import CodeViewContainer from '../../../components/BaseCodeView/CodeViewContainer';

const ThemeContext = createContext('light');

class ContextDemo1 extends Component {
  render() {
    return (
      <CodeViewContainer codePath="Context/ContextDemo1">
        <ThemeContext.Provider value={'dark'}>
          <ToolBar />
        </ThemeContext.Provider>
      </CodeViewContainer>
    );
  }
}

const ToolBar = () => {
  return (
    <div>
      <ThemeButton />
    </div>
  );
};

class ThemeButton extends Component {
  static contextType = ThemeContext;

  render() {
    const { context } = this;
    return <Button>{context}</Button>;
  }
}

export default ContextDemo1;
```

### 使用场景问题
Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。

**这种将逻辑提升到组件树的更高层次来处理，会使得这些高层组件变得更复杂，并且会强行将低层组件适应这样的形式，这可能不会是你想要的。**


### 重要API

#### React.createContext
`const MyContext = React.createContext(defaultValue);`

组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。                         
只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。

#### Context.Provider
`<MyContext.Provider value={/* 某个值 */}>`

- 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
- 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
- Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数

#### Class.contextType


