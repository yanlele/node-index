//原生JavaScript封装apply方法，第三版
Function.prototype.applyThree = function(context) {
    var context = context || window
    var args = arguments[1] //获取传入的数组参数
    context.fn = this //假想context对象预先不存在名为fn的属性
    if (args == void 0) { //没有传入参数直接执行
        return context.fn()
    }
    var fnStr = 'context.fn('
    for (var i = 0; i < args.length; i++) {
        //得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'
    var returnValue = eval(fnStr) //还是eval强大
    delete context.fn //执行完毕之后删除这个属性
    return returnValue
}
//测试一下
var jawil = {
    name: "jawil",
    sayHello: function (age) {
        console.log(this.name,age);
    }
};

var  lulin = {
    name: "lulin",
};

jawil.sayHello.applyTwo(lulin,[24])//lulin 24