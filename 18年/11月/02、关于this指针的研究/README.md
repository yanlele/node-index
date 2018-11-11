# 关于this 指针的研究

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




