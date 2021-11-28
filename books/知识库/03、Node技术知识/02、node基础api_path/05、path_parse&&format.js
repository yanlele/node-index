const path=require('path');

const filePath='/user/localhost/node_modules/n/package.json';

const ret=path.parse(filePath);
console.log(ret);
console.log(path.format(ret));

