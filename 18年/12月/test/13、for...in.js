let arr = [
    111,222,333,444,555,666,777,888,999
];

let obj = {
    'name': 'yanle',
    'age': 26,
    'address': '重庆'
};

let map = new Map();
// map.set('name', obj.name);

for (let key of arr) {
    console.log(key);
}

/*

for(let [key, value] of Object.entries(obj)) {
    console.log(key);
    console.log(value);
}
*/

for (let [key, value] of map) {
    console.log(key);
    console.log(value)
}

