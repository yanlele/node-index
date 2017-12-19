const fs=require('fs');
const path=require('path');
const dir=path.resolve('../mkdir/index.html');
console.log(dir);

fs.readFile(dir,'utf-8',(err,data)=>{
    if(err){
        return console.log(err)
    }else{
        console.log(data.toString());
    }
});