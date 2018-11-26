/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-24 15:21
 */


/*

let reg= /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
let str = '12337487.123';

let newStr =  str.replace(reg, '$1,');
console.log(newStr);*/


let reg = /(\d{1,3})(?=(\d{3})+(?:$|.))/g
let str = '12337487.123';

let newStr =  str.replace(reg, '$1,');
console.log(newStr);