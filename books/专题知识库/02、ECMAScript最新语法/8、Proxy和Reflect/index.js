/*get操作*/
/*
//get();

let person = {
    name: 'yanle'
};

let proxy = new Proxy(person, {
    get(target, property) {
        if(property in target){
            return console.log(target[property])
        }else{
            throw new Error
        }
    }
});

proxy.name;//   'yanle'
proxy.age;//    抛出错误*/


/*//实例2：实现数组读取负数的索引
function createArray(...elements){
    let handler={
        get(target,propKey,receiver){
            let index=Number(propKey);
            if(index<0){
                propKey=String(target.length+index)
            }
            return Reflect.get(target,propKey,receiver);
        }
    };

    let target=[];
    target.push(...elements);
    return new Proxy(target,handler);
}

let arr=createArray('a','b','c');
console.log(arr[-1]);//结果为c*/


/*//实例3:转变执行某个函数，从而实现属性的链式操作
var pipe = (function () {
    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({} , {
            get : function (pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    },value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });
        return oproxy;
    }
}());
var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get; // 63*/



/*
//实例4：实现一个生成各种DOM节点的通用函数
const dom = new Proxy({}, {
    get(target, property) {
        return function(attrs = {}, ...children) {
            const el = document.createElement(property);
            for (let prop of Object.keys(attrs)) {
                el.setAttribute(prop, attrs[prop]);
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
});
const el = dom.div({},
    'Hello, my name is ',
    dom.a({href: '//example.com'}, 'Mark'),
    '. I like:',
    dom.ul({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '…actually that\'s it')
    )
);
document.body.appendChild(el);*/



/*set操作*/
/*
//实例1：赛选一个age 不大于两百的整数
let  validator={
    set:function(obj,prop,value){
        if(prop==='age'){
            if(!Number.isInteger(value)){
                throw new Error;
            }

            if(value>200){
                throw new RangeError('年龄不能大于200');
            }
        }
        //对于age 以外的属性，直接保存
        obj[prop]=value;
    }
};

let person=new Proxy({},validator);
person.age=300;*/

/*//实例2：get和set结合，方式内部属性不被外部改写
var handler={
    get(target,key){
        invariant(key,'get');
        return target[key]
    },
    set(target,key,value){
        invariant(key,'set');
        return true
    }
};

function invariant(key,action){
    if(key[0]==='_'){
        throw new Error('内部属性不允许串改');
    }
}
var target={};
var proxy=new Proxy(target,handler);
proxy.name='yanle';*/



/*apply()*/
/*//基本语法
var handler = {
    apply (target, ctx, args) {
        return Reflect.apply(...arguments);
    }
};*/

/*
//实例1：基本上会用
var target=function(){
    return '我是一个目标'
};

var handler={
    apply(){
        return '我是一个proxy'
    }
};
var p =new Proxy(target,handler);

console.log(p());//我是一个proxy
*/

/*has()*/
/*//实例1：下面的例子使用has方法隐藏某些属性，不被in运算符发现。
var handler = {
    has (target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy) // false*/

/*construct*/
/*//基础语法
var handler = {
    construct (target, args, newTarget) {
        return new target(...args);
    }
};*/

/*//实例 1：
var p = new Proxy(function() {}, {
    construct: function(target, args) {
        console.log('called: ' + args.join(', '));
        return { value: args[0] * 10 };
    }
});
new p(1).value
// "called: 1"
// 10*/

/*//实例2:construct方法返回的必须是一个对象，否则会报错。
var p = new Proxy(function() {}, {
    construct: function(target, argumentsList) {
        return 1;
    }
});
new p() //  报错*/


/*defineProperty*/
/*//实例1：基本使用
var handler = {
    defineProperty (target, key, descriptor) {
        return false;
    }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar'
// TypeError: proxy defineProperty handler returned false for property '"foo"'*/


/*ownKeys()*/
/*//实例1：拦截第一个字符为下划线的属性名。
let target={
    _bar: 'foo',
    _prop: 'bar',
    prop: 'baz'
};

let handler={
    ownKeys(target){
        return Reflect.ownKeys(target).filter(key=>key[0]!=='_');
    }
};

let proxy=new Proxy(target,handler);
for(let key of Object.keys(proxy)){
    console.log(target[key])
};//结果  'baz'*/


/*3、Proxy.revocable()*/
/*let target={};
let handler={};
let {proxy,revoke}=Proxy.revocable(target,handler);

proxy.foo=123;
console.log(proxy);

revoke();//执行了次函数，就终止了proxy

proxy.foo;//报错*/


