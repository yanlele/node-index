# 关于闭包的研究
目录：             


## <div id="class01">一、什么是闭包和闭包的几种写法和用法</div>
### 1.1、什么是闭包                   
闭包，官方对闭包的解释是：一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。闭包的特点：               
1. 作为一个函数变量的一个引用，当函数返回时，其处于激活状态。              
2. 一个闭包就是当一个函数返回时，一个没有释放资源的栈区。                    

简单的说，Javascript允许使用内部函数---即函数定义和函数表达式位于另一个函数的函数体内。
而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。
当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。                

### 1.2、闭包的几种写法和用法                
JavaScript中闭包的应用使用闭包需要注意的地方：闭包使得函数中的变量都保存在内存中，内训消耗大，IE中有可能导致内存泄漏在父函数外部改变父函数内部变量的值。                  



第一种写法：                                           
```javascript
//第1种写法  
function Circle(r) {  
      this.r = r;  
}  
Circle.PI = 3.14159;  
Circle.prototype.area = function() {  
  return Circle.PI * this.r * this.r;  
}  
  
var c = new Circle(1.0);     
alert(c.area());
```

**第二种写法：**                               
```javascript
//第2种写法  
var Circle = function() {  
   var obj = new Object();  
   obj.PI = 3.14159;  
     
   obj.area = function( r ) {  
       return this.PI * r * r;  
   }  
   return obj;  
}  
  
var c = new Circle();  
alert( c.area( 1.0 ) );
```

第三种写法：                           
```javascript
//第3种写法  
var Circle = new Object();  
Circle.PI = 3.14159;  
Circle.Area = function( r ) {  
       return this.PI * r * r;  
}  
  
alert( Circle.Area( 1.0 ) );
```

**第四种写法：**                                    
```javascript
//第4种写法  
var Circle={  
   "PI":3.14159,  
 "area":function(r){  
          return this.PI * r * r;  
        }  
};  
alert( Circle.area(1.0) );
```

第五种写法：
```javascript
//第5种写法  
var Circle = new Function("this.PI = 3.14159;this.area = function( r ) {return r*r*this.PI;}");

alert((new Circle()).area(1.0));
```
