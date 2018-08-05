//es6 模块与法
import sum from './sum';
let minus = require('./minus');

console.log('sum(23, 34) = ', sum(23, 24));
console.log('minus(24, 17) = ', minus(24, 17));