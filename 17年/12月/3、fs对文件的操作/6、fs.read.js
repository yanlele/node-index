const fs=require('fs');
const path=require('path');
const filename=path.resolve('test3.txt');
console.log(filename);

function open(){
    return new Promise((resolve,reject)=>{
        fs.open(filename,'r',(err,fd)=>{
            if(err){
                throw err;
            }else{
                resolve(fd);
            }
        })
    })
}

async function read(){
    const fd= await open();
    const buffer=new Buffer(255);
    fs.read(fd,buffer,0,9,3,(err,bytesRead,buffer)=>{
        if(err){
            throw err
        }else{
            console.log(bytesRead);
            console.log(buffer.slice(0,bytesRead).toString())
        }
    })
}

read();