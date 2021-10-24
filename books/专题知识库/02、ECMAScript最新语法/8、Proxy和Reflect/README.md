# Proxy 和 Reflect

<!-- toc -->

- [1、概述](#1%E6%A6%82%E8%BF%B0)
- [2、Proxy 实例的方法](#2proxy-%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%96%B9%E6%B3%95)
  * [2.1、get()](#21get)
  * [2.2、set()](#22set)
  * [2.3、apply();](#23apply)
  * [2.4、has()](#24has)
  * [2.5、construct()](#25construct)
  * [2.6、deleteProperty()](#26deleteproperty)
  * [2.7、defineProperty()](#27defineproperty)
  * [2.8、getOwnPropertyDescriptor()](#28getownpropertydescriptor)
  * [2.9、getPrototypeOf()](#29getprototypeof)
  * [2.10、isExtensible()](#210isextensible)
  * [2.11、ownKeys()](#211ownkeys)
  * [2.12、preventExtensions()](#212preventextensions)
  * [2.13、setPrototypeOf()](#213setprototypeof)
- [3、Proxy.revocable()](#3proxyrevocable)
- [4、Reflect概述 （有点儿深）](#4reflect%E6%A6%82%E8%BF%B0----%E6%9C%89%E7%82%B9%E5%84%BF%E6%B7%B1)
- [5 Reflect 对象的方法](#5-reflect-%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%96%B9%E6%B3%95)

<!-- tocstop -->

### 1、概述            
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种 “ 元编程 ” （ meta programming ），即对编程语言进行编程。                
Proxy 可以理解成，在目标对象之前架设一层 “ 拦截 ” ，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。 Proxy 这个词的原意是代理，用在这里表示由它来 “ 代理 ” 某些操作，可以译为“ 代理器 ”。              
实例1:            
```javascript
    var obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log(`getting ${key}!`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`setting ${key}!`);
            return Reflect.set(target, key, value, receiver);
        }
    });
```

上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。这里暂时先不解释具体的语法，只看运行结果。对设置了拦截行为的对象obj，去读写它的属性，就会得到下面的结果。           
```javascript
    obj.count = 1
    // setting count!
    ++obj.count
    // getting count!
    // setting count!
    // 2
```
        
ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。              
语法：var proxy = new Proxy(target, handler);              
实例2：Proxy 实例也可以作为其他对象的原型对象。             
```javascript
    var proxy = new Proxy({}, {
        get: function(target, property) {
            return 35;
        }
    });
    let obj = Object.create(proxy);
    obj.time // 35
```

实例3：同一个拦截器函数，可以设置拦截多个操作。            
```javascript
    var handler = {
        get: function(target, name) {
            if (name === 'prototype') {
                return Object.prototype;
            }
            return 'Hello, ' + name;
        },
        apply: function(target, thisBinding, args) {
            return args[0];
        },
        construct: function(target, args) {
            return {value: args[1]};
        }
    };
    var fproxy = new Proxy(function(x, y) {
        return x + y;
    }, handler);
    fproxy(1, 2) // 1
    new fproxy(1,2) // {value: 2}
    fproxy.prototype === Object.prototype // true
    fproxy.foo // "Hello, foo"
```             
对于可以设置、但没有设置拦截的操作，则直接落在目标对象上，按照原先的方式产生结果。               


（ 1 ） get(target, propKey, receiver)            
拦截对象属性的读取，比如proxy.foo和proxy['foo']。         
最后一个参数receiver是一个对象，可选，参见下面Reflect.get的部分。          

（ 2 ） set(target, propKey, value, receiver)         
拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。     
    
（ 3 ） has(target, propKey)          
拦截propKey in proxy的操作，以及对象的hasOwnProperty方法，返回一个布尔值。   
         
（ 4 ） deleteProperty(target, propKey)           
拦截delete proxy[propKey]的操作，返回一个布尔值。         

（ 5 ） ownKeys(target)           
拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回对象所有自身的属性，而Object.keys()仅返回对象可遍历的属性。         

（ 6 ） getOwnPropertyDescriptor(target, propKey)         
拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。            

（ 7 ） defineProperty(target, propKey, propDesc)         
拦截Object.defineProperty(proxy, propKey, propDesc ） 、Object.defineProperties(proxy, propDescs)，返回一个布尔值。          

（ 8 ） preventExtensions(target)         
拦截Object.preventExtensions(proxy)，返回一个布尔值。          

（ 9 ） getPrototypeOf(target)            
拦截Object.getPrototypeOf(proxy)，返回一个对象。          

（ 10 ） isExtensible(target)         
拦截Object.isExtensible(proxy)，返回一个布尔值。           

（ 11 ） setPrototypeOf(target, proto)            
拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。          
如果目标对象是函数，那么还有两种额外操作可以拦截。           

（ 12 ） apply(target, object, args)          
拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。         

（ 13 ） construct(target, args)          
拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。            


### 2、Proxy 实例的方法           
#### 2.1、get()          
get方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦截读取操作的例子。           
实例1：基本使用            
```javascript
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
    proxy.age;//    抛出错误
```

```javascript
    //实例2：实现数组读取负数的索引
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
    console.log(arr[-1]);//结果为c
```

```javascript
    //实例3:转变执行某个函数，从而实现属性的链式操作
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
    pipe(3).double.pow.reverseInt.get; // 63
```

```javascript
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
    document.body.appendChild(el);
```

#### 2.2、set()      
set方法用来拦截某个属性的赋值操作。         
```javascript
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
    person.age=300;
```

```javascript
    //实例2：get和set结合，方式内部属性不被外部改写
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
    proxy.name='yanle';
```

#### 2.3、apply();            
apply方法拦截函数的调用、 call 和 apply 操作。            
```javascript
    //基本语法
    var handler = {
        apply (target, ctx, args) {
            return Reflect.apply(...arguments);
        }
    };
```
apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

```javascript
    //实例1：基本使用
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
```

#### 2.4、has()           
has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in算符。          
```javascript
    //实例1：下面的例子使用has方法隐藏某些属性，不被in运算符发现。
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
    console.log('_prop' in proxy) // false
```
如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false，从而不会被in运算符发现。                
has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。由于for...in操作内部也会用到HasProperty操作，所以has方法在for...in循环时也会生效。               


#### 2.5、construct()             
construct方法用于拦截new命令，下面是拦截对象的写法。        
基础语法：           
```javascript
    var handler = {
        construct (target, args, newTarget) {
            return new target(...args);
        }
    };
```
construct方法可以接受两个参数。target :  目标对象，args：构建函数的参数对象

```javascript
    //实例 1：基本使用
    var p = new Proxy(function() {}, {
        construct: function(target, args) {
            console.log('called: ' + args.join(', '));
            return { value: args[0] * 10 };
        }
    });
    new p(1).value
    // "called: 1"
    // 10
```


```javascript
    //实例2:construct方法返回的必须是一个对象，否则会报错。
    var p = new Proxy(function() {}, {
        construct: function(target, argumentsList) {
            return 1;
        }
    });
    new p() //  报错
```


#### 2.6、deleteProperty()
deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。


#### 2.7、defineProperty()       
defineProperty方法拦截了Object.defineProperty操作。         
```javascript
    //实例1：基本使用
    var handler = {
        defineProperty (target, key, descriptor) {
            return false;
        }
    };
    var target = {};
    var proxy = new Proxy(target, handler);
    proxy.foo = 'bar'
    // TypeError: proxy defineProperty handler returned false for property '"foo"'
```


#### 2.8、getOwnPropertyDescriptor()         
getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor，返回一个属性描述对象或者undefined。              

#### 2.9、getPrototypeOf()           
getPrototypeOf方法主要用来拦截Object.getPrototypeOf()运算符，以及其他一些操作。              

#### 2.10、isExtensible()            
isExtensible方法拦截Object.isExtensible操作。          


#### 2.11、ownKeys()         
ownKeys方法用来拦截Object.keys()操作。           
```javascript
    //实例1：拦截第一个字符为下划线的属性名。
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
    };//结果  'baz'
```

#### 2.12、preventExtensions()       
preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值。               
这个方法有一个限制，只有当Object.isExtensible(proxy)为false（即不可扩展）时，proxy.preventExtensions才能返回true，否则会报错。                


#### 2.13、setPrototypeOf()          
setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。              

### 3、Proxy.revocable()         
Proxy.revocable 方法返回一个可取消的 Proxy 实例。            
实例：Proxy.revocable方法返回一个对象，该对象的proxy属性是Proxy实例，revoke属性是一个函数，可以取消Proxy实例。上面代码中，当执行revoke函数之后，再访问Proxy实例，就会抛出一个错误。           
```javascript
    let target={};
    let handler={};
    let {proxy,revoke}=Proxy.revocable(target,handler);
    
    proxy.foo=123;
    console.log(proxy);
    
    revoke();//执行了次函数，就终止了proxy
    proxy.foo;//报错
```

### 4、Reflect概述    （有点儿深）       
Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API 。            


### 5 Reflect 对象的方法         
Reflect对象的方法清单如下，共 13 个。            


Reflect.apply(target,thisArg,args)          
Reflect.construct(target,args)          
Reflect.get(target,name,receiver)           
Reflect.set(target,name,value,receiver)         
Reflect.defineProperty(target,name,desc)            
Reflect.deleteProperty(target,name)         
Reflect.has(target,name)            
Reflect.ownKeys(target)         
Reflect.isExtensible(target)            
Reflect.preventExtensions(target)           
Reflect.getOwnPropertyDescriptor(target, name)          
Reflect.getPrototypeOf(target)          
Reflect.setPrototypeOf(target, prototype)        


[其他相关概念可以看这里 传送门->](../../../../book/05、基础知识点专题/01_02、基础知识部分11-20.md#class01-15)










