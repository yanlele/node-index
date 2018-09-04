// 寄生式继承
function inheritPrototype(subClass, superClass) {
    // 复制一份父类的原型副本保存在变量中
    let p = inheritObject(superClass.prototype);
    //修正因为重写子类原型导致子类的constuctor属性被修改
    p.constructor = subClass;
    // 设置子类的原型
    subClass.prototype = p;
}

// 原型式继承
function inheritObject(o) {
    // 申明一个过渡函数对象
    function F(){}

    // 过渡兑现过的原型继承父类对象
    F.prototype = o;
    // 返回过渡对象的一个示例，该示例的原型继承了父类对象
    return new F();
}

module.exports = inheritPrototype;