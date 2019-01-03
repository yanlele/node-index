/**
 * create by yanle
 * create time 2019/1/2 下午6:26
 */

class Iterator {
    constructor(items, container) {
        // 父容器， 若 container 参数存在， 并且可以获取该元素则获取， 否则获取document
        this.container = container && document.getElementById(container) || document;
        // 获取元素
        this.items = this.container.getElementsByTagName(items);
        // 元素长度
        this.length = this.items.length;

        // 当前索引值， 默认： 0
        this.index = 0;
        // 缓存源数组splice方法
        this.splice = [].splice();
    }

    first() {
        this.index = 0;
        return this.items[this.index];
    }

    last() {
        this.index = this.length - 1;
        return this.items[this.index];
    }

    pre() {
        if (--this.index > 0) {
            return this.items[this.index];
        } else {
            this.index = 0;
            return null;
        }
    }

    next() {
        if (++this.index < this.length) {
            return this.items[this.index]
        } else {
            this.index = length - 1;
            return null;
        }
    }

    get(num) {
        this.index = num >= 0 ? num % this.length : num % this.length + this.length;
        return this.items[this.index];
    }

    // 对于每一个元素执行某一个方法
    dealEach(fn) {
        // 第二个参数作为回调函数参数
        let args = this.splice.call(arguments, 1);
        for (let item of this.items) {
            fn.apply(item, args);
        }
    }

    // 对某一个元素执行某一个方法
    dealItem(num, fn) {
        fn.apply(this.get(num), this.splice.call(arguments, 2))
    }

    // 排他方式处理某一个元素
    exclusive(nums, allfn, numfn) {
        // 对所有元素执行回调函数
        this.dealEach(allfn);
        // 如果是num类型的数组
        if(Object.prototype.toString.call(nums) === "[object Array]") {
            nums.forEach((num) => {
                this.dealItem(num, numfn)
            })
        } else {
            this.dealItem(nums, numfn)
        }
    }
}


/*
* 比如获取页面中id 为 container 的ul元素中的4个li元素
* */
let demo  = new Iterator('li', 'container');
console.log(demo.first());          // <li>1</li>
console.log(demo.pre());            // null
console.log(demo.next());           // <li>2</li>
console.log(demo.get(2000));        // <li>1</li>

// 处理所有元素
demo.dealEach(function (text, color) {
    this.innerHTML = text;
    this.style.background = color;
}, 'test', 'pink');

// 排他思想处理3，4元素
demo.exclusive([2,3], function () {
    this.innerHTML = '被排除了';
    this.style.background = 'green';
}, function () {
    this.innerHTML = '选中的';
    this.style.background = 'red';
});
