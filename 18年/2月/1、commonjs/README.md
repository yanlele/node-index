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

### 01、为什么node需要用module.exports

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


### 02、什么是module.exports对象

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
    
    
### 03、什么是module对象

- 1、每个模块内部，都有一个module对象，代表当前的模块，他有以下属性：还是test2.js文件，后面加一句console.log(module)
```
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'E:\\yanlele\\webProject\\node\\node-index\\18年\\2月\\1、commonjs\\04、test.js',
  loaded: false,
  children: [],
  paths: 
   [ 'E:\\yanlele\\webProject\\node\\node-index\\18年\\2月\\1、commonjs\\node_modules',
     'E:\\yanlele\\webProject\\node\\node-index\\18年\\2月\\node_modules',
     'E:\\yanlele\\webProject\\node\\node-index\\18年\\node_modules',
     'E:\\yanlele\\webProject\\node\\node-index\\node_modules',
     'E:\\yanlele\\webProject\\node\\node_modules',
     'E:\\yanlele\\webProject\\node_modules',
     'E:\\yanlele\\node_modules',
     'E:\\node_modules' ] }
```

我们分析一下：                         
Module.id — 模块的识别符，通常是带有绝对路径的模块文件名；                 
Module.filename – 模块的文件名，含有绝对路径；                        
Module.loaded – 返回布尔值，代表模块是否已经完成加载；                             
Module.parent – 返回一个对象，表示调用该模块的模块；                          
Module.children – 返回一个数组，表示该模块要用到的其他模块。

### 04、什么是exports变量
- 1、为了方便，Node为每个模块提供一个exports变量，（即引用赋值）指向module.exports,这等同于在每个模块头部有一行这样的命令： 
` Var exports = module.exports;` 

不能直接将exports变量指向一个值，因为这样等于切断了，exports与module.exports的联系。 
下面的代码也是无效的，name函数无法对外输出。但是module.exports却可以直接指定一个值， 这样是有效的。
```javascript
exports.name = function() {
    return 'yanle'
};
module.exports = 'lele';
```

- 2、module和module.exports不能混用
这个很重要：因为module.exports被重新赋值了。require返回的是module.exports的值，module.exports才是真正的接口，而不是exports的值；
因此如果你觉得exports与module.exports很难分清，一个简单的处理方法就是：尽量让他们只出现一种，不要混合使用！推荐使用exports导出方法或者变量。 

### 05、CommonJs模块的特点
- 1、 所有代码都运行在模块中，不会污染全局作用域； 
- 2、 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果 就被缓存了，以后再次加载的时候就直接读取缓存结果。要想让模块再次 运行，必须清除缓存。 
- 3、 模块加载的顺序，按照其在代码中出现的顺序。






    


