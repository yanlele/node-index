const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const router=require('./routers/router');

const app=express();

//session入库
app.use(session({
    secret:'test',//设置哈希，放Cookie篡改
    name:'sessionTest',//设置cookie中保存的session id 的字段名称
    resave:true,//强制更新session
    saveUninitialized:false,//强制创建一个session，及时用户没有登录
    cookie:{
        maxAge:2592000000//过期时间
    },
    store:new MongoStore({//将session 储存到mongodb中
        url:'mongodb://127.0.0.1/test',
        collection:'sessions'
    })
}));

//加入路由
router(app);

app.listen(8082,function(){
    console.log('服务启动，端口为8082')
});