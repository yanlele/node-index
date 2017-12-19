/*
var fs=require('fs');
var path=require('path');
var path1=path.resolve('index.html');
console.info(path1);
var path2=path.resolve('index2.html');
fs.rename(path1,path2,function(err){
    if(err){
        console.error(err);
        return;
    }
    console.log('重命名成功');
});*/


const fs=require('fs');
const path=require('path');
const dir1=path.resolve('index2.html');
const dir2=path.resolve('index.html');

fs.rename(dir1,dir2,(err)=>{
    if(err){
        return console.log(err)
    }else{
        console.log('重命名成功！！！')
    }
});