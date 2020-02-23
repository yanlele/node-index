## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

<!-- toc -->

- [基础使用](#%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8)
- [使用场景问题](#%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E9%97%AE%E9%A2%98)
- [重要API](#%E9%87%8D%E8%A6%81api)
  * [React.createContext](#reactcreatecontext)
  * [Context.Provider](#contextprovider)
  * [Class.contextType](#classcontexttype)
  * [Context.Consumer](#contextconsumer)
  * [Context.displayName](#contextdisplayname)
- [使用场景](#%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF)
  * [动态更新Context](#%E5%8A%A8%E6%80%81%E6%9B%B4%E6%96%B0context)
  * [在嵌套组件中更新 Context](#%E5%9C%A8%E5%B5%8C%E5%A5%97%E7%BB%84%E4%BB%B6%E4%B8%AD%E6%9B%B4%E6%96%B0-context)
  * [消费多个 Context](#%E6%B6%88%E8%B4%B9%E5%A4%9A%E4%B8%AA-context)
- [注意](#%E6%B3%A8%E6%84%8F)

<!-- tocstop -->

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
```jsx harmony
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

- 挂载在 class 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 Context 对象。
- 这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
- 如果你正在使用实验性的 public class fields 语法，你可以使用 static 这个类属性来初始化你的 contextType。
```jsx harmony
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
```

#### Context.Consumer
```jsx harmony
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```
- 这需要函数作为子元素（function as a child）这种做法。**这个函数接收当前的 context 值，返回一个 React 节点。**


#### Context.displayName
```
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

- context 对象接受一个名为 displayName 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。



### 使用场景

#### 动态更新Context
```typescript jsx
import React, { Component, createContext, FC } from 'react';
import CodeViewContainer from '../../../components/BaseCodeView/CodeViewContainer';

/*
 * 动态更新 Context
 * */

/* ==============================  const - Start ============================== */
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = createContext(themes.dark);
/* ==============================  const - End   ============================== */

/* ==============================  ThemedButton - Start ============================== */
class ThemedButton extends Component<{ onClick: () => void }> {
  render() {
    const { context } = this;
    return (
      <button {...this.props} style={{ backgroundColor: context.background }}>
        {this.props.children}
      </button>
    );
  }
}

ThemedButton.contextType = ThemeContext;
/* ==============================  ThemedButton - End   ============================== */

/* ==============================  ToolBar：ThemedButton 的一个中间件 - Start ============================== */
const ToolBar: FC<{ changeTheme: () => void }> = props => {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
};

/* ==============================  ToolBar：ThemedButton 的一个中间件 - End   ============================== */

/* ==============================  ContextDemo2 - Start ============================== */
interface ContextDemo2State {
  theme: {
    foreground: string;
    background: string;
  };
}

class ContextDemo2 extends Component<any, ContextDemo2State> {
  state = {
    theme: themes.light,
  };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  };

  render() {
    return (
      <CodeViewContainer codePath="Context/ContextDemo2">
        <ThemeContext.Provider value={this.state.theme}>
          <ToolBar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
      </CodeViewContainer>
    );
  }
}
/* ==============================  ContextDemo2 - End   ============================== */

export default ContextDemo2;
```


#### 在嵌套组件中更新 Context
```typescript jsx
import React, { Component, createContext } from 'react';

/*
 * 在嵌套组件中更新 Context
 *
 * 从一个在组件树中嵌套很深的组件中更新 context 是很有必要的。
 * 在这种场景下，你可以通过 context 传递一个函数，使得 consumers 组件更新 context：
 * */

/* ==============================  const - Start ============================== */
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

const { Provider, Consumer } = ThemeContext;
/* ==============================  const - End   ============================== */

/* ==============================  ThemeToggleButton - Start ============================== */
const ThemeToggleButton = () => {
  return (
    <Consumer>
      {({ theme, toggleTheme }) => (
        <button onClick={toggleTheme} style={{ backgroundColor: theme.background }}>
          Toggle Theme
        </button>
      )}
    </Consumer>
  );
};
/* ==============================  ThemeToggleButton - End   ============================== */

/* ==============================  ContentComponent - Start ============================== */
const Content = () => (
  <div>
    <ThemeToggleButton />
  </div>
);
/* ==============================  ContentComponent - End   ============================== */

/* ==============================  ContextDemo3 - Start ============================== */
interface ContextDemo3State {
  theme: {
    foreground: string;
    background: string;
  };
}

class ContextDemo3 extends Component<any, ContextDemo3State> {
  state = {
    theme: themes.light,
  };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  };

  render() {
    return (
      <Provider value={Object.assign({}, this.state, { toggleTheme: this.toggleTheme })}>
        <Content />
      </Provider>
    );
  }
}
export default ContextDemo3;
/* ==============================  ContextDemo3 - End   ============================== */
```

#### 消费多个 Context
为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。

```jsx harmony
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

### 注意
当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。
举个例子，当每一次 Provider 重渲染时，
以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象：
```jsx harmony
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

为了防止这种情况，将 value 状态提升到父节点的 state 里：
```jsx harmony
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```
