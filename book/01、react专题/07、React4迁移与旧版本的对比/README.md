# React4迁移与旧版本的对比

目录



## 核心区别
React Router 4 与之前的版本最大的不同便是 router 在项目中的位置：

1、v2/v3 的版本采用的方式是将路由看成是一个整体的单元，与别的组件是分离的，
一般会单独放到一个 router 文件中，对其进行集中式管理；并且，布局和页面的嵌套由路由的嵌套所决定。
```jsx harmony
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const PrimaryLayout = props => (
  <div className="primary-layout">
    <header>
      Our React Router 3 App
    </header>
    <main>
      {props.children}
    </main>
  </div>
);
const HomePage =() => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

// 集中的 router，也可将其单独放到一个 router 文件中
const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={PrimaryLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </Route>
  </Router>
);
render(<App />, document.getElementById('root'));
```

2、v4 的版本则将路由进行了拆分，将其放到了各自的模块中，不再有单独的 router 模块，充分体现了组件化的思想；
另外，<BrowserRouter> 的使用与之前作为 history 属性传入的方式也不同了。                                    
```jsx harmony
// v4 中改从 'react-router-dom' 引入的原因是因为还有个 native 版本，这个意味着是 web 版本
import { BrowserRouter, Route } from 'react-router-dom'

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
);
const HomePage =() => <div>Home Page</div>;
const UsersPage = () => <div>Users Page</div>;

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);
render(<App />, document.getElementById('root'));
```
React Router v4 的这种方式让路由和组件之间的关系变得特别好理解，可以将 Route 就当做 component 组件一样使用，
只不过此时的 URL 是其对应的 path；当 path 匹配时，则会渲染 Route 所对应的组件内容。

## 包含式路由与exact
在之前的版本中，在 Route 中写入的 path，在路由匹配时是独一无二的，
而 v4 版本则有了一个包含的关系：如匹配 path="/users" 的路由会匹配 path="/"的路由，
在页面中这两个模块会同时进行渲染。因此，v4中多了 exact 关键词，表示只对当前的路由进行匹配。
```jsx harmony
// 当匹配 /users 时，会同时渲染 UsersMenu 和 UsersPage
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
      <Route path="/users" component={UsersMenu} />
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
);
```
