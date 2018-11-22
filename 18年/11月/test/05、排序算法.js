/**
 * create by yanlele
 * create time 2018-11-22 14:47
 */

let arrayNumber = [12, 22, 34, 56, 11, 3, 77, 39, 32];

/*快速排序*/
let quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];

    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};

console.log(quickSort(arrayNumber));

/*选择排序*/
let selectionSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let minIndex, temp;
    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
};

console.log(selectionSort(arrayNumber));