const { set } = require('lodash');

const data = {};

set(data, 'name[0].a.b.c.d', 'yanle');
set(data, 'name[0].a.b.e', 27)

const resultData = JSON.stringify(data, undefined, 2);
console.log(resultData);
