
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





    insert(item) {
        this.array.push(item);
    }

    toString() {
        return this.array.join();
    }
}