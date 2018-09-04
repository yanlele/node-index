let decorator = function (input, fn) {
    let getInput = document.getElementById(input);
    if(typeof getInput.onclick === 'function') {
        let oldClick = getInput.onclick;
        getInput.onclick = function() {
            // 原来的事件回调函数
            oldClick();
            // 新增的事件回调函数
            fn();
        }
    } else {
        getInput.onclick = fn;
    }
    // 其他事件
};