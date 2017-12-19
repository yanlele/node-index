/*
//创建目录
var fs=require('fs');
fs.mkdir('../mkdir',function(err){
    if(err)
        console.error(err);
    console.log('创建目录成功');
});*/


//自己的练习
const fs=require('fs');
const path=require('path');

const dir=path.resolve(__dirname,'../mkdir2');
console.log(dir);
fs.mkdir(dir,function(err){
    if(err){
        return console.log(err)
    }else{
        console.log('目录创建成功')
    }
})
