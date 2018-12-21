/**
 * create by yanlele
 * create time 2018-12-21 17:32
 */



let arr = [{
    name: 'yanle',
    age: 25
}, {
    name: 'yanle',
    age: 26
}, {
    name: 'lele3',
    age: 25
}];

let arr2 = [
    {
        name: 'lele',
        age: 25
    },
    {
        name: 'lele2',
        age: 26
    }
];

let newArr = Object.assign([], arr, arr2);
console.log(newArr);