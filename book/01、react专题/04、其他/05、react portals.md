# react portals

Portals是reactjs16提供的官方解决方案，使得组件可以脱离父组件层级挂载在DOM树的任何位置。

## 用法
普通情况下，组件的render函数返回的元素会被挂载在它的父级组件上。
```jsx harmony
import DemoComponent from './DemoComponent';
render() {
  // DemoComponent元素会被挂载在id为parent的div的元素上
  return (
    <div id="parent">
        <DemoComponent />
    </div>
  );
}
```
然而，有些元素需要被挂载在更高层级的位置。最典型的应用场景：当父组件具有overflow: hidden或者z-index的样式设置时，组件有可能被其他元素遮挡，这个时候你就可以考虑要不要使用Portal使组件的挂载脱离父组件。例如：对话框，tooltip。
```jsx harmony
import DemoComponent from './DemoComponent';

render() {
  // react会将DemoComponent组件直接挂载在真真实实的 dom 节点 domNode 上，生命周期还和16版本之前相同。
  return ReactDOM.createPortal(
    <DemoComponent />,
    domNode,
  );
}
```

## 时间冒泡
组件的挂载点虽然可以脱离父组件，但组件的事件通过冒泡机制仍可以传给父组件。

官方实例： 
```jsx harmony
// These two containers are siblings in the DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```                          

