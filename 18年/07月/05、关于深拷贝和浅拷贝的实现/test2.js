/**
 * create by yanle
 * create time 2019/1/3 下午2:33
 */


let arr1 = [{
    name: 'yanle',
    age: 25
}, {
    name: 'lele',
    age: 26
}];

let arr2 = arr1.slice(0);
let arr3 = arr1.concat([]);


arr1[1].name = 'yanlele';

console.log(arr2);
console.log(arr3);