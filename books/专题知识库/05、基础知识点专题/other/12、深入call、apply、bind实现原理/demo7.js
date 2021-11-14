//简单模拟Symbol属性
function jawilSymbol(obj) {
    var unique_proper = "00" + Math.random();
    if (obj.hasOwnProperty(unique_proper)) {
        arguments.callee(obj)//如果obj已经有了这个属性，递归调用，直到没有这个属性
    } else {
        return unique_proper;
    }
}
//原生JavaScript封装apply方法，第五版
Function.prototype.applyFive = function(context) {
    var context = context || window
    var args = arguments[1] //获取传入的数组参数
    var fn = jawilSymbol(context);
    context[fn] = this //假想context对象预先不存在名为fn的属性
    if (args == void 0) { //没有传入参数直接执行
        return context[fn]()
    }
    var fnStr = 'context[fn]('
    for (var i = 0; i < args.length; i++) {
        //得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'
    var returnValue = eval(fnStr) //还是eval强大
    delete context[fn] //执行完毕之后删除这个属性
    return returnValue
}
//简单模拟call函数
Function.prototype.callOne = function(context) {
    return this.applyFive(([].shift.applyFive(arguments)), arguments)
    //巧妙地运用上面已经实现的applyFive函数
}

//简单模拟bind函数
Function.prototype.bind = Function.prototype.bind || function (context) {
    var me = this;
    var args = Array.prototype.slice.callOne(arguments, 1);
    var F = function () {};
    F.prototype = this.prototype;
    var bound = function () {
        var innerArgs = Array.prototype.slice.callOne(arguments);
        var finalArgs = args.concat(innerArgs);
        return me.applyFive(this instanceof F ? this : context || this, finalArgs);
    }
    bound.prototype = new F();
    return bound;
}