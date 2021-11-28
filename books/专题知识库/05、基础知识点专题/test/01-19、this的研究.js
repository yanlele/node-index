/*
* 示例一， 就是看一个最普通的this作用域问题
* */

let name = 'yanle';
global.name  = 'yanle';
let func =  function() {
    console.log('my name is ' + this.name)
};

let yanle = {
    age: 25
};

func();

yanle.func = func;
yanle.name = 'yanle';
yanle.func();
// yanle.func.call(null, 'yanle');

console.log('=========');
/*
* 第二个例子
* */
let util = {
    person: {
        name: 'yanle',
        age: 25
    },

    getPerson: function () {
        console.log(this.person)
    },

    getName: function () {
        console.log(this.person.name)
    },

    getAge: function () {
        console.log(this.person.age)
    }
};

util.getPerson();
util.getName();
util.getAge();

let user = {

};

user.getPerson = util.getPerson;
user.getPerson.call();
user.getPerson.call(util);

console.log('===================');

// 场景三
let person  ={
    name: 'yanle',
    getName() {
        console.log(this.name)
    }
};
// person.getName();
setTimeout(person.getName.bind(person), 1000);