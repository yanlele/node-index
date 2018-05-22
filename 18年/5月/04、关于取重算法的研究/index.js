let arr = [1, 1, 2, 2, 3, 4, 5, 5, 4, 4, 4, 4];

//去重算法
let newArr = [];
arr.map(function (item, index, list) {
    if (newArr.indexOf(item) === -1) {
        //表明没有这个数据
        newArr.push(item)
    }
});
console.log(newArr);

