const Alert = require('./01、创建一个基础提示模板');

// 右侧按钮提示框
let RightAlert = function () {
    // 集成基本提示框构造函数
    Alert.call(this, data);
    // 确认按钮添加right类设置位置居右
    this.confirmBtn.className = this.confirmBtn.className + ' right';
};
// 集成基本提示框方法
RightAlert.prototype = new Alert();
