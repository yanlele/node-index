/**
 * create by yanle
 * create time 2019/1/4 下午4:13
 */

/*
* 我们要达到jQuery类似的这种设计， 最后在init中返回的应该是this
* 但是还想获取元素， 这个时候就可以通过this对象将元素设置成为当前对象的一个属性
* 可以通过数组那样访问， 就可以将他们的属性值顺序设置为数字索引
* */
// let A = function (selector) {
//     return A.fn.init(selector)
// };
// A.fn = A.prototype = {
//     init: function(selector) {
//         this[0] = document.getElementById(selector);
//         this.length = 1;
//         return this;
//     },
//     length: 2,
//     size: function () {
//         return this.length;
//     }
// };
// let demo = A('demo');
// console.log(demo);
// console.log(demo.size());

/*
* 依然存在的问题： 如果重新获取一个id 为 test 的元素， 那么之前获取的demo元素就被覆盖了
* 接下来是一个丰富元素的获取
* */
let A = function (selector, context) {
    return new A.fn.init(selector, context)
};
A.fn = A.prototype = {
    constructor: A,
    init: function (selector, context = document) {
        this.length = 0;
        // 如果是ID选择符， 按位非将-1转为0， 转为布尔值false
        if (~selector.indexOf('#')) {
            // 截取id并选择
            this[0] = document.getElementById(selector.slice(1));
            this.length = 1;
        } else {
            let doms = context.getElementsByTagName(selector),
                i = 0,
                len = doms.length;
            for (; i < len; i++) {
                // 压入 this 中
                this[i] = doms[i];
            }
            // 矫正长度
            this.length = len;
        }
        // 保存上下文
        this.context = context;
        // 保存选择符
        this.selector = selector;
        return this;
    }
};

/*添加一个方法的扩展*/
A.extend = A.fn.extend = function () {
    let i = 1,              // 扩展对象从第二个参数算起
        len = arguments.length,         // 获取参数长度
        target = arguments[0],          // 第一个参数作为原对象
        j;                              // 拓展对象中的属性
    if(i === len) {
        // target = this;
        i--;
    }
    for (; i < len; i++) {
        for (j in arguments[i]) {
            target[j] = arguments[i][j];
        }
    }
    return target;
};

let demo = A.extend({first: 1});
console.log(demo);

// 扩展 A.fn 方式1
A.extend(A.fn, {version: '1.0'});
console.log(A('demo').version);

// 扩展 A.fn 方式2
A.fn.extend({
    getVersion: function () {
        return this.version
    }
});
console.log(A('demo').getVersion());

// 扩展 A 方式1
A.extend(A, {author: 'yanle'});
console.log(A.author);

// 扩展 A 方式2
A.extend({nickName: 'yanlele'});
console.log(A.nickName);