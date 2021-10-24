import React, { Component } from 'react';

class Test extends Component {
  private textInput: React.RefObject<any>;

  constructor(parameters: { props: any }) {
    const props = parameters.props;
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => this.textInput.current.focusTextInput(), 2000);

  }

  render() {
    return (
      <CustomTextInput ref={this.textInput}/>
    );
  }
}

class CustomTextInput extends Component {
  private textInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    // 创建一个ref去储存textInput DOM元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 很明显的，让text input获得焦点使用了原生的DOM API
    // 注意：我们通过current去获得DOM节点
    this.textInput.current.focus();
  }

  render() {
    // 告诉React我们想要将<input>的ref和构造器中创建的textInput联系起来
    return (
      <div>
        <input
          type="text"
          ref={this.textInput}
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

export default Test;
