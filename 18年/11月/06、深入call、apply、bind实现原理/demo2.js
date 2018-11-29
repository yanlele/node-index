Function.prototype.applyOne = function (context) {
    context.fn = this;
    context.fn();
    delete context.fn;
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

yanle.sayHello.applyOne(lele);              // hello, i am lele and undefined years old