/*
//获取文件夹信息
var fs=require('fs');
var path=require('path');
var path1=path.resolve(__dirname);
console.info(path1);

fs.stat(path1,function(err,stats){
    console.info(stats);
    console.log(stats.isFile());
    console.log(stats.isDirectory());
});
*/


const fs=require('fs');
const path=require('path');
const dir=path.resolve(__dirname);
console.log(dir);

fs.stat(dir,function(err,state){
    console.info(state);
    console.log(state.isFile());
    console.log(state.isDirectory());
})