let Observer = require('./01、创建一个订阅者');
let observer = new Observer();

// 外观模式 简化获取元素
function $(id) {
    return document.getElementById(id);
}
//工程师 A
(function() {
    // 追加一则信息
    function addMsgItem(e) {
        let text = e.args.text,                     // 获取信息中用户添加的文本内容
            ul = $('msg'),                          // 留言容器元素
            li = document.createElement('li'),      // 创建内容容器元素
            span = document.createElement('span');  // 删除按钮
        li.innerHTML = text;

        // 关闭按钮
        span.onclick = function () {
            ul.removeChild(li);
            // 发布删除留言信息
            observer.fire('removeCommentMessage', {
                num: -1
            });
        };
        // 添加删除按钮
        li.appendChild(span);
        // 添加留言节点
        ul.appendChild(li);
    }
    // 注册添加评论信息
    observer.regist('addCommentMessage', addMsgItem);
})();

// 工程师B
(function () {
    function changeMsgNum(e) {
        // 获取需要增加的用户信息数目
        let num = e.args.num;
        // 增加用户消息数目并写入页面
        $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num;
    }
    // 注册添加评论信息
    observer.regist('addCommentMessage', changeMsgNum);
    observer.regist('removeCommentMessage', changeMsgNum);
})();

// 工程师C 提交信息
(function () {
    $('user_submit').onclick = function () {
        // 获取用户输入
        let text = $('user_input');
        if(text.value === '') return;
        // 发布一则评论信息
        observer.fire('addCommentMessage', {
            text: text.value,
            num: 1
        });
        text.value = ''
    }
})();



