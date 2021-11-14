//es6 模块语法
import sum from './sum';

//commonjs模块语法
let minus = require('./minus');

// amd
require(['./muti'], function (muti) {
    console.log('muti(2, 3) = ', muti(2, 3));
});

console.log('sum(23, 34) = ', sum(23, 24));
console.log('minus(24, 17) = ', minus(24, 17));