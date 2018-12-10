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

## 独立路由Switch
如果想要只匹配一个路由，除了 exact 属性之外，还可以使用 Swtich 组件。
```jsx harmony
const PrimaryLayout = () => (
  <div className="primary-layout">
    <PrimaryHeader />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />  // 必须加上 exact，要不然 /users 也会匹配到该路由
        <Route path="/users/add" component={UserAddPage} />
        <Route path="/users" component={UsersPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
);
```
采用 <Switch>，只有一个路由会被渲染，并且总是渲染第一个匹配到的组件。
因此，在第一个路由中，还是需要使用 exact，否则，当我们渲染 '/users' 或 '/users/add' 时，
只会显示匹配 '/' 的组件（PS：如果不使用 <Switch>，当我们不使用 exact 时，会渲染匹配的多个组件）。
所以，将 '/user/add' 路由放在 '/users' 之前更好，因为后者包含了前者，当然，我们也可以同样使用 exact，这样就可以不用关注顺序了。

再来说一下 <Redirect> 组件，单独使用时，一旦当路由匹配到的时候，浏览器就会进行重定向跳转；
而配合 <Switch>  使用时，只有当没有路由匹配的时候，才会进行重定向。
例如，上面的例子，地址栏输入 '/test' 时，则会跳转到 '/'，渲染 HomePage 页面。

## "Index Routes" 和 "Not Found"
在 v4 的版本中废弃了 <IndexRoute>，而该用 <Route exact> 的方式进行代替。
如果没有匹配的路由，也可通过 <Redirect> 来进行重定向到默认页面或合理的路径。


## 嵌套布局
如想要扩展“用户模块”，需要有一个“浏览用户”的页面和“每个用户个人信息”的页面，对于“产品模块”也是同样。
对于此类场景，作者在文中给出了两种实现方案进行对比。
首先，是最容易想到的方案，但是却不是很理想：                      
```jsx harmony
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" exact component={BrowseUsersPage} />
          <Route path="/users/:userId" component={UserProfilePage} />
          <Route path="/products" exact component={BrowseProductsPage} />
          <Route path="/products/:productId" component={ProductProfilePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}

const BrowseUsersPage = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <BrowseUserTable />
    </div>
  </div>
)

const UserProfilePage = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <UserProfile userId={props.match.params.userId} />
    </div>
  </div>
);
```
很容易看到，BrowseUsersPage 和 UserProfilePage 的布局是重复的，每次渲染子页面的时候，都会渲染整体的布局。
如果项目比较大的话，会产生很多重复冗余的代码，也会影响整体的性能。

来看一下另一种 较优的方法，充分利用了 Route 的组件化思想：
```jsx harmony
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UserSubLayout} />
          <Route path="/products" component={ProductSubLayout} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
};

const UserSubLayout = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <Switch>
        <Route path="/users" exact component={BrowseUsersPage} />
        <Route path="/users/:userId" component={UserProfilePage} />
      </Switch>
    </div>
  </div>
);

const BrowseUsersPage = () => <BrowseUserTable />;
const UserProfilePage = props => <UserProfile userId={props.match.params.userId} />;
```

这种方法将包含子页面的模块单独看成一个整体模块，然后将子模块嵌套在该模块中，那么当整体模块渲染的时候，
布局就一次性渲染了；当匹配子模块路由的时候，就只会单独渲染子模块的那一部分。
要 注意 的一点是：子页面还是需要明确父模块的路径（如 '/users'），以保证能够被匹配到。

还可以通过 match 等对路径进行优化，减少重复性的代码输入：
```jsx harmony
const UserSubLayout = ({match}) => (
    <div className="user-sub-layout">
        <aside>
            <UserNav />
        </aside>
        <div className="primary-content">
            <Switch>
                <Route path={match.path} exact component={BrowseUserTable} />
                <Route path={`${match.path}/:userId`} component={UserProfilePage} />
            </Switch>
        </div>
    </div>
);

const UserProfilePage = ({match}) => <UserProfile userId={match.params.userId} />;

// 以下是自己加的测试代码
const UserNav = () => (
    <div>User Nav</div>
);
const BrowseUserTable = ({match}) => (
    <ul>
        <li><Link to={`${match.path}/bob`}>Bob</Link></li>
        <li><Link to={`${match.path}/Tom`}>Tom</Link></li>
        <li><Link to={`${match.path}/Jack`}>Jack</Link></li>
    </ul>
);
const UserProfile = ({ userId }) => <div>User: {userId}</div>;
```

## Match
props.match 包含4个属性：match.params、match.isExact、match.path、match.url。
看一下 <UserProfile /> 的 match 属性：

1、match.path vs match.url                                           
当没有参数的时候，match.path 和 match.url 是一样的，而当有参数的时候，两者就有区别了：                              
match.path：是指写在 <Route> 中的 path 参数；                         
match.url：是指在浏览器中显示的真实 URL。                         
```jsx harmony
const UserSubLayout = ({ match }) => {
    console.log(match.path)   // output: "/users"
    console.log(match.url)  // output: "/users"
    return (
      <div className="user-sub-layout">
        <aside>
          <UserNav />
        </aside>
        <div className="primary-content">
          <Switch>
            <Route path={match.path} exact component={BrowseUserTable} />
            <Route path={`${match.path}/:userId`} component={UserProfilePage} />
          </Switch>
        </div>
      </div>
    )
  };

const UserProfilePage = ({match}) => {
    console.log(match.path); // output: "/users/:userId"
    console.log(match.url); // output: "/users/bob"
    return <UserProfile userId={match.params.userId} />
};
```

## 其他
另外，他还提到了React Router v4 中的其它部分，如 <Link> vs <NavLink>、URL Query Strings 以及 Dynamic Routes。