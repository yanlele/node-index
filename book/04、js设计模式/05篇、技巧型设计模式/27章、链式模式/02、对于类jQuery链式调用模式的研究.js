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
    if (i === len) {
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


/*
* 我们想A.fn对象中添加的方法简介的添加到了A.fn.init的原型对象上了。
* 对于此还有继续添加扩展其他的方法
* */
A.fn.extend({
    // 添加事件
    on: function () {
        if (document.addEventListener) {
            return function (type, fn) {
                let i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].addEventListener(type, fn, false);
                }
                return this;
            }
        } else if (document.attachEvent) {
            return function (type, fn) {
                let i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i].addEvent('on' + type, fn);
                }
                return this;
            }
        } else {
            return function (type, fn) {
                let i = this.length - 1;
                for (; i >= 0; i--) {
                    this[i]['on' + type] = fn;
                }
                return this;
            }
        }
    }
});

A.extend({
    // 将 '-' 分割线转为驼峰式： 'border-color' -> 'borderColor'
    camelCase: function (str) {
        return str.replace(/\-(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        })
    }
});
A.extend({
    css: function () {
        let args = arguments,
            len = arg.length;
        if (this.length < 1) {
            return this;
        }
        // 只有一个参数的情况
        if (len === 1) {
            if (typeof args[0] === 'string') {
                // IE
                if (this[0].currentStyle) {
                    return this[0].currentStyle[name];
                } else {
                    return getComputedStyle(this[0], false)[name];
                }
            } else if (typeof args[0] === 'object') {    // 为对象时则设置多个样式
                for (let i in args[0]) {
                    for (let j = this.length - 1; j >= 0; j--) {
                        // 调用拓展方法 camelCase
                        this[j].style[A.camelcase(i)] = args[0][i];
                    }
                }
            }
        } else if (len === 2) {     // 两个参数则设置一个样式
            for (let j = this.length - 1; j >= 0; j--) {
                this[j].style[A.camelCase(args[0])] = args[1];
            }
        }
        return this;
    }
});

A.fn.extend({
    attr: function () {
        let args = arguments,
            len = args.length;
        if (this.length < 1) {
            return this;
        }
        // 如果一个参数的情况
        if (len === 1) {
            if (typeof args[0] === 'string') {
                return this[0].getAddress(args[0]);
            } else if (typeof args[0] === 'object') {        // 多个属性的情况
                for (let i in args[0]) {
                    for (let j = this.length - 1; j >= 0; j--) {
                        this[j].setAttribute(i, arg[0][i]);
                    }
                }
            }
        } else if (len === 2) {          // 两个参数则设置每个元素的单个属性
            for (let j = this.length - 1; j >= 0; j--) {
                this[j].setAttribute(args[0], args[1]);
            }
        }
        return this;
    }
});

A.fn.extend({
    html: function () {
        let args = arguments,
            len = arg.length;
        if (len === 0) {
            return this[0] && this[0].innerHTML;
        } else {
            for (let i = this.length - 1; i >= 0; i--) {
                this[i].innerHTML = args[0]
            }
        }
        return this;
    }
});