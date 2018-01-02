# 对象的扩展             
### 1、属性的简洁表达方式：            
ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。           
实例1：            
```javascript
    var foo = 'bar';
    var baz = {foo};
    baz // {foo: "bar"}
    
    //  等同于
    var baz = {foo: foo};
```

实例2：            
```javascript
    function f(x, y) {
        return {x, y};
    }
    //  等同于
    function f(x, y) {
        return {x: x, y: y};
    }
    f(1, 2) // Object {x: 1, y: 2}
```         

实例3：            
```javascript
    var birth = '2000/01/01';
    var Person = {
        name: ' 张三 ',
        
    // 等同于 birth: birth
        birth,
        
    //  等同于 hello: function ()...
        hello() { console.log(' 我的名字是 ', this.name); }
    };
```

实例4：使用实例            
```javascript
    var ms = {};
    
    function getItem (key) {
        return key in ms ? ms[key] : null;
    }
    function setItem (key, value) {
        ms[key] = value;
    }
    function clear () {
        ms = {};
    }
    
    module.exports = { getItem, setItem, clear };
```

### 2、属性名表达式            
实例1：            
```javascript
    let propKey = 'foo';
    let obj = {
        [propKey]: true,
        ['a' + 'bc']: 123
    };
```

### 3、方法的 name 属性           
```javascript
    var person = {
        sayName() {
            console.log(this.name);
        },
        get firstName() {
            return "Nicholas";
        }
    };
    person.sayName.name // "sayName"
    person.firstName.name // "get firstName"
```

### 4、Object.is()           
ES6 提出 “Same-value equality” （同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（ === ）的行为基本一致。             
实例1：            
```javascript
    Object.is('foo', 'foo')
    // true
    
    Object.is({}, {})
    // false
```

### 5、Object.assign()       
#### 5.1、基本用法           
方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）。             
Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。               
示例1：        
```javascript
    var target = { a: 1, b: 1 };
    var source1 = { b: 2, c: 2 };
    var source2 = { c: 3 };
    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
```
如果该参数不是对象，则会先转成对象，然后返回。如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。          

#### 5.2、注意点        
5.2.1、Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。            
示例1：Object.assign拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面。           
```javascript
    var obj1 = {a: {b: 1}};
    var obj2 = Object.assign({}, obj1);
    
    obj1.a.b = 2;
    obj2.a.b // 2
```

5.2.2、一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。         
示例2：            
```javascript
    var target = { a: { b: 'c', d: 'e' } }
    var source = { a: { b: 'hello' } }
    
    Object.assign(target, source)
    // { a: { b: 'hello' } }
```

5.2.3、Object.assign可以用来处理数组，但是会把数组视为对象。（最好不要用作处理数组）         
示例3：Object.assign把数组视为属性名为 0 、 1 、 2 的对象，因此目标数组的 0 号属性4覆盖了原数组的 0 号属性1               
```javascript
    Object.assign([1, 2, 3], [4, 5])
    // [4, 5, 3]
```

#### 5.3、常见用途                       
5.3.1、位对象添加属性               
```javascript
    class Point {
        constructor(x, y) {
            Object.assign(this, {x, y});
        }
    }
```         

5.3.2、为对象添加方法           
```javascript
    Object.assign(SomeClass.prototype, {
        someMethod(arg1, arg2) {
            ···
        },
        anotherMethod() {
            ···
        }
    });
```

5.3.3、克隆对象          
示例1：            
```javascript
    function clone(origin) {
        return Object.assign({}, origin);
    }
```

不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。             
示例2：            
```javascript
    function clone(origin) {
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto), origin);
    }
```

5.3.4、合并多个对象   - 最基础使用              

5.3.5、为属性指定默认值              
```javascript
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    };
    
    function processContent(options) {
        let options = Object.assign({}, DEFAULTS, options);
    }
```

#### 5.4、属性的可枚举性             
Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象                     
示例1：            
```javascript
    let obj = { foo: 123 };
    let descriptor= Object.getOwnPropertyDescriptor(obj, 'foo');
    // {
    // value: 123,
    // writable: true,
    // enumerable: true,
    // configurable: true
    // }
```

#### 5.5、属性的遍历           
（ 1 ） for...in      
for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。       
（ 2 ） Object.keys(obj)      
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）。      
（ 3 ） Object.getOwnPropertyNames(obj)       
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）。      
（ 4 ） Object.getOwnPropertySymbols(obj)     
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性。     
（ 5 ） Reflect.ownKeys(obj)      
Reflect.ownKeys返回一个数组，包含对象自身的所有属性，不管是属性名是 Symbol 或字符串，也不管是否可枚举。     


### 6、__proto__ 属性，Object.setPrototypeOf()，Object.getPrototypeOf()              
#### 6.1、__proto__ 属性           
__proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。          
实例1：        
```javascript
    // es6 的写法
    var obj = {
        method: function() { ... }
    };
    obj.__proto__ = someOtherObj;
    
    // es5 的写法
    var obj = Object.create(someOtherObj);
    obj.method = function() { ... };
```

无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。


#### 6.2、 Object.setPrototypeOf()       
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象。    
//  格式
Object.setPrototypeOf(object, prototype)
//  用法
var o = Object.setPrototypeOf({}, null);
实例1：                    
```javascript

    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);
    proto.y = 20;
    proto.z = 40;
    obj.x // 10
    obj.y // 20
    obj.z // 40
```

#### 6.3、 Object.getPrototypeOf()           
该方法与 setPrototypeOf 方法配套，用于读取一个对象的 prototype 对象。            
语法格式：Object.getPrototypeOf(obj);            
实例1：            
```javascript
    function Rectangle() {
    }
    var rec = new Rectangle();
    Object.getPrototypeOf(rec) === Rectangle.prototype
    // true
```

#### 6.4、Object.values()，Object.entries()           
6.4.1、Object.keys()             
返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。                   
实例1：            
```javascript
    var obj = { foo: "bar", baz: 42 };
    Object.keys(obj)
    // ["foo", "baz"]
```

6.4.2、Object.values()               
Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值。Object.values只返回对象自身的可遍历属性。                 
实例1：        
```javascript
    var obj = { foo: "bar", baz: 42 };
    Object.values(obj)
    // ["bar", 42]
```

6.4.3、Object.entries        
返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值对数组。            
实例1：            
```javascript
    var obj = { foo: 'bar', baz: 42 };
    Object.entries(obj)
    // [ ["foo", "bar"], ["baz", 42] ]
```

实例2：Object.entries方法的一个用处是，将对象转为真正的Map结构。       
```javascript
    var obj = { foo: 'bar', baz: 42 };
    var map = new Map(Object.entries(obj));
    map // Map { foo: "bar", baz: 42 }
```

### 7、对象扩展符         
#### 7.1、Rest 解构赋值      
实例1：            
```javascript
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x // 1
    y // 2
    z // { a: 3, b: 4 }
```

#### 7.2、扩展运算符      
扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。           
实例1:        
```javascript
    let z = { a: 3, b: 4 };
    let n = { ...z };
    n // { a: 3, b: 4 }
```

实例2:扩展运算符可以用于合并两个对象。        
```javascript
    let ab = { ...a, ...b };
    //  等同于
    let ab = Object.assign({}, a, b);
```

### 8、Object.getOwnPropertyDescriptors()        
返回某个对象属性的描述对象（ descriptor ）。主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。         
实例1:            
```javascript
    var obj = { p: 'a' };
    Object.getOwnPropertyDescriptor(obj, 'p')
    // Object { value: "a",
    // writable: true,
    // enumerable: true,
    // configurable: true
    // }
```

实例2：Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。        
```javascript
    const source = {
        set foo(value) {
            console.log(value);
        }
    };
    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    Object.getOwnPropertyDescriptor(target2, 'foo')
    // { get: undefined,
    // set: [Function: foo],
    // enumerable: true,
    // configurable: true }
```

实例3：对上面的代码精简，逻辑提炼           
```javascript
    const shallowMerge = (target, source) => Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
    );
```

实例4：配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。         
```javascript
    const clone = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );


    //  或者
    const shallowClone = (obj) => Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
```

实例5：Object.getOwnPropertyDescriptors方法可以实现，一个对象继承另一个对象。         
```javascript
    //以前，继承另一个对象，常常写成下面这样。
    const obj = {
        __proto__: prot,
        foo: 123,
    };
    
    //如果去除__proto__，上面代码就要改成下面这样。
    const obj = Object.create(prot);
    obj.foo = 123;
    //  或者
    const obj = Object.assign(
        Object.create(prot),
        {
            foo: 123,
        }
    );
    
    //有了Object.getOwnPropertyDescriptors，我们就有了另一种写法。
    const obj = Object.create(
        prot,
        Object.getOwnPropertyDescriptors({
            foo: 123,
        })
    );
```
