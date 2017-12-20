var fs=require('fs');
var path=require('path');
var file1=path.resolve('test2.txt');
//监视文件
var fsWatcher=fs.watch(file1,function(err,filename){
    //console.log('创建监视器成功,filename:'+filename);
});
//chang 事件会触发多次
fsWatcher.on('change',function(err,filename){
    console.log(filename+'-发生变化');
});
//50秒后 关闭监视
setTimeout(function(){
    fsWatcher.close(function(err){
        if(err)
            console.error(err);
        console.log('关闭成功watch');
    });
},50000);