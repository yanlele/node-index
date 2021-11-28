# 基础知识部分

#### redux状态管理

- redux处理异步，需要redux-thunk插件
- npm install redux-devtools-extension并且开启
- 使用react-redux又要的链接react和redux
- 开启redux-thunk中间件，需要一个applyMiddleware开启中间件

> index.redux.js代码如下：
```jsx harmony
//action state
const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

// 这就是reducer处理函数，参数是状态和新的action
export function counter(state = 0, action) {
    // let state = state||0
    switch (action.type) {
        case ADD_GUN:
            return state + 1
        case REMOVE_GUN:
            return state - 1
        default:
            return 10
    }
}

//action mapper

//action creator
export function addGun() {
    return {type: ADD_GUN}
}
export function removeGun() {
    return {type: REMOVE_GUN}
}
// 延迟添加，拖两天再给
export function addGunAsync() {
    // thunk插件的作用，这里可以返回函数，
    return dispatch => {
        setTimeout(() => {
            // 异步结束后，手动执行dispatch
            dispatch(addGun());
        }, 2000);
    };
}
```         
        
        

- react-redux 具体使用：提供了两个新的接口Provider和connect        
Provider组件在引用最外成，传入store即可，只使用一次
> app.js 代码如下
```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {counter} from './index.redux'
import {Provider} from 'react-redux';
import App from './App'

//compose用来组合中间件
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root'));
```

- Connect 负责从外部获取组件所需要的参数
> App.js 代码如下
```jsx harmony
import React from 'react'
import {connect} from 'react-redux'
import {addGun, removeGun, addGunAsync} from './index.redux'

// 装饰器模式
@connect(
//你要的states什么属性放到props里面
    state => ({num: state}),
//你要的什么方法，也放到props里面，而且自动dispatch
    {addGun, removeGun, addGunAsync}
)
class App extends React.Component {
    render() {
        // num addGun，removeGun，addGunAsync都是connect给的，不需要手动dispatch
        return (
            <div>
                <h2>现在有机枪{this.props.num}把</h2>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}
export default App;
```
- Connect 可以用装饰器的方式来写
首先我们要安装一个babel支持装饰器的一个插件：babel-plugin-transform-decorators-legacy
> 在package.json中加入装饰器的配置
```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd-mobile",
        "style": "css"
      }
    ],
    "transform-decorators-legacy"
  ]
},
```