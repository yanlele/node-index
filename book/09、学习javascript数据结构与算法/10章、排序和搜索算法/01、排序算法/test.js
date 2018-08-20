const ArrayList = require('./index');

function createNonSortedArray(size){
    let array = new ArrayList();
    for (let i = size; i> 0; i--){
        array.insert(i);
    }
    return array;
}
let array = createNonSortedArray(5);
console.log(array.toString());
array.bubbleSort();
console.log(array.toString());