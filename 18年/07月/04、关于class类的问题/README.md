# 关于class类的问题

### 一个简答的示例：                                
```javascript
class Test {
    constructor(opts) { //这个是最先执行的; 这个钩子里面可以复制任何变量
        this.name = opts.name;
        this.config = opts.config;
        console.log(123123123123123123);
    }

    init() {
        console.log(this.name);
        console.log(this.config);
        console.log('----------------------');
        this.boot();
    }

    boot() {
        console.log(this.name);
        console.log(this.config);
    }
}

let data = {
    name: 'yanle',
    config: {
        age: 15,
        address: '重庆'
    }
};
let test =new Test(data);

test.init();
```
示例文件请看：[01、class的一个示例](./01、class的一个示例.js)


### 一个简单的继承：                                          
```javascript
class Test {
    constructor(opts) { //这个是最先执行的; 这个钩子里面可以复制任何变量
        this.name = opts.name;
        this.config = opts.config;
        console.log(123123123123123123);
    }

    init() {
        console.log(this.name);
        console.log(this.config);
        console.log('----------------------');
        this.boot();
    }

    boot() {
        console.log(this.name);
        console.log(this.config);
    }
}


class Action extends Test {
    code() {
        console.log(`${this.name} can code`);
    }
}

let data = {
    name: 'yanle',
    config: {
        age: 15,
        address: '重庆'
    }
};

let test = new Test(data);
let action = new Action(data);
action.init();
action.code();

console.log('========================');

test.init();
try {
    test.code();
} catch (e) {
    console.log(`test 对象没有 code方法`);
}
```
示例文件请看：[02、extends](./02、extends.js)


### 一个处理多入参的问题：                                      
```javascript
    class Action {
        constructor(name) {
            this.name = name;
        }

        init(age) {
            const args1 = Array.prototype.slice.call(arguments, 1);
            const args = Array.prototype.slice.call(arguments);
            console.log(args);
            console.log(args1);
            console.log(this.name);
            console.log(age);
        }
    }

    let data = {
        name: 'yanle',
        config: {
            age: 15,
            address: '重庆',
            id: 123123,
            school: 'bilibili'
        }
    };

    let action = new Action(data.name);
    action.init(data.config.age, data.config.address, data.config.id, data.config.school);
```
请看示例： [04、处理多个入参问题](./04、处理多个入参问题.js)


### 一个关于this指针的问题
```javascript
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
```




