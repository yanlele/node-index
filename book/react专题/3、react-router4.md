# 3、react-router4

> 安装路由    
  
    npm install react-router-dom --save     
    或者： yarn add react-router-dom

> 1.    基本使用      

```jsx harmony
import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'

//路由
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducers from './reducer'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))


// boss genius me msg 4个页面
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute/>
				<Switch>
					<Route path='/bossinfo' component={BossInfo}/>
					<Route path='/geniusinfo' component={GeniusInfo}/>
					<Route path='/login' component={Login}/>
					<Route path='/register' component={Register}/>
					<Route path='/chat/:user' component={Chat}/>
					<Route component={Dashboard}/>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
);
```

> 2.    整合reducers
    
建立reducer.js文件，代码如下：
```jsx harmony
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { auth } from './Auth.redux'

export default combineReducers({counter,auth})
```
它的作用是合并reducer,然后抛出给index.js中，让react-redux处理之后给注入给react项目用

- [react-router4与合并reducers示例](../../17年/12月/12、react-router4与合并reducers示例)