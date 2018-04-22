let arr =  [1, 2, 3, 4, 5, 6, 7, 8, 9, '123'];
console.log(typeof arr);
//遍历方法1
for(let item of arr) {
    if(typeof item !== 'number') {
        console.log(item);
    }
}
console.log('==================');
arr.forEach((item, index, arr) => {
    if(typeof item !== 'number') {
        console.log(item);
        console.log(index);
        console.log(arr);
    }
});