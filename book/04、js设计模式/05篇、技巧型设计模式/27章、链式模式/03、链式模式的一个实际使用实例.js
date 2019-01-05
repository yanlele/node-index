/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2019-01-05 19:30
 */

/*
* sum(1).sum(1,2).sum(3,4).sum(2).sum(2,3,4,5,6,7,8).result()  // 48
* */


class Test {
    constructor() {
        this.resultNumber = 0;
    }
    sum() {
        let args = arguments,
            len = args.length;
        if (len > 0) {
            for (let num of args) {
                this.resultNumber += num;
            }
        }
        return this;
    }
    result() {
        return this.resultNumber;
    }
}

let test = new Test();

let resultNumber = test.sum(1).sum(1, 2).sum(3, 4).sum(2).sum(2, 3, 4, 5, 6, 7, 8).result();
console.log(resultNumber);