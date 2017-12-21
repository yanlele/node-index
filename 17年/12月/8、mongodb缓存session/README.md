# session存入mongodb数据库实现持久化管理
- 实例代码详情见本示例

- 在app.js做如下的配置定义：
```javascript
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const config=require('config-lite')(__dirname);

//session中间件
app.use(session({
    name:config.session.key,//设置cookie中保存的session id 的字段名称
    secret:config.session.secret,//设置哈希，放Cookie篡改
    resave:true,//强制更新session
    saveUninitialized:false,//强制创建一个session，及时用户没有登录
    cookie:{
        maxAge:config.session.maxAge//过期时间
    },
    store:new MongoStore({//将session 储存到mongodb中
        url:config.mongodb,
collection:'sessions'
    })
}));
```

- 使用
```javascript
req.session.user=null;//清空session
//写入session
delete user.password;
req.session.user=user;
```

- 注意：       
    这一段配置一定要写在路由的配置之前