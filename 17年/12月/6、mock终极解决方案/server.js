const express=require('express')
var mock2easyMiddleware = require('mock2easy-middleware');
const app=express();

app.use(mock2easyMiddleware({
    port: '8005',
    preferredLanguage: 'ch'
}));
var server = app.listen(8004,(req,res)=>{
    console.log('mock服务已经启动')
});
