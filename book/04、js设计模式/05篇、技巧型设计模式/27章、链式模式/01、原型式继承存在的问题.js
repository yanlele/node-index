/**
 * create by yanle
 * create time 2019/1/4 下午3:23
 */

// let A = function(){};
// A.prototype = {
//     length: 2,
//     size: function () {
//         return this.length;
//     }
// };
//
// let a = new A();
// console.log(a.size());          // 2
//
// console.log(A.size());      // 报错， 因为A本身上并没有size()
// console.log(A().size());    // 报错， 因为没有返回值

/*第一步优化*/
// let A = function() {
//     return B
// };
//
// let B = A.prototype = {
//     length: 2,
//     size: function () {
//         return this.length
//     }
// };
// console.log(A().size());    // 2

/*
* 而在jQuery中， 为了减少变量的创建， 索性直接将B 对象看做是A 的一个属性
* */
// let A = function () {
//     return A.fn
// };
// A.fn = A.prototype = {};

/*将init方法获取到的元素在A方法中返回*/
// let A = function (selector) {
//     return A.fn.init(selector)
// };
// A.fn = A.prototype = {
//     init: function (selector) {
//         return document.getElementById(selector)
//     },
//     length: 2,
//     size: function () {
//         return this.length;
//     }
// };


