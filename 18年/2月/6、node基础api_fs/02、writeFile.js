const fs=require('fs');

fs.writeFile('./test.txt','This is a test',{
    encodeing:'utf8'
},err=>{
    if(err){
        throw err;
    }
});