//判断文件夹是否存在
var fs=require('fs');
var path=require('path');
var path1=path.resolve('../mkdir');
console.info(path1);
fs.exists(path1,function(exists){
    if(exists)
        console.log('文件夹存在');
    else
        console.log('文件夹不存在');
});