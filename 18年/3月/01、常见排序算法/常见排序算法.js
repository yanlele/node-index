let arr=[23,34,546,11,22,76,12,44,33,22,5];

// 1:冒泡排序
function dubbleSort(arr){
    let len=arr.length;
    for (let i =0;i<len-1;i++){
        for(let j=0;j<len-1-i;j++){
            let temp=arr[j+1];
            arr[j+1]=arr[j];
            arr[j]=temp;
        }
    }
    return arr;
}

// 2:选择排序
function selectionSort(arr){
    var minIdx, temp,
        len = arr.length;
    for(var i = 0; i < len; i++){
        minIdx = i;
        for(var  j = i+1; j<len; j++){
            if(arr[j]<arr[minIdx]){
                minIdx = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    return arr;
}

// 3:插入排序
function insertionSort(arr){
    var i, len = arr.length, el, j;

    for(i = 1; i<len; i++){
        el = arr[i];
        j = i;

        while(j>0 && arr[j-1]>toInsert){
            arr[j] = arr[j-1];
            j--;
        }

        arr[j] = el;
    }

    return arr;
}

// 4:归并排序

function mergeSort(arr){
    var len = arr.length;
    if(len <2)
        return arr;
    var mid = Math.floor(len/2),
        left = arr.slice(0,mid),
        right =arr.slice(mid);
    //send left and right to the mergeSort to broke it down into pieces
    //then merge those
    return merge(mergeSort(left),mergeSort(right));
}

function merge(left, right){
    var result = [],
        lLen = left.length,
        rLen = right.length,
        l = 0,
        r = 0;
    while(l < lLen && r < rLen){
        if(left[l] < right[r]){
            result.push(left[l++]);
        }
        else{
            result.push(right[r++]);
        }
    }
    //remaining part needs to be addred to the result
    return result.concat(left.slice(l)).concat(right.slice(r));
}

// 5:快排
function quick(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}