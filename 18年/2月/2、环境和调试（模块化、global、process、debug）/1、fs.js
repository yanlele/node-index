const fs=require('fs');

//异步IO是没有返回结果的，我们通过回调函数来拿到结果
fs.readFile('./1、fs.js',(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data.toString())
    }
});