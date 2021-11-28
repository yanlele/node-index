/*每一个成员都要有祖先*/
let News = function () {
    // 子容器
    this.children = [];
    // 单签组件元素
    this.element = null;
};
News.prototype = {
    init: function () {
        throw new Error('请重写方法的具体实现')
    },
    add: function () {
        throw new Error('请重写方法的具体实现')
    },
    getElement: function () {
        throw new Error('请重写方法的具体实现')
    }
};

module.exports = News;