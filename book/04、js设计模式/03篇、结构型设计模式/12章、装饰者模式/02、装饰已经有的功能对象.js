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

/*调用*/
// 电话输入框功能装饰
decorator('tel_input', function() {
    document.getElementById('tel_demo_text').sytle.display = 'none'
});
// 姓名输入框装饰
decorator('name_input', function() {
    document.getElementById('name_demo_text').sytle.display = 'none'
});
// 地址输入框装饰
decorator('address_input', function() {
    document.getElementById('address_demo_text').sytle.display = 'none'
});
