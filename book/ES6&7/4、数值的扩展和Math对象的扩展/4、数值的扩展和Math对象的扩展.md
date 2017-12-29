#  数值的扩展

### 1、Number.isFinite(), Number.isNaN()

Number.isFinite()用来检查一个数值是否为有限的（ finite ）。      
Number.isNaN()用来检查一个值是否为NaN。        
它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。     
实例1：
```javascript
    isFinite(25) // true
    isFinite("25") // true
    Number.isFinite(25) // true
    Number.isFinite("25") // false
    
    isNaN(NaN) // true
    isNaN("NaN") // true
    Number.isNaN(NaN) // true
    Number.isNaN("NaN") // false
```
### 2、Number.parseInt(), Number.parseFloat()

ES6 将全局方法parseInt()和parseFloat()，移植到 Number 对象上面，行为完全保持不变。      
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。        
实例：
```javascript
    // ES5 的写法
    parseInt('12.34') // 12
    parseFloat('123.45#') // 123.45
    
    // ES6 的写法
    Number.parseInt('12.34') // 12
    Number.parseFloat('123.45#') // 123.45
```

### 3、Number.isInteger()

Number.isInteger()用来判断一个值是否为整数。需要注意的是，在 JavaScript 内部，整数和浮点数是同样的储存方法，所以 3 和 3.0 被视为同一个值。        
```javascript
    Number.isInteger(25) // true
    Number.isInteger(25.0) // true
    Number.isInteger(25.1) // false
    Number.isInteger("15") // false
    Number.isInteger(true) // false
```

### 4、安全整数和 Number.isSafeInteger()   -  非常冷门，不重要

JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。

实例1：
```javascript
    Number.MAX_SAFE_INTEGER === 9007199254740991
    // true
    Number.MIN_SAFE_INTEGER === -9007199254740991
    // true
```

实例2:Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
```javascript
    Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
    Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
    Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

实例3:如果只验证运算结果是否为安全整数，很可能得到错误结果。下面的函数可以同时验证两个运算数和运算结果。       
```javascript
    function trusty(left, right, result) {
        if (
            Number.isSafeInteger(left) &&
            Number.isSafeInteger(right) &&
            Number.isSafeInteger(result)
        ) {
            return result;
        }
        throw new RangeError('Operation cannot be trusted!');
    }
    
    trusty(9007199254740993, 990, 9007199254740993 - 990)
    // RangeError: Operation cannot be trusted!
    trusty(1, 2, 3)
    // 3
```

### 5、Math 对象的扩展        
#### 5.1、Math.trunc()：方法用于去除一个数的小数部分，返回整数部分。            
实例1:        
```javascript
    Math.trunc(4.1) // 4
    Math.trunc(4.9) // 4
    Math.trunc(-4.1) // -4
    Math.trunc(-4.9) // -4
    Math.trunc(-0.1234) // -0
```
对于非数值，Math.trunc内部使用Number方法将其先转为数值。

#### 5.2、Math.sign()        
参数为正数，返回 +1 ；       
参数为负数，返回 -1 ；       
参数为 0 ，返回 0 ；       
参数为 -0 ，返回 -0;      
其他值，返回 NaN 。        
```javascript
    Math.sign(-5) // -1
    Math.sign(5) // +1
    Math.sign(0) // +0
    Math.sign(-0) // -0
    Math.sign(NaN) // NaN
    Math.sign('foo'); // NaN
    Math.sign(); // NaN
```

#### 5.3、Math.imul()            
Math.imul方法返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数           
```javascript
    Math.imul(2, 4) // 8
    Math.imul(-1, 8) // -8
    Math.imul(-2, -2) // 4
```





