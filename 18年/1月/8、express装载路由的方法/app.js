const path=require('path');
const express=require('express');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const config=require('config-lite')(__dirname);
const routes=require('./routes');
const pkg=require('../package.json');
const winston=require('winston');
const expressWinstom=require('express-winston');

const app=express();

//设置模板根目录
app.set('views',path.join(__dirname,'views'));
//设置模板引擎为  ejs
app.set('view engine','ejs');

//设置静态资源目录
app.use(express.static(path.join(__dirname,'public')));

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
        url:config.mongodb
    })
}));

app.use(flash());//使用flash中间件，来显示通知

app.locals.blog={
    title: pkg.name,
    description: pkg.description
};
app.use(function(req,res,next){
    res.locals.user=req.session.user;
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    next();
});



//处理表单以及文件上传中间件
app.use(require('express-formidable')({
    uploadDir:path.join(__dirname,'public/img'),
    keepExtensions:true
}));

//正常请求日志
app.use(expressWinstom.logger({
    transports:[
        new (winston.transports.Console)({
            json:true,
            colorize:true
        }),
        new winston.transports.File({
            filename:'logs/success.log'
        })
    ]
}));
//调用路由
routes(app);
//错误请求日志
app.use(expressWinstom.errorLogger({
    transports:[
        new winston.transports.Console({
            json:true,
            colorize:true
        }),
        new winston.transports.File({
            filename:'logs/error.log'
        })
    ]
}));

//错误处理
app.use(function(err,req,res,next){
    console.log(err);
    req.flash('error',err.message);
    res.redirect('/posts')
});


if(module.parent){
    //被require,则导出app
    module.exports=app
}else{
    //监听运行
    app.listen(config.port,function(){
        console.log(` ${pkg.name} listening on port ${config.port}`)
    });
}
