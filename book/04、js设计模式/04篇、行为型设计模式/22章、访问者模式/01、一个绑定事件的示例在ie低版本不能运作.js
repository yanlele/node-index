/**
 * create by yanlele
 * create time 2018-12-21 20:29
 */

let bindEvent = function (dom, type, fn) {
    if(dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if(dom.attachEvent) {
        dom.attachEvent('on'+ type, fn);
    } else {
        dom['on'+ type] = fn;
    }
};


/**
 * 下面的在IE低版本浏览器运行会有问题
 * 这个地方运行就有问题了，因为this.style 中的this 在低版本IE中，指向的是window对象
 * @type {HTMLElement | null}
 */
let demo = document.getElementById('dome');
bindEvent(demo, 'click', function () {
    this.style.background = 'red';
});


// 低版本IE 绑定的实现
let bindIEEvent = function (dom, type, fn, data) {
    let data = data || {};
    dom.attachEvent('on'+ type, function (e) {
        fn.call(dom, e, data);
    });
};