const {get} = require('lodash');

const arr = ['11-yafnlakdlfjafdb', '22=dlkjavjkaldfbja', '33=sdkjalfjkbalfa', '44=dakjblfadkjblafb'];

console.log(get(arr, '[0]'));
console.log(get(arr, '0'));
console.log(get(arr, 0));
