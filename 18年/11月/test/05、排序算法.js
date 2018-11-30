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
console.log(quickSort(arrayNumber.slice(0)));

/*选择排序*/
let selectionSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let minIndex, temp;
    for (let i = 0; i < arr.length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
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
console.log(selectionSort(arrayNumber.slice(0)));

/*冒泡法排序*/
let bubbleSort = function (arr) {
    let len = arr.length;
    for (let i =0 ; i< len -1; i ++ ) {
        for (let j =0;j<len -1 -i;j++) {
            if(arr[j]> arr[j+1]) {
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};
console.log(bubbleSort(arrayNumber.slice(0)));


/*插入排序*/
let insertSort = function (arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
};
console.log(insertSort(arrayNumber.slice(0)));

