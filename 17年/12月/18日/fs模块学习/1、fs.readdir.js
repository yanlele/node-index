/*
//读取目录
const fs=require('fs');
const path=require('path');

//如果路径指定不规范，则会按当前文件所在目录处理
//如果为目录不存在抛出异常 { [Error: ENOENT, scandir 'F:\test1'] errno: -4058, code: 'ENOENT', path: 'F:\\test1' }
fs.readdir('../async&&await',function(err,files){
    if(err){
        return console.error(err);
    }
    files.forEach(function(file){
        console.info(file);
    });
});*/


//自己的练习
const fs =require('fs');
const path=require('path');

const dir =path.resolve(__filename,'../');
console.log(dir);
fs.readdir(dir,(err,data)=>{
    if(err){
        return console.log(err)
    }else{
        data.forEach((item,idnex)=>{
            console.log(item);
        })
    }
});