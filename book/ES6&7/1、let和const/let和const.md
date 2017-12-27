# 一、let和const

1. 不存在变量提升       
        必须先定义后使用，否则报错
        
2. 暂时性死区     
在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。              
在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。           
作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。      
```javascript
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}
```
      
3. 不允许重复申明/不允许在函数内部重新申明参数（也算重复申明）
```javascript
// 报错
    let a = 10;
    var a = 1;

// 报错
    let a = 10;
    let a = 1;

function func(arg) {
    let arg; // 报错
}

function func(arg) {
    {
        let arg; // 不报错
    }
}
```
    
4.  块级作用域       
    4.1 SE5的作用域     
    SE5只有全局作用域和函数作用域，这样做的缺点如下：      
    1）、内层变量覆盖外层的变量      
```javascript
var tmp = new Date();

function f() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world';
    }
}
f(); // undefined
```