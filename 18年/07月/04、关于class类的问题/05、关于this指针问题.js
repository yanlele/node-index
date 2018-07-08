class Test {
    constructor(name) {
        this.name = name
    }

    init() {
        this.age = 15;
    }

    getAge() {
        console.log(this.age);
    }
}

let test = new Test('yanle');
test.init();            //如果没有执行init,就没有age这个东西，
test.getAge();          //也就是说没有get,set这个东西，可以直接在任意函数里面改变对象属性