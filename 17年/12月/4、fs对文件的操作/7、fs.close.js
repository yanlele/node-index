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
    return new Promise((resolve,reject)=>{
        fs.read(fd,buffer,0,9,3,(err,bytesRead,buffer)=>{
            if(err){
                throw err
            }else{
                console.log(bytesRead);
                console.log(buffer.slice(0,bytesRead).toString());
                resolve(fd);
            }
        })
    })
}

async function close(){
    const fd=await read();
    if(!fd){
        throw '在close方法中没有拿到fd'
    }else{
        fs.close(fd,(err)=>{
            if(err){
                console.log(err);
                console.log('close file is err');
            }
            console.log('close file is success!!!!')
        })
    }
}

close();