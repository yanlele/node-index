# let和const

<!-- toc -->

- [1. 不存在变量提升](#1-%E4%B8%8D%E5%AD%98%E5%9C%A8%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87)
- [2. 暂时性死区](#2-%E6%9A%82%E6%97%B6%E6%80%A7%E6%AD%BB%E5%8C%BA)
- [3. 不允许重复申明/不允许在函数内部重新申明参数（也算重复申明）](#3-%E4%B8%8D%E5%85%81%E8%AE%B8%E9%87%8D%E5%A4%8D%E7%94%B3%E6%98%8E%E4%B8%8D%E5%85%81%E8%AE%B8%E5%9C%A8%E5%87%BD%E6%95%B0%E5%86%85%E9%83%A8%E9%87%8D%E6%96%B0%E7%94%B3%E6%98%8E%E5%8F%82%E6%95%B0%E4%B9%9F%E7%AE%97%E9%87%8D%E5%A4%8D%E7%94%B3%E6%98%8E)
- [4. 块级作用域](#4--%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F)
- [5、补充](#5%E8%A1%A5%E5%85%85)

<!-- tocstop -->

### 1. 不存在变量提升       
必须先定义后使用，否则报错
        
### 2. 暂时性死区     
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
      
### 3. 不允许重复申明/不允许在函数内部重新申明参数（也算重复申明）
```javascript
// 报错
    let a = 10;
    let a = 1;

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
    
### 4.  块级作用域       
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
原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。     

2）、用来计数的循环变量会泄露为全局变量
```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
}
console.log(i); // 5
```     
原因是上面用来控制循环的变量i ,在循环之后并没有消失，而是泄露成为了全局变量
        
4.2、ES6的作用域     
SE6的块级作用域的解决方案 ： let        
```javascript
function f1(){
    let n=5;
    if(true){
        let n=10;
        console.log(`if 内部块的变量n：${n}`)//结果为10
    }
    console.log(`外部快的变量 n :${n}`)//结果为5
}
```
    
4.3、const            
4.3.1、const是一个常量，一旦申明，就不能改变。而且在申明的时候必须初始化，不能留到后面赋值。             
4.3.2、作用域和let是一样的       
const常量储存的是一个地址，这个地址是指向一个对象的，因为对象本身是可变的，所以依然可以为其添加新的属性和方法：           
```javascript
const arr=[];
arr.push('hello');
console.log(arr);		//可执行
console.log(arr.length);	//可执行
arr=['word!'];			//报错
```         
如果想冻结这个对象的话，要使用Object.freeze()方法：       
```javascript
'use strict'
const foo=Object.freeze({});
foo.prop=123;			//报错
```

彻底冻结一个对象的方式：上面只冻结了对象，要彻底冻结一个函数，就要冻结对象和属性        
```javascript
var constantize=(obj)=>{
    Object.freeze(obj);
    Object.keys(obj).forEach((key,value)=>{
        if(typeof obj[key]==='object'){
            constantize(obj[key])
        }
    })
};
const obj=constantize([]);
obj.push(123);			//报错
```

4.4、全局对象属性      
在ES5里面，为申明的全局变量会自动生为window的属性:没法在编译过程爆出变量为申明的错误，语法上顶层对象有一个实体含义的对象这样肯定不合适。
```javascript
a=1;
window.a;//结果为1
```

ES6的改进：     
用var定义的依然会升级为顶层对象(全局对象)window的属性；但是let,const申明则不会           
```javascript
var a=1;
window.a;//结果为1

let b=2;
window.b;//结果为undefined
```



### 5、补充
下面的代码如果使用var，最后输出的是10。                  
```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。
也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。


如果使用let，声明的变量仅在块级作用域内有效，最后输出的是 6。
```javascript
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。
你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，
从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```
