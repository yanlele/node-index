//创建目录
var fs=require('fs');
fs.mkdir('../mkdir',function(err){
    if(err)
        console.error(err);
    console.log('创建目录成功');
});