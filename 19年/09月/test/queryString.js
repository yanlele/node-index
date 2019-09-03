/**
 * create by yanle
 * create time 2019-09-04 00:17
 */

const { parse } = require('querystring');

const str = '?name=yanle';
console.log(parse(str.slice(1)));

