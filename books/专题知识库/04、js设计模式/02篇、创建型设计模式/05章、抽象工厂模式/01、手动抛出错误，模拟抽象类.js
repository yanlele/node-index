let Car = function() {};
Car.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用');
    },
    getSpeed() {
        return new Error('抽象方法不能被调用');
    }
};