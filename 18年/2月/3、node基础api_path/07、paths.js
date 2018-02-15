const path=require('path');

console.log(`__diername ${__dirname}`);
console.log(`process.cwd() ${process.cwd()}`);

//相对路径
console.log(`./     ${path.resolve('./')}`)

