
class ArrayList {
    constructor() {
        this.array = [];
    }

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