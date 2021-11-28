const fs=require('fs');

fs.readFile('./README.md','utf-8',(err,data)=>{
   if(err){
       throw err;
   } else{
       console.log(data)
   }
});