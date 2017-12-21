const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const ejs=require('ejs');
const path=require('path');
const router=require('./routers/router');

const app=express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//静态资源路径,image,css,js等文件
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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