const fs =require('fs');
const path=require('path');
const filename=path.resolve('test3.txt');
console.log(filename);


/*
function write(){
    return new Promise((resolve,reject)=>{
        fs.writeFile(filename,'我希望我是追加的内容',{'flag':'a'},(err)=>{
            if(err){
                reject(err)
            }
            resolve(console.log('追加内容成功'))
        });

    })
}

async function start(){
    await write();
    fs.readFile(filename,'utf-8',(err,data)=>{
        if(err){
            console.log('读取文件失败');
            return console.log(err);
        }else{
            console.log(data.toString());
        }
    })
}

start();*/
