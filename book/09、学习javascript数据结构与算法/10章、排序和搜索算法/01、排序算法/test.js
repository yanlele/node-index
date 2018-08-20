const ArrayList = require('./index');

function createNonSortedArray(size){
    let array = new ArrayList();
    for (let i = size; i> 0; i--){
        array.insert(i);
    }
    return array;
}
console.log('======================== 下面是冒泡排序');
let array = createNonSortedArray(5);
console.log(array.toString());
array.bubbleSort();
console.log(array.toString());

console.log('======================== 下面是选择排序');
array = createNonSortedArray(5);
console.log(array.toString());
array.selectionSort();
console.log(array.toString());