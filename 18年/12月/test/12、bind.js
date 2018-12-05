let yanle = {
    name: 'yanle',
    sayHello: function (age) {
        console.log(`hello, i am ${this.name} and ${age} years old`);
    }
};
let lele = {
    name: 'lele'
};


Function.prototype.applyOne = function (context, ...args) {
    context.fn = this;
    context.fn(args);
    delete context.fn;
};

Function.prototype.bindOne = function(obj) {
    let context = this;
    return function (...args) {
        return context.applyOne(obj, args)
    }
};

yanle.sayHello.applyOne(lele, 25);

yanle.sayHello.bindOne(lele)(25);