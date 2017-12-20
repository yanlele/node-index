var fs=require('fs');
var path=require('path');
var file1=path.resolve('test2.txt');
//监视文件
//当前程序没有结束，一直在监视文件
var listener=function(curr,prev){
    console.log('监视文件发生修改');
};
fs.watchFile(file1,{interval:100},listener);
//取消监视文件
//当前程序程序结束退出
fs.unwatchFile(file1,listener);