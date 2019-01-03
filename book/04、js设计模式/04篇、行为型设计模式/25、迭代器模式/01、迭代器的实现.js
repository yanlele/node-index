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

    dealItem() {

    }

    exclusive() {

    }
}