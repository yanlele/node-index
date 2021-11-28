const fs=require('fs');

fs.unlink('./test.txt',err=>{
    if(err){
        console.log(err)
    }
});