const fs=require('fs');
const path=require('path');
const filename=path.resolve('test3.txt');
console.log(filename);
fs.open(filename,'r+',(err,fd)=>{
    if(err){
        return console.log(err)
    }
    console.info(fd);
    console.log('文件打开成功')
});