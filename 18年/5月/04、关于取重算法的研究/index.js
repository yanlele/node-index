let arr = [];
for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 10))
}

let newArr = [1,1,2,2,3,4,5,5,4,4,4,4];

newArr.map(function (item, index, list) {
    list.map(function(listItem, listIndex) {
        if(listIndex > index && item === listItem) {
            console.log(item)
        }
    })
});