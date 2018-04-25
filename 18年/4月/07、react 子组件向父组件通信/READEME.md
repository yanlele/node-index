```jsx harmony
/***实现在输入框输入邮箱时，在div中即时显示输入内容***/


<body>
    <div id="test"></div>
</body>

//子组件
var Child = React.createClass({
    render: function(){
        return (
            <div>
                邮箱：<input onChange={this.props.handleEmail}/>
            </div>
        )
    }
});

//父组件
var Parent = React.createClass({
    getInitialState: function(){
        return {
            email: ''
        }
    },
    handleEmail: function(event){
        this.setState({email: event.target.value});
    },
    render: function(){
        return (
            <div>
                <div>邮箱：{this.state.email}</div>
                <Child name="email" handleEmail={this.handleEmail.bind(this)}/>
            </div>
        )
    }
});
React.render(
  <Parent />,
  document.getElementById('test')
);
```