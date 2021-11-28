/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-28 21:50
 */

let yanle = {
    name: 'yanle',
    sayHello: function (age) {
        console.log(`hello, i am ${this.name} and ${age} years old`);
    }
};
let lele = {
    name: 'lele'
};
yanle.sayHello(26);          // hello, i am yanle and 26 years old

yanle.sayHello.call(lele, 20);
yanle.sayHello.apply(lele, [21]);
