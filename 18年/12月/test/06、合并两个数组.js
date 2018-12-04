let merge = function (left, right) {

    let leftIndex = 0,
        rightIndex = 0,
        resultList = [],
        diff = left.length - right.length;
    let connectList = [];
    if(diff > 0) {
        connectList = left.slice(right.length);
    } else {
        connectList = right.slice(left.length);
    }
    while(leftIndex < left.length && rightIndex < right.length) {
        if(left[leftIndex] < right[rightIndex]) {
            resultList.push(left[leftIndex++])
        } else {
            resultList.push(right[rightIndex++])
        }
    }
    resultList = resultList.concat(connectList);

    return resultList;
};

let left = [1, 4, 7, 8, 9, 10];
let right = [2, 5];
console.log(merge(left, right));