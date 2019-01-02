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
        this.splice = [].splice()
    }
}