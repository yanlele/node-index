let data = {
    name: 'yanle',
    age: 25,
    address: '重庆',
    city: 'chongqing',
    id: '123123123'
};

let {name, ...send} = data;

console.log(name);
console.log(send);