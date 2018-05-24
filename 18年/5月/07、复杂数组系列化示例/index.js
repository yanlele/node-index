let arr = ['123-yanle', '234-lele', '345-yanlele'];

console.log(arr);

let newArray = [];
arr.map(function(item, index) {
     newArray.push(item.split('-')[1]);
});
console.log(newArray.join(' | '));
