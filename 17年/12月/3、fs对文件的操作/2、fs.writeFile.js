/*
var fs = require('fs'); // 引入fs模块

// 写入文件内容（如果文件不存在会创建一个文件）  
// 写入时会先清空文件  
fs.writeFile('./test2.txt', 'test test', function(err) {
    if (err) {
        throw err;
    }

    console.log('Saved.');

    // 写入成功后读取测试  
    fs.readFile('./test2.txt', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
});  */

//异步封装和promis读取模块
const fs = require('fs');
const path = require('path');
const filename = path.resolve('test2.txt');

function write() {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, '我是颜乐乐', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(console.log('写入完成'))
        });

    })
}

async function start() {
    await write();
    fs.readFile(filename,'utf-8',(err,data)=>{
        if(err){
            throw err
        }else{
            console.log(data.toString());
        }
    })
}

start();
