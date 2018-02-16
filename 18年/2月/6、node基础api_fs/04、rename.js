const fs=require('fs');

fs.rename('./test.txt','yanle.txt',err=>{
    if(err){
        throw err
    }
    console.log('成功了!');
});