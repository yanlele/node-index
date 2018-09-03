let A = A || {};
A.g = function (id) {
    return document.getElementById(id);
};
A.on = function (id, type, fn) {
    let dom = typeof id === 'string' ? this.g(id) : id;
    if(dom.addEventListener) {
        dom.addEventListener(type, fn ,false);
    } else if(dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
};

//调用
A.on(window, 'load', function(){
    A.on('myButton', 'click', function () {
        // do something
    })
});

/*用jquery来兼容这个类库*/
A.g = function(id) {
    return $(id).get(0);
};
A.on = function(id, type, fn) {
    let dom = typeof id === 'string' ? $('#' + id) :  $(id);
    dom.on(type, fn);
};