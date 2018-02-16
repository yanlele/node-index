const fs=require('fs');

fs.stat('./03、stat.js',(err,stats)=>{
   if(err){
       throw err;
   } else{
       //是否是一个文件夹
       console.log(stats.isDirectory());
       //是否是一个文件
       console.log(stats.isFile());

       //其他信息
       console.log(stats);
   }
});