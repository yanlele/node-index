// 把观察者放在闭包中，页面加载就执行
class Observer {
    // 消息容器
    constructor() {
        this.__message = {};
    }
    // 注册
    regist(type, fn) {
        // 如果消息不存在，那么创建一个消息
        if (typeof this.__message[type] === 'undefined') {
            // 动作推送到消息对应的动作执行队列中
            this.__message[type] = [fn];
        } else {    // 消息已经存在
            this.__message[type].push(fn);
        }
    }
    // 发布
    fire(type, args) {
        // 如果该消息没有被注册，就直接返回
        if (!this.__message[type]) return;
        // 定义消息消息
        let events = {
                type,                           // 消息类型
                args: args || {}                // 消息携带的数据
            },
            i = 0,                          // 消息动作循环变量
            len = this.__message[type].length;   // 消息动作长度
        for (; i < len; i++) {
            // 依次执行注册信息对应的动作序列
            this.__message[type][i].call(this, events);
        }
    }
    remove(type, fn) {
        // 如果消息队列存在
        if (this.__message[type] instanceof Array) {
            // 从最后一个动作反向遍历
            let i = this.__message[type].length - 1;
            for (; i >= 0; i--) {
                // 如果存在就移除相对应的动作
                this.__message[type][i] === fn && this.__message[type].splice(i, 1);
            }
        }
    }
}


module.exports = Observer;