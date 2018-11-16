## commonjs   模块引用管理规范

规范定义：   
每一个文件是一个模块，有自己的作用域  
在模块内部的module变量代表模块本身    
module.exports属性代表模块对外接口    

require规则：  
/表示绝路径，./表示相对于当前文件的路径   
支持js、json、node扩展名，不写就依次尝试   
不写路径名就认为是build-in模块或者各级node_modules内第三方模块   

require特性：  
module被加载的时候执行，加载后缓存；   
一旦出现模块被循环加载，就只输出已经执行的部分，还没有执行的部分就不会输出   


## 深入理解module.exports和moudle和exports

### 01、为什么node需要用module.exports？

- 1、Node程序由很多模块组成，每个模块就是一个文件。
- 2、并且Node模块采用了个CommonJs规范(下文会详细说明)
- 3、根据CommonJs规范一个单独的文件就是一个模块。每个模块都是一个 单独的作用域。也就是说：一个文件中的所有变量、类、方法都是私有的， 别的文件是不可见，不能直接引用的。 
例如：我们创建一个js文件a.js 
```javascript
var name1 = 'bangbang'; 
var name2 = function(name){ 
    return name; 
} 
```
上面文件中：变量name1和name2在当前的文件中是私有的，其他文件不 可见。

- 4、在javascript中有2种作用域：全局作用域和函数作用域，在浏览器端， 全局作用域就是window对象的属性，函数作用域就是函数内部的对象属性。 
在node中，也有2种作用域：全局作用域和模块作用域，因此要想实现在nodejs中多个文件中分享变量，就必须定义成全局对象 (global)的属性， 
global定义的变量，在任何地方都可以使用，类似于浏览器端定义在全局 范围中的变量。Global可查看[http://www.w3clog.com/20.html](http://www.w3clog.com/20.html) 


### 02、什么是module.exports对象，该怎么使用？

- 1、CommonJs规定
每个文件对外接口是module.exports对象。这个对象 的所有属性和方法都可以被其他文件导入。                          
例如：我们创建一个js文件：b1.js 
```javascript
var num1 = 6;
function add(a) {
  return a + num1;
}
module.exports.num1 = num1;
module.exports.add = add;
```

再创建一个test2.js 
```javascript
var b1 = require('./b1');
console.log(b1.num1);               // 6
console.log(b1.add(4));             // 10
```
上面代码中的module.exports对象，定义对外接口，输出变量num1和函数add; 

- 2、总结如下
    - 2.1、module.exports对象可以被其他文件导入，其实他就是文件内部与文件外部通信的桥梁。
    - 2.2、module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。 
    


