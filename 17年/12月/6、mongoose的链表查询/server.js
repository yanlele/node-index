const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const router = require('./router/router');


const app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//链接路由和数据库
router(app);


app.listen(8081,function(){
    console.log('server is start')
});