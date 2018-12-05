/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-28 21:50
 */

Function.prototype.applyOne = function (context, ...args) {
    context.fn = this;
    context.fn(args);
    delete context.fn;
};


Function.prototype.bindOne = function (obj,...args) {
    let context = this;
    return function () {
        return context.applyOne(obj, args);
    }
};

let yanle = {
    name: 'yanle',
    sayHello: function (age) {
        console.log(`hello, i am ${this.name} and ${age} years old`);
    }
};
let lele = {
    name: 'lele'
};

yanle.sayHello.applyOne(lele, 25);

yanle.sayHello.bindOne(lele, 25)();
