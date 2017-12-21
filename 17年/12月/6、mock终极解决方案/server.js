const express=require('express')
var mock2easyMiddleware = require('mock2easy-middleware');
const app=express();

app.use(mock2easyMiddleware());
var server = app.listen(8004,(req,res)=>{
  console.log('mock服务已经启动')
});
