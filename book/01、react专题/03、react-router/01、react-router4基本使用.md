# 3、react-router4

> 安装路由    
  
    npm install react-router-dom --save     
    或者： yarn add react-router-dom

### 1. 基本使用 

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
));


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

### 2. 整合reducers
    
建立reducer.js文件，代码如下：
```jsx harmony
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { counter } from './index.redux'
import { auth } from './Auth.redux'

export default combineReducers({counter,auth})
```
它的作用是合并reducer,然后抛出给index.js中，让react-redux处理之后给注入给react项目用

- [react-router4与合并reducers示例](../../../17年/12月/12、react-router4与合并reducers示例)

### 3. 关于this.props.match.params的使用        

这个是获取router/:id 的参数的
例如如下：
```jsx harmony
import React, {Component} from 'react'
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

/*配置路由*/
import Material from '../container/material/material'
import CannotFind from '../container/404/404'
import Page from '../container/pages/page'

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                       <Route path='/' exact component={Material}/>
                        <Route path='/material' exact component={Material}/>
                        <Route path='/page/:userid' exact component={Page}/>
                        <Route component={CannotFind}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Router
```

在page.js中获取url参数
```jsx harmony
import React from 'react'

class Page extends React.Component{

    componentDidMount(){
        console.log(this.props.match.params);//得到的结果为 {userid:'XXXXXX'}
    }

    render(){
        return(
            <div>
                <h1>我是render函数</h1>
            </div>
        )
    }
}

export default Page
```


### 4.路由跳转   
```jsx harmony
import React, {FunctionComponent, useState} from 'react';
import {connect} from 'react-redux';
import {Layout, List, Card} from 'antd';
import {History, Location} from 'history';
import {parse} from 'querystring';
import {Link} from 'react-router-dom';

const {Header, Content} = Layout;
const {Item: ListItem} = List;

interface HomeContainerProps {
  history: History;
  location: Location;
}

interface ListRouter {
  title: string,
  pathname: string,
  routerItems: { name: string, search: string }[],
}

const HomeContainer: FunctionComponent<HomeContainerProps> = (props) => {
  const {history, location} = props;

  console.log(location);  
  console.log(parse(location.search.slice(1))); // 用于解析query 参数

  const [listRouter] = useState<ListRouter[]>([
    {
      title: '数据与选择集',
      pathname: '/select-data/',
      routerItems: [
        {
          name: 'demo1',
          search: 'name=demo1',
        },
        {
          name: 'demo2',
          search: 'name=demo2',
        },
      ],
    },
  ]);

  return (
    <Layout style={{backgroundColor: '#fff'}}>
      <Header style={{background: '#fff'}}>
        <h1>D3 </h1>
      </Header>

      <Content style={{margin: '20px'}}>
        <List
          grid={{gutter: 16, column: 4}}
          dataSource={listRouter}
          renderItem={item => (
            <ListItem
              // onClick={() => history.push({
              //   pathname: '/select-data/',
              //   search: 'name=yanle',
              // })}
            >
              <Card title={item.title}>
                <List
                  dataSource={item.routerItems}
                  renderItem={listItem => (
                    <ListItem>
                      <Link to={{
                        pathname: item.pathname,
                        search: listItem.search,
                      }}>{listItem.name}</Link>
                    </ListItem>
                  )}
                />
              </Card>
            </ListItem>
          )}
        />
      </Content>
    </Layout>
  );
};

export default connect()(HomeContainer);
```
