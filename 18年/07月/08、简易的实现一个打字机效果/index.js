/**
 * 打字机效果功能
 * @param opts
 * 入参1： element；
 * 入参2： str;
 * 入参3： speed;
 * 入参4： callback;
 */
let index = function (opts) {
    let arr = [];
    for (let i = 0; i < opts.str.length; i++) {
        arr.push(opts.str[i]);
    }
    let text1 = '';
    let num = 0;
    let timer = setInterval(function () {
        if (num < arr.length) {
            text1 += arr[num];
            if (opts.element instanceof jQuery) {
                opts.element.html(text1);
            } else {
                opts.element.innerHTML = text1;
            }
            num++;
        } else {
            clearInterval(timer);
            opts.callback();
        }
    }, opts.speed);
};

module.exports = index;