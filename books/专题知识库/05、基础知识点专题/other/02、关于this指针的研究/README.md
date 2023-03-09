# 关于 this 指针的研究

## 基础实例说明

实例1：
```html
<script>
    var name = "Kevin Yang";
    function sayHi(){
        console.log("你好，我的名字叫" + this.name);
    }
    sayHi()
</script>
```
如果在html 端， 这个this.name 是可以调用全局对象name的， 这个this实际上是指向的window的， var 也是把变量挂在到window对象上面的。

但是同样的这个实例如果放在node 端，就是一个undefined ,原因是node端没有window对象。

实例2：
```javascript
var name = "Kevin Yang";   
function sayHi(){     
    console.log("你好，我的名字叫" + this.name);   
}   
var person = {};   
person.sayHello = sayHi;   
person.sayHello(); 
```

这一次打招呼的内容就有点无厘头了，我们发现this.name已经变成undefined了。这说明，在sayHello函数内部执行时已经找不着this.name对象了。,原因是这儿时候，this指向的person 对象，但是this对象上面是没有name属性的。
如果改为这样 `var person = {name:"Marry"};` 就可以得到我们想要的内容了。


## 判别this指针的指导性原则

**在Javascript里面，this指针代表的是执行当前代码的对象的所有者。**

在上面的示例中我们可以看到，第一次，我们定义了一个全局函数对象sayHi并执行了这个函数，函数内部使用了this关键字，
那么执行this这 行代码的对象是sayHi（一切皆对象的体现），sayHi是被定义在全局作用域中。其实在Javascript中所谓的全局对象，
无非是定义在 window这个根对象下的一个属性而已。因此，sayHi的所有者是window对象。也就是说，在全局作用域下，
你可以通过直接使用name去引用这 个对象，你也可以通过window.name去引用同一个对象。因而**this.name就可以翻译为window.name了**。

再来看第二个this的示例。第一次，person里面没有name属性，因此弹 出的对话框就是this.name引用的就是undefined对象
（Javascript中所有只声明而没有定义的变量全都指向undefined对象）；
而第二次我们在定义person的时候加了name属性了，那么this.name指向的自然就是我们定义的字符串了。

理解了上面所说的之后，我们将上面最后一段示例改造成面向对象式的代码。              
```javascript
var name = "Kevin Yang";   
function sayHi(){     
    console.log("你好，我的名字叫" + this.name);   
}  
function Person(name){     
    this.name = name;   
}   
Person.prototype.sayHello = sayHi;   
var marry = new Person("Marry");     
marry.sayHello();   
var kevin = new Person("Kevin");   
kevin.sayHello(); 
```

## 容易误用的情况

### 示例1——内联式绑定Dom元素的事件处理函数
```html
<body>
<input id="btnTest" type="button" value="点击我" onclick="sayHi()">
<script type="text/javascript">   
	function sayHi(){     
		alert("当前点击的元素是" + this.tagName);  
	}   
</script> 
</body>
```
在此例代码中，我们绑定了button的点击事件，期望在弹出的对话框中打印出点击元素的标签名。但运行结果却是： 当前点击的元素是 undefined

也就是this指针并不是指向input元素。这是因为当使用内联式绑定Dom元素的事件处理函数时，实际上相当于执行了以下代码：

在这种情况下sayHi函数对象的所有权并没有发生转移，**还是属于window所有**。用上面的指导原则一套我们就很好理解为什么this.tagName是undefined了。

那么如果我们要引用元素本身怎么办呢？                  
我们知道，onclick函数是属于btnTest元素的，那么在此函数内部，this指针正是指向此Dom对象，于是我们只需要把this作为参数传入sayHi即可。
```html
<input id="btnTest" type="button" value="点击我" onclick="sayHi(this)">
<script type="text/javascript">   
	function sayHi(el){     
		alert("当前点击的元素是" + el.tagName);   } 
</script> 
```
等价代码如下：
```html
<script type="text/javascript">    
	document.getElementById("btnTest").onclick = function(){     sayHi(this);   } 
</script>
```


### 示例2——临时变量导致的this指针丢失
```html
<script type="text/javascript">   
	var Utility = {     
		decode:function(str){       return unescape(str);     },     
		getCookie:function(key){       
			// ... 省略提取cookie字符串的代码       
			var value = "i%27m%20a%20cookie";       
			return this.decode(value);     
		}   
	};   
	console.log(Utility.getCookie("identity")) 
</script>
```
一般都会自己封装一个Utility的类，然后将一些常用的函数作为Utility类的属性，如客户端经常会 用到的getCookie函数和解码函数。
如果每个函数都是彼此独立的，那么还好办，问题是，函数之间有时候会相互引用。例如上面的getCookie函 数，
会对从document.cookie中提取到的字符串进行decode之后再返回。如果我们通过Utility.getCookie去调用的话，那 么没有问题，
我们知道，getCookie内部的this指针指向的还是Utility对象，而Utility对象时包含decode属性的。代码可以成 功执行。

但是有个人不小心这样使用Utility对象呢？
```html
<script type="text/javascript">   
	function showUserIdentity(){     
		// 保存getCookie函数到一个局部变量，因为下面会经常用到     
		var getCookie = Utility.getCookie;     
		alert(getCookie("identity"));   
	}   
	showUserIdentity(); 
</script>
```
这个时候运行代码会抛出异常“this.decode is not a function”。
运用上面我们讲到的指导原则，很好理解，因为此时Utility.getCookie对象被赋给了临时变量getCookie，
而临 时变量是属于window对象的——只不过外界不能直接引用，只对Javascript引擎可见——于是在getCookie函数内部的this指针指向 的就是window对象了，
而window对象没有定义一个decode的函数对象，因此就会抛出这样的异常来。

这个问题是由于引入了临时变量导致的this指针的转移。解决此问题的办法有几个：                         
不引入临时变量，每次使用均使用Utility.getCookie进行调用                        
getCookie函数内部使用Utility.decode显式引用decode对象而不通过this指针隐式引用（如果Utility是一个实例化的对象，也即是通过new生成的，那么此法不可用）                 
**使用Funtion.apply或者Function.call函数指定this指针**                            

第三种使用apply 和 call 修正的办法实例如下：
```html
<script type="text/javascript">   
	function showUserIdentity(){     
		// 保存getCookie函数到一个局部变量，因为下面会经常用到     
		var getCookie = Utility.getCookie;     
		alert(getCookie.call(Utility,"identity"));     
		alert(getCookie.apply(Utility,["identity"]));   
	}   
	showUserIdentity(); 
</script>
```

### 示例3——函数传参时导致的this指针丢失
```html
<script type="text/javascript">   
	var person = {     
		name:"Kevin Yang",     
		sayHi:function(){       
			alert("你好，我是"+this.name);     
		}   
	}   
	setTimeout(person.sayHi,5000); 
</script>
```

这段代码期望在访客进入页面5秒钟之后向访客打声招呼。setTimeout函数接收一个函数作为参数，并在指定的触发时刻执行这个函数。
可是，当我们等了5秒钟之后，弹出的对话框显示的this.name却是undefined。

其实这个问题和上一个示例中的问题是类似的，都是因为临时变量而导致的问题。
当我们执行函数的时候，如果函数带有参数，那么这个时候Javascript引擎会创建一个临时变量，
并将传入的参数复制（注意，Javascript里面都是值传递的，没有引用传递的概念）给此临时变量。
也就是说，整个过程就跟上面我们定义了一个getCookie的临时变量，再将Utility.getCookie赋值给这个临时变量一样。只不过在这个示例中，容易忽视临时变量导致的bug。


## 函数对象传参
Prototype的解决方案——传参之前使用bind方法将函数封装起来，并返回封装后的对象
```html
<script type="text/javascript">   
	var person = {    
		name:"Kevin Yang",     
		sayHi:function(){       
			alert("你好，我是"+this.name);     
		}   
	}   
	var boundFunc = person.sayHi.bind(person,person.sayHi);   
	setTimeout(boundFunc,5000); 
</script>
```
bind方法的实现其实是用到了Javascript又一个高级特性——**闭包**。我们来看一下源代码：
```javascript
function bind(){  
	if (arguments.length < 2 && arguments[0] === undefined)      
		return this;   
	var __method = this, args = $A(arguments), object = args.shift();   
	return function(){     return __method.apply(object, args.concat($A(arguments)));   } 
}
```
首先将this指针存入函数内部临时变量，然后在返回的函数对象中引用此临时变量从而形成闭包。

## 变化的this 
在JavaScript中，this通常 指向的是我们正在执行的函数本身，或者是指向该函数所属的对象（运行时）。
当我们在页面中定义了函数 doSomething()的时候，它的owner是页面，或者是JavaScript中的window对象（或 global对象）。
对于一个onclick属性，它为它所属的HTML元素所拥有，this应该指向该HTML元素。

在几种常见场景中this的变化
 ```javascript
function doSomething () { 
    alert(this.navigator); //appCodeName 
    this.value = "I am from the Object constructor"; 
    this.style.backgroundColor = "# 000000"; 
} 
```
- 作为普通函数直接调用时，this指向window对象.                                   
- 作为控件事件触发时                                     
    - inline event registration 内联事件注册 .将事件直接写在HTML代码中(<element onclick=”doSomething()”>), 此时this指向 window对象 。                          
    - Traditional event registration 传统事件注册 （DHTML方式）. 形如 element.onclick = doSomething; 此时this指向 element对象                         
    - <element onclick=”doSomething(this)”>作为参数传递可以指向element                            
- 作为对象使用时this指向当前对象。形如：new doSomething();                       
- 使用apply 或者call方法时，this指向所传递的对象。 形如：var obj={}; doSomething.apply(obj,new Array(”nothing”));                        


## 接下来文章中我们将要讨论的问题是：在函数doSomething()中this所指的是什么？ 
```javascript
function doSomething() { 
    this.style.color = '#cc0000'; 
} 
```
在 JavaScript中，this通常指向的是我们正在执行的函数本身（译者注：用owner代表this所指向的内容），或者是，指向该函数所属的对 象。
当我们在页面中定义了函数doSomething()的时候，它的owner是页面，或者是JavaScript中的window对象（或 global对象）。
对于一个onclick属性，它为它所属的HTML元素所拥有，this应该指向该HTML元素。                          
这种“所有权”就是JavaScript中面向对象的一种方式。在Objects as associative arrays中可以查看一些更多的信息。
![11_02](https://user-images.githubusercontent.com/22188674/224062543-ec8a9e13-6a90-400b-a54d-16dfc33c64fc.gif)                 


## 总结 
怎样在一个代码环境中快速的找到this所指的对象呢？                      
- 1、 要清楚的知道对于函数的每一步操作是拷贝还是引用（调用）                        
- 2、 要清楚的知道函数的拥有者（owner）是什么                         
- 3、 对于一个function，我们要搞清楚我们是把它当作函数使用还是在当作类使用                             





