let numberArr = [8,5,3,1,6,2,10,35,12];
numberArr.sort(function(a,b) {
    return a-b;         // 升序
});
console.log(numberArr);


let arr = [
    {
        name: 'byteDunce',
        id: 12
    },
    {
        name: 'yanle1',
        id: 23
    },
    {
        name: 'yanle2',
        id: 12
    },
    {
        name: 'yanlele',
        id: 55
    }
];

arr.sort(function(a, b) {
    return a.id - b.id;
});
console.log(arr);