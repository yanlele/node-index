/**
 * create by yanlele
 * create time 2018-11-02 12:08
 */

const merge = require('deepmerge');

let obj1 = {
    name: 'address',
    age: 25,
    address: {
        school: 'cqupt'
    }
};

let obj2 = {
    address: {
        house: '重庆',
    },
    work: 'print'
};

let obj = merge( obj1, obj2);

console.log(obj);