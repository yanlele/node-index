/**
 * create by yanlele
 * create time 2018-11-23 10:05
 */


let arrayNumber = [12, 22, 34, 56, 11, 3, 77, 39, 32];

// 完成
let quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let middleIndex = Math.floor(arr.length / 2);
    let middle = arr.splice(middleIndex, 1)[0];
    let left = [], right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < middle) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middle], quickSort(right))
};
console.log(quickSort(arrayNumber));

let dubbleSort = function (arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};
console.log(dubbleSort(arrayNumber));


let selectionSort = function (arr) {
    let len = arr.length;
    let minIndex, temp;

    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
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