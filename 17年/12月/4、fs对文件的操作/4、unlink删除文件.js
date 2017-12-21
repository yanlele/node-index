const fs=require('fs');
const path=require('path');
const filename=path.resolve('test.js');
console.log(filename);

function remove(){
    return new Promise((resolve,reject)=>{
        fs.unlink(filename,(err)=>{
            if(err){
                reject(console.log(err))
            }
            resolve(console.log('删除文件成功'))
        });
    })
}

async function start(){
    await remove();
    fs.readdir(__dirname,(err,files)=>{
        if(err){
            return console.log(err)
        }else{
            files.forEach((item)=>{
                console.log(item)
            })
        }
    })
}
start();