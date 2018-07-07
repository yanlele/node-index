# 关于class类的问题

一个简答的示例：            
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
[请看示例](./01、class的一个示例.js)


一个简单的继承：                


