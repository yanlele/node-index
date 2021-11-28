const path=require('path');

console.log(path.sep);
console.log(`win32 : ${path.win32.sep}`)


console.log(`path: ${process.env.PATH}`);
console.log(`delimiter ${path.delimiter}`);
console.log(`delimiter ${path.win32.delimiter}`);


