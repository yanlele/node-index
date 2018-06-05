let data = {
    name: 'yanle',
    age: 26,
    address: 'chongqing'
};

let reData = {};
Object.keys(data).forEach(function( key) {
    if(data[key] !== 26) {
       reData[key] = data[key]
    }
});
console.log(data);
console.log(reData);