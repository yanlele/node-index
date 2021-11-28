/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-31 18:10
 */

let Visitor = {
    // 截取方法
    splice: function () {
        // splice 方法参数， 从原来的参数的第二个参数开始计算
        let args = Array.prototype.splice.call(arguments, 1);
        // 对第一个参数对象执行splice 方法
        return Array.prototype.splice.apply(arguments[0], args);
    },

    push: function () {
        let len = arguments[0].length || 0;
        let args = this.splice(arguments, 1);
        arguments[0].length = len + arguments.length - 1;
        return Array.prototype.push.apply(arguments[0], args);
    },

    pop: function () {
        return Array.prototype.pop.apply(arguments[0]);
    }
};


// 这样就可以操作类数组的方式操作对象了
let a = {};
console.log(a.length);          // undefined
Visitor.push(a, 1,2,3,4);
console.log(a.length);          // 4
Visitor.push(a, 4,5,6);
console.log(a);                 // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 4, '5': 5, '6': 6, length: 7 }
console.log(a.length);          // 7
Visitor.pop(a);
console.log(a);                 // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 4, '5': 5, length: 6 }
console.log(a.length);          // 6
Visitor.splice(a, 2);
console.log(a);                 // { '0': 1, '1': 2, length: 2 }