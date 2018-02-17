const fs=require('fs');

fs.readdir('./',(err,files)=>{
    if(err){
        throw err;
    }

    console.log(files)
});