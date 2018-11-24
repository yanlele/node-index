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
    let middleIndex = Math.floor(arr.length / 2 );
    let middle = arr.splice(middleIndex, 1)[0];
    let left = [], right = [];
    for (let i =0;i<arr.length;i++) {
        if (arr[i]< middle) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middle], quickSort(right))
};
console.log(quickSort(arrayNumber));