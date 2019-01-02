/**
 * create by yanle
 * create time 2019/1/2 下午4:46
 */

class Mediator {
    constructor() {
        // 消息对象
        this._msg = {};
    }

    /**
     * 订阅消息方法
     * @param type  消息名称
     * @param action    消息回到函数
     */
    register(type, action) {
        // 如果消息存在
        if(this._msg[type]) {
            // 存入
            this._msg[type].push(action)
        } else {
            // 消息不存在, 创建容器
            this._msg[type] = [];
            this._msg[type].push(action)
        }
    }

    /**
     * 发布消息的方法
     * @param type  发布消息的名称
     */
    send(type) {
        if(this._msg[type]) {
            for (let actionKey in this._msg[type]) {
                // 执行回调函数
                this._msg[type] && this._msg[type][actionKey]();
            }
        }
    }
}

module.exports = Mediator;

let mediator = new Mediator();
mediator.register('demo', function () {
    console.log('first');
});
mediator.register('demo', function () {
    console.log('second')
});

mediator.send('demo');  // 分别输出first, second


