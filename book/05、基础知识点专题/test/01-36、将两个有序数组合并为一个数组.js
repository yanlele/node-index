/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-01 22:31
 */

let merge = function (left, right) {
    let leftIndex = 0, rightIndex = 0;
    let result = [];
    let leftLen = left.length;
    let rightLen  = right.length;
    let diffIndex = leftLen - rightLen;
    let connectList;
    if(diffIndex > 0) {
        connectList = left.slice(rightLen);
    } else {
        connectList = right.slice(leftLen);
    }
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++])
        } else {
            result.push(right[rightIndex++])
        }
    }
    // console.log(result);
    result = result.concat(connectList);
    return result;
};

let left = [1, 4, 7, 8, 9, 10];
let right = [2, 5];
console.log(merge(left, right));