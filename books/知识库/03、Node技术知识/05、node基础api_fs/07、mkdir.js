const fs =require('fs');

fs.mkdir('test',err=>{
    if(err){
        throw err;
    }
    console.log('success')
});