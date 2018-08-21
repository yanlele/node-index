function createPop(type, text) {
    let o = new Object();
    o.content = text;
    o.show = function() {
        // 显示方法
    };

    if(type === 'alert') {
        // 警告框差异部分
    }
    if(type === 'prompt') {
        // 提示框差异部分
    }
    if(type === 'confirm') {
        //确认框差异部分
    }
    return o;
}
let userNameAlert = createPop('alert', '用户名只能是26个字母和数字');