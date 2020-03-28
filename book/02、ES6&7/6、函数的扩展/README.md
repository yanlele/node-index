# 6、函数的扩展

<!-- toc -->

- [1、函数参数的默认值](#1%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E7%9A%84%E9%BB%98%E8%AE%A4%E5%80%BC)
  * [1.1、 基本用法](#11-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
  * [1.2、与解构赋值默认值结合使用](#12%E4%B8%8E%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC%E9%BB%98%E8%AE%A4%E5%80%BC%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8)
  * [1.3、函数的 length 属性](#13%E5%87%BD%E6%95%B0%E7%9A%84-length-%E5%B1%9E%E6%80%A7)
  * [1.4、使用](#14%E4%BD%BF%E7%94%A8)
- [2、rest参数](#2rest%E5%8F%82%E6%95%B0)
- [3、扩展运算符](#3%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)
  * [3.1、含义：扩展运算符（ spread ）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。](#31%E5%90%AB%E4%B9%89%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6-spread-%E6%98%AF%E4%B8%89%E4%B8%AA%E7%82%B9%E5%AE%83%E5%A5%BD%E6%AF%94-rest-%E5%8F%82%E6%95%B0%E7%9A%84%E9%80%86%E8%BF%90%E7%AE%97%E5%B0%86%E4%B8%80%E4%B8%AA%E6%95%B0%E7%BB%84%E8%BD%AC%E4%B8%BA%E7%94%A8%E9%80%97%E5%8F%B7%E5%88%86%E9%9A%94%E7%9A%84%E5%8F%82%E6%95%B0%E5%BA%8F%E5%88%97)
  * [3.2、替代数组的 apply 方法](#32%E6%9B%BF%E4%BB%A3%E6%95%B0%E7%BB%84%E7%9A%84-apply-%E6%96%B9%E6%B3%95)
- [3.3、扩展运算符的应用](#33%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E5%BA%94%E7%94%A8)
  * [3.3.1、合并数组](#331%E5%90%88%E5%B9%B6%E6%95%B0%E7%BB%84)
  * [3.3.2、与解构赋值结合](#332%E4%B8%8E%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC%E7%BB%93%E5%90%88)
- [3.4、实现了 Iterator 接口的对象](#34%E5%AE%9E%E7%8E%B0%E4%BA%86-iterator-%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%AF%B9%E8%B1%A1)
- [3.5、Map 和 Set 结构， Generator 函数](#35map-%E5%92%8C-set-%E7%BB%93%E6%9E%84-generator-%E5%87%BD%E6%95%B0)
- [4、name属性](#4name%E5%B1%9E%E6%80%A7)
- [5、箭头函数](#5%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)
- [6、函数绑定](#6%E5%87%BD%E6%95%B0%E7%BB%91%E5%AE%9A)
- [7、尾调优化(略)](#7%E5%B0%BE%E8%B0%83%E4%BC%98%E5%8C%96%E7%95%A5)
- [8、参数尾逗号(略)](#8%E5%8F%82%E6%95%B0%E5%B0%BE%E9%80%97%E5%8F%B7%E7%95%A5)

<!-- tocstop -->

### 1、函数参数的默认值          
#### 1.1、 基本用法

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。 
实例：基本使用            
```javascript
    function log(x, y = 'World') {
        console.log(x, y);
    }
    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello
```

#### 1.2、与解构赋值默认值结合使用                       
实例1：基本使用方式          
```javascript
    function foo({x, y = 5}) {
        console.log(x, y);
    }
    foo({}) // undefined, 5
    foo({x: 1}) // 1, 5
    foo({x: 1, y: 2}) // 1, 2
    foo() // TypeError: Cannot read property 'x' of undefined
```

实例2：高级使用            
```javascript
    //  写法一（采用第一种赋值方式）
    function m1({x = 0, y = 0} = {}) {
        return [x, y];
    }
    //  写法二
    function m2({x, y} = { x: 0, y: 0 }) {
        return [x, y];
    }   
```             
上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。             
```javascript
    //  函数没有参数的情况
    m1() // [0, 0]
    m2() // [0, 0]
    
    // x 和 y 都有值的情况
    m1({x: 3, y: 8}) // [3, 8]
    m2({x: 3, y: 8}) // [3, 8]
    
    // x 有值， y 无值的情况
    m1({x: 3}) // [3, 0]
    m2({x: 3}) // [3, undefined]
    
    // x 和 y 都无值的情况
    m1({}) // [0, 0];
    m2({}) // [undefined, undefined]
    
    m1({z: 3}) // [0, 0]
    m2({z: 3}) // [undefined, undefined]
```

#### 1.3、函数的 length 属性              
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。如果参数有赋值默认值，就要用这个属性了           
实例1：            
```javascript
    (function (a) {}).length // 1
    (function (a = 5) {}).length // 0
    (function (a, b, c = 5) {}).length // 2
```

#### 1.4、使用             
实例1：利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。          
```javascript
    function throwIfMissing() {
        throw new Error('Missing parameter');
    }
    function foo(mustBeProvided = throwIfMissing()) {
        return mustBeProvided;
    }
    foo()
    // Error: Missing parameter
```

### 2、rest参数            
ES6 引入 rest 参数（形式为 “... 变量名 ” ），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。 rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。           
实例1：基本使用            
```javascript
    function add(...values) {
        let sum = 0;
        for (var val of values) {
            sum += val;
        }
        return sum;
    }
    add(2, 5, 3) // 10
```

### 3、扩展运算符         
#### 3.1、含义：扩展运算符（ spread ）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。         
实例1：            
```javascript
    console.log(...[1, 2, 3])
    // 1 2 3
    console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5
    [...document.querySelectorAll('div')]
    // [<div>, <div>, <div>]
```

#### 3.2、替代数组的 apply 方法         
```javascript
    // ES6 的写法
    function f(x, y, z) {
    // ...
    }
    var args = [0, 1, 2];
    f(...args);
```

### 3.3、扩展运算符的应用                
#### 3.3.1、合并数组         
```javascript
    [...arr1, ...arr2, ...arr3]
    // [ 'a', 'b', 'c', 'd', 'e' ]
```

#### 3.3.2、与解构赋值结合          
实例：             
```javascript
    const [first, ...rest] = [1, 2, 3, 4, 5];
    first // 1
    rest // [2, 3, 4, 5]
    
    const [first, ...rest] = [];
    first // undefined
    rest // []:
    
    const [first, ...rest] = ["foo"];
    first // "foo"
    rest // []
```
               
实例2：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。           
```javascript
    const [...butLast, last] = [1, 2, 3, 4, 5];
    //  报错
    
    const [first, ...middle, last] = [1, 2, 3, 4, 5];
    //  报错
```


### 3.4、实现了 Iterator 接口的对象          
实例：         
```javascript
    var nodeList = document.querySelectorAll('div');
    var array = [...nodeList];
```     

### 3.5、Map 和 Set 结构， Generator 函数              
实例：         
```javascript
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);
    let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。         
实例2：            
```javascript
    var go = function*(){
        yield 1;
        yield 2;
        yield 3;
    };
    [...go()] // [1, 2, 3]:
```

### 4、name属性            
实例：函数的name属性，返回该函数的函数名          
```javascript
    function foo() {}
    foo.name // "foo"
    
    var func1 = function () {};
    
    // ES5
    func1.name // ""
    
    // ES6
    func1.name // "func1"
```

### 5、箭头函数
略           
箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。             


### 6、函数绑定          
箭头函数并不适用于所有场合，所以 ES7 提出了 “ 函数绑定 ” （ function bind ）运算符，用来取代call、apply、bind调用。虽然该语法还是 ES7 的一个提案，但是 Babel 转码器已经支持。                
实例1：            
```javascript
    foo::bar;
    //  等同于
    bar.bind(foo);
    
    foo::bar(...arguments);
    //  等同于
    bar.apply(foo, arguments);
    
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasOwn(obj, key) {
        return obj::hasOwnProperty(key);
    }
```

### 7、尾调优化(略)               

### 8、参数尾逗号(略)









































