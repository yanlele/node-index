let obj = {
    name: 'yanle',
    age: 27,
    address: 'chongqing'
};


for (let [key, value] of Object.entries(obj)) {
    // console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]

    console.log([key]);
}

// console.log(Object.entries(obj));