## Refs and the DOM

> Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。
要修改一个子组件，你需要使用新的 props 来重新渲染它。
但是，在某些情况下，`你需要在典型数据流之外强制修改子组件`。
`被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素`。
对于这两种情况，React 都提供了解决办法。

**注意的是：** 勿过度使用 Refs。 一般场景下面， 让更高的组件层级拥有这个 state，是更恰当的。

### 创建 Refs
Refs 是使用 `React.createRef()` 创建的，并通过 ref 属性附加到 React 元素。
在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。                             
```jsx harmony
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### 访问 Refs
`const node = this.myRef.current;`                      

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
- 你不能在函数组件上使用 ref 属性，因为他们没有实例。

举栗子：以下代码使用 ref 去存储 DOM 节点的引用                        
```jsx harmony
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

#### 为 DOM 元素添加 ref
举栗子 以下代码使用 ref 去存储 DOM 节点的引用：
```jsx harmony
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```


#### 为 class 组件添加 Ref
如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，
我们可以使用 `ref` 来获取这个自定义的 `input` 组件并手动调用它的 `focusTextInput` 方法：

举栗子
```jsx harmony
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

**请注意，这仅在 CustomTextInput 声明为 class 时才有效：**
```jsx harmony
class CustomTextInput extends React.Component {
  // ...
}
```

#### Refs 与函数组件
默认情况下，`你不能在函数组件上使用 ref 属性，因为它们没有实例`：

如果要在函数组件中使用 ref，你可以使用 `forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件`。

### 回调 Refs
不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

举栗子：
```jsx harmony
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

你可以在组件间传递回调形式的 refs，就像你可以传递通过 `React.createRef()` 创建的对象 refs 一样。                    
举栗子：                
```jsx harmony
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```


