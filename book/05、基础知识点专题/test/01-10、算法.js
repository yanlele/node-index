/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-27 23:18
 */

let arrNumber = [11,5, 23, 4,43, 6, 7, 88, 77, 66];
let quickSort = function(arr) {
    if (arr.length <= 1) { return arr; }
    let pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
    let pivot = arr.splice(pivotIndex, 1)[0];  //基准数   splice 会改改变源数组！！！！！！！！
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
};
console.log(quickSort(arrNumber.slice(0)));

function selectionSort(arr) {
    let len = arr.length;
    let minIndex, temp;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
console.log(selectionSort(arrNumber));


function insertionSort(arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}
console.log(insertionSort(arrNumber));



function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                let temp = arr[j+1];        // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
console.log(bubbleSort(arrNumber));
