const fs=require('fs');

fs.watch('./',{
    recursive:true//是否递归监视
},(eventType,filename)=>{
   console.log(eventType,filename)
});