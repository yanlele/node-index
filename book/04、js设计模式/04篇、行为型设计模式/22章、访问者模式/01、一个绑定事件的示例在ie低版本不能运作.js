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

let demo = document.getElementById('dome');
bindEvent(demo, 'click', function () {
    this.style.background = 'red';
});