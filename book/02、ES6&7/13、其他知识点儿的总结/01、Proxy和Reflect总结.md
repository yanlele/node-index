## Proxy 和 Reflect

1、**Proxy**:                  

Proxy(代理) 是 ES6 中新增的一个特性。Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。

使用 Proxy 的好处是：对象只需关注于核心逻辑，一些非核心的逻辑
（如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）可以让 Proxy 来做。
从而达到关注点分离，降级对象复杂度的目的。

**使用方法**                    
`var p = new Proxy(target, handler);`                   
其中，target 为被代理对象。handler 是一个对象，其声明了代理 target 的一些操作。p 是代理后的对象。                           
当外界每次对 p 进行操作时，就会执行 handler 对象上的一些方法。handler 能代理的一些常用的方法如下：                         
get：读取                      
set：修改                      
has：判断对象是否有该属性                      
construct：构造函数                      
...                     

看如下的 demo
```javascript
var target = {
   name: 'obj'
 };
 var logHandler = {
   get: function(target, key) {
     console.log(`${key} 被读取`);
     return target[key];
   },
   set: function(target, key, value) {
     console.log(`${key} 被设置为 ${value}`);
     target[key] = value;
   }
 };
var targetWithLog = new Proxy(target, logHandler);
targetWithLog.name; // 控制台输出：name 被读取
targetWithLog.name = 'others'; // 控制台输出：name 被设置为 others
console.log(target.name); // 控制台输出: others
```
在上面的 demo 中，                    
targetWithLog 读取属性的值时，实际上执行的是 logHandler.get ：在控制台输出信息，并且读取被代理对象 target 的属性。                    
在 targetWithLog 设置属性值时，实际上执行的是 logHandler.set ：在控制台输出信息，并且设置被代理对象 target 的属性的值。                 


**实现虚拟属性**                  
```javascript
var person = {
  fisrsName: '张',
  lastName: '小白'
};
var proxyedPerson = new Proxy(person, {
  get: function (target, key) {
    if(key === 'fullName'){
      return [target.fisrsName, target.lastName].join(' ');
    }
    return target[key];
  },
  set: function (target, key, value) {
    if(key === 'fullName'){
      var fullNameInfo = value.split(' ');
      target.fisrsName = fullNameInfo[0];
      target.lastName = fullNameInfo[1];
    } else {
      target[key] = value;
    }
  }
});

console.log('姓:%s, 名:%s, 全名: %s', proxyedPerson.fisrsName, proxyedPerson.lastName, proxyedPerson.fullName);// 姓:张, 名:小白, 全名: 张 小白
proxyedPerson.fullName = '李 小露';
console.log('姓:%s, 名:%s, 全名: %s', proxyedPerson.fisrsName, proxyedPerson.lastName, proxyedPerson.fullName);// 姓:李, 名:小露, 全名: 李 小露
console.log('**********');
```

**实现私有变量**                  
下面的 demo 实现了真正的私有变量。代理中把以 _ 开头的变量都认为是私有的。                   
```javascript
var api = {
  _secret: 'xxxx',
  _otherSec: 'bbb',
  ver: 'v0.0.1'
};

api = new Proxy(api, {
  get: function(target, key) {
    // 以 _ 下划线开头的都认为是 私有的
    if (key.startsWith('_')) {
      console.log('私有变量不能被访问');
      return false;
    }
    return target[key];
  },
  set: function(target, key, value) {
    if (key.startsWith('_')) {
      console.log('私有变量不能被修改');
      return false;
    }
    target[key] = value;
  },
  has: function(target, key) {
    return key.startsWith('_') ? false : (key in target);
  }
});

api._secret; // 私有变量不能被访问
console.log(api.ver); // v0.0.1
api._otherSec = 3; // 私有变量不能被修改
console.log('_secret' in api); //false
console.log('ver' in api); //true
```

**抽离校验模块**                  
下面的 demo 实现了在代理中实现设置属性值前做验证。                    
感觉用的很少哟。
```javascript
function Animal() {
  return createValidator(this, animalValidator);
}
var animalValidator = {
  name: function(name) {
    // 动物的名字必须是字符串类型的
    return typeof name === 'string';
  }
};

function createValidator(target, validator) {
  return new Proxy(target, {
    set: function(target, key, value) {
      if (validator[key]) {
        // 符合验证条件
        if (validator[key](value)) {
          target[key] = value;
        } else {
          throw Error(`Cannot set ${key} to ${value}. Invalid.`);
        }
      } else {
        target[key] = value
      }
    }
  });
}

var dog = new Animal();
dog.name = 'dog';
console.log(dog.name);
dog.name = 123; // Uncaught Error: Cannot set name to 123. Invalid.
```

**2、Reflect**                           
Reflect是ES6为操作对象而提供的新API,而这个API设计的目的只要有：                    
- 将Object对象的一些属于语言内部的方法放到Reflect对象上，从Reflect上能拿到语言内部的方法。如：Object.defineProperty                       
- 修改某些object方法返回的结果。如：Object.defineProperty(obj, name, desc)在无法定义属性的时候会报错，而Reflect.defineProperty(obj, name, desc)则会返回false                               
- 让Object的操作都变成函数行为。如object的命令式：name in obj和delete obj[name] 则与 Reflect.has(obj, name)、Reflect.deleteProperty(obj, name)相等                        
- Reflect对象的方法与Proxy对象的方法一一对应，只要proxy对象上有的方法reflect也能找到。                          

基本使用方式：
```javascript
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target,name, value, receiver);
    if (success) {
      log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});

var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

有了Reflect对象，很多操作会更易读                    
```javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

Reflect一共有13个静态方法：                  
```
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
```
上面这些方法的作用大部分与Object对象的同名方法都是相同的，与Proxy对象的方法一一对应的。

**Reflect.get(target, name, receiver)**                         
Reflect.get方法查找并返回target的name属性，如果没有，则返回undefined。                      
```javascript
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

如果name属性部署了读取函数(getter)，则读取函数的this绑定的receiver。                  
```javascript
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
```
如果第一个参数不是对象，则Reflect.get则会报错。                       

**Reflect.set(target, name, value, receiver)**                      
Reflect.set方法设置target对象的name属性等于value。
```javascript
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
```

如果name属性设置的赋值函数，则赋值函数的this绑定receiver。
```javascript
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```

如果Proxy与Reflect联合使用，前者完成拦截赋值操作，后者完成赋值默认行为，
而且传入了receiver，则Reflect.set会触发Proxy.defineProperty拦截。                
```javascript
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
```

如果不传，则Proxy不会触发defineProperty拦截。                
```javascript
let p = {
  a: 'a'
};

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
```
如果第一个参数不是对象，则Reflect.set会报错。

**Reflect.has(obj, name)**                  
Reflect.has对应 name in obj 里面的in操作                       
```javascript
var myObject = {
  foo: 1,
};

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```
如果第一个参数不是对象，Reflect.has和in都会报错。                     


**Reflect.deleteProperty(obj, name)**                   
Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象属性。                       
```javascript
const myObj = { foo: 'bar' };

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');
```
该方法返回一个布尔值。如果删除成功或删除的属性不存在，则返回true，如果删除失败，删除的属性依然还在，则返回false。                   

**Reflect.construct(target, args)**                     
Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。                          
```javascript
function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
```

**Reflect.apply(func, thisArgs, args)**                         
Reflect.apply等同于Function.prototype.apply.call(func, thisArgs, args)，用于绑定this对象后执行给定函数。

一般来说，如果要绑定一个函数的this对象，可以写成这样fn.apply(obj, args)，
但是如果函数定义了自己的apply方法就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect简化这种操作
```javascript
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
```

[其他的更多内容请看这里](https://www.cnblogs.com/kdcg/p/9139273.html)