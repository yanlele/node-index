
class ArrayList {
    constructor() {
        this.array = [];
    }

    /*排序算法*/
    //冒泡法排序
    bubbleSort() {
        let length = this.array.length;
        for(let i = 0; i < length; i++) {
            for (let j = 0; j < length;j++) {
                if(this.array[j]> this.array[j+1]) {
                    let temp = this.array[j];
                    this.array[j] = this.array[j+1];
                    this.array[j+1] = temp;
                }
            }
        }
    }

    // 改进后的冒泡法排序
    modifiedBubbleSort() {
        let length = this.array.length;
        for(let i = 0; i < length; i++) {
            for (let j = 0; j < length-1-i; j++) {
                if(this.array[j]> this.array[j+1]) {
                    let temp = this.array[j];
                    this.array[j] = this.array[j+1];
                    this.array[j+1] = temp;
                }
            }
        }
    }

    // 选择排序
    selectionSort() {
        let length = this.array.length, indexMin;
        for(let i = 0; i < length -1; i++) {
            indexMin = i;
            for(let j = i; j < length; j++) {
                if(this.array[indexMin] > this.array[j]) {
                    indexMin = j;
                }
            }
            if(i !== indexMin) {
                this.swap(i, indexMin);
            }
        }
    }

    // 插入法排序
    insertionSort() {
        let length = this.array.length, j, temp;
        for(let i = 1; i < length; i++) {
            j = i ;
            temp = this.array[i];
            while (j > 0 && this.array[j -1] > temp) {
                this.array[j] = this.array[j - 1];
                j--;
            }
            this.array[j] = temp;
        }
    }

    // 归并排序
    mergeSort() {
        this.array = this.mergeSortRec(this.array);
    }
    mergeSortRec(array) {
        let length = this.array.length;
        if(length === 1) {
            return this.array;
        }
        let mid = Math.floor(length/2),
            left = this.array.slice(0, mid),
            right = this.array.slice(mid, length);
        return this.merge(this.mergeSortRec(left), this.mergeSortRec(right))
    }
    merge(left, right) {
        let result = [], il = 0, ir = 0;
        while (il < left.length && ir < right.length) {
            if(left[il] < right[ir]) {
                result.push(left[il++]);
            }else {
                result.push(right[ir++]);
            }
        }
        while (il < left.length) {
            result.push(left[il++]);
        }
        while (ir <right.length) {
            result.push(right[ir++]);
        }
        return result;
    }

    //快速排序
    quickSort() {
        this.quick(this.array, 0, this.array.length - 1);
    }
    quick(array, left, right) {
        let index;
        if(array.length > 1) {
            index = this.partition(array, left, right);
            if(left < index -1) {
                this.quick(array, left, index - 1);
            }
            if(index < right) {
                this.quick(array, index, right);
            }
        }
    }
    //划分过程
    partition(array, left, right) {
        let pivot = array[Math.floor((right + left) / 2)], i = left, j = right;
        while (i <= j) {
            while (array[i] < pivot) {
                i++;
            }
            while (array[j] > pivot) {
                j++;
            }
            if(i <= j) {
                this.swapQuickStort(array, i, j);
                i++;
                j++;
            }
        }
        return i;
    }
    swapQuickStort(array, index1, index2) {
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }

    /*搜索算法*/
    // 顺序搜索法
    sequentialSearch(item) {
        for(let i = 0; i < this.array.length, i++) {
            if(item === this.array[i]) {
                return i;
            }
        }
        return -1;
    }

    /*辅助函数方法*/
    swap(index1, index2) {
        let temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }


    insert(item) {
        this.array.push(item);
    }

    toString() {
        return this.array.join();
    }
}

module.exports = ArrayList;