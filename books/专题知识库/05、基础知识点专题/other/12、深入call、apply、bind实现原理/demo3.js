Function.prototype.applyTwo = function(context) {
    var args = arguments[1]; //获取传入的数组参数
    context.fn = this; //假想context对象预先不存在名为fn的属性
    var fnStr = 'context.fn(';
    for (var i = 0; i < args.length; i++) {
        fnStr += i == args.length - 1 ? args[i] : args[i] + ',';
    }
    fnStr += ')';//得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    eval(fnStr); //还是eval强大
    delete context.fn; //执行完毕之后删除这个属性
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