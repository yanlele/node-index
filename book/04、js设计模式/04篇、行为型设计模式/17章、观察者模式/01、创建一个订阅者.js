// 把观察者放在闭包中，页面加载就执行
let Observer = (function () {
    // 消息容器
    let __message = {};
    return {
        // 注册
        regist: function(type, fn){
            // 如果消息不存在，那么创建一个消息
            if(typeof __message[type] === 'undefined') {
                // 动作推送到消息对应的动作执行队列中
                __message[type] = [fn];
            } else {    // 消息已经存在
                __message.push(fn);
            }
        },
        // 发布
        fire: function(type, args){
            // 如果该消息没有被注册，就直接返回
            if(!__message[type]) return;
            // 定义消息消息
            let events = {
                type,                           // 消息类型
                args: args || {}                // 消息携带的数据
            },
                i = 0,                          // 消息动作循环变量
                len = __message[type].length;   // 消息动作长度
            for (; i <len;i++) {
                // 依次执行注册信息对应的动作序列
                __message[type][i].call(this, events);
            }
        },
        // 移除消息
        remove: function(type, fn){
            // 如果消息队列存在
            if(__message[type] instanceof Array) {
                // 从最后一个动作反向遍历
                let i = __message[type].length - 1;
                for(; i >= 0;i--) {
                    // 如果存在就移除相对应的动作
                    __message[type][i] === fn && __message[type].splice(i, 1);
                }
            }
        }
    }
})();

// 订阅一个信息
Observer.regist('test', function (e) {
    console.log(e.type, e.args.message)
});

// 发布一个信息
Observer.fire('test', {
    message: '传递的参数'
});