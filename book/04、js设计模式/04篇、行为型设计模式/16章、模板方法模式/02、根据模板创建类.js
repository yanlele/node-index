const Alert = require('./01、创建一个基础提示模板');

// 右侧按钮提示框
let RightAlert = function () {
    // 集成基本提示框构造函数
    Alert.call(this, data);
    // 确认按钮添加right类设置位置居右
    this.confirmBtn.className = this.confirmBtn.className + ' right';
};
// 继承基本提示框方法
RightAlert.prototype = new Alert();

// 标题提示框
let TitleAlert = function (data) {
    Alert.call(this);
    this.title = data.title;
    // 创建标题
    this.titleNode = document.createElement('h3');
    this.titleNode.innerHTML = this.title;
};
// 继承基本提示框方法
TitleAlert.prototype = new Alert();
// 对基本提示框方法的扩展
TitleAlert.prototype.init = function () {
    // 插入标题
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    // 继承基本提示框的init
    Alert.prototype.init.call(this);
};

/*模板类还可以作为模板类，继续被继承*/
let CancelAlert = function (data) {
    TitleAlert.call(this);
    // 取消按钮文案
    this.cancel = data.cancel;
    this.cancelBtn = document.createElement('span');
    this.cancelBtn.className = 'cancel';
    this.cancelBtn.innerHTML = this.cancel || '取消'
};
CancelAlert.prototype =new Alert();
CancelAlert.prototype.init = function () {
    // 继承标题提示框创建方法
    TitleAlert.prototype.init.call(this);
    this.panel.appendChild(this.cancelBtn);
};
CancelAlert.prototype.bindEvent = function () {
    let me = this;
    TitleAlert.prototype.bindEvent.call(me);
    // 取消按钮绑定事件
    this.cancelBtn.onclick = function () {
        me.fail();
        me.hide();
    }
};

/*创建一个提示框*/
new CancelAlert({
    title: '提示框标题',
    content: '提示框内容',
    success: function () {
        console.log('ok');
    },
    fail: function () {
        console.log('cancel');
    }
}).init();