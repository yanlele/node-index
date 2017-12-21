const fs=require('fs');
const path=require('path');
const dir=path.resolve('../mkdir/index.html');
console.log(dir);

function read(dir){
    return new Promise((resolve,reject)=>{
        fs.readFile(dir,'utf-8',(err,data)=>{
            if(err){
                reject(console.log(err))
            }else{
                resolve(console.log(data))
            }
        })
    })
}

read(dir);