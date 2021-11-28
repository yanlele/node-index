const fs=require('fs');

//直接写入字符串
/*
fs.writeFile('./test.txt','This is a test',{
    encodeing:'utf8'
},err=>{
    if(err){
        throw err;
    }
});*/

//写入buffer
const content = Buffer.from('this is a test.');

fs.writeFile('./test.txt',content,err=>{
    if(err){
        throw err
    }else{
        console.log('done!')
    }
})
