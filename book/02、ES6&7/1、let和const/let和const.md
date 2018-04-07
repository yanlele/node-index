# let和const

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
    