## Symbol


### Symbol概述
JavaScript基本数据类型有6种：Undefined、Null、Boolean、String、Number、Object。                        
ES6新增了一种数据类型：Symbol，表示独一无二的值，Symbol最大的用途是用来定义对象的唯一属性名。                                  
ES5的对象属性名都是字符串，容易造成属性名的冲突。
如使用了一个其他人提供的对象，但又想为其添加新的方法（mixin模式），那么新方法的名字有可能与已有方法产生冲突。
因此，需要保证每个属性的名字都是独一无二，以防止属性名的冲突。这就是ES6引入Symbol的原因。                                           

Symbol值通过Symbol函数生成。
```js
var symbol1 = Symbol();
var symbol2 = Symbol("Alice");
console.log(symbol1, symbol2) // 输出：Symbol() Symbol(Alice)
```

typeof运算符用于Symbol类型值，返回symbol。
```js
console.log(typeof Symbol("Alice")) // 输出：symbol
```

Symbol类型的值是一个独一无二的值，Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的
```js
console.log(Symbol() === Symbol()); // 输出：false
console.log(Symbol("Alice") === Symbol("Alice")); // 输出：false
```

Symbol不是一个构造函数，如果用new Symbol会报错（Symbol是一个原始类型的值，不是对象）。
```js
var symbol = new Symbol(); // 报错：TypeError
```

由于Symbol值不是对象，所以不能添加属性。
```js
var symbol = Symbol();
symbol.name = "Alice"; // 报错：TypeError
```

Symbol值可以显式转为字符串，也可以转为布尔值，但是不能转为数值。
```js
var symbol = Symbol("Alice");
console.log(symbol.toString()); // 输出：Symbol(Alice)
console.log(Boolean(symbol)); // 输出：Symbol(Alice)
if (symbol)
	console.log("YES"); // 输出：Yes
console.log(Number(symbol)); // 报错：TypeError
```

### 作为对象属性名的Symbol
由于每一个Symbol值都是不相等的，这意味着Symbol值可以用于对象的属性名，
保证不会出现同名的属性，这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。                            
对象的属性名可以有两种类型，一种是原来的字符串，另一种是新增的Symbol类型。
凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。                                      
通过方括号结构和Object.defineProperty，将对象的属性名指定为一个Symbol值。                                      

方法一：
```js
var name = Symbol();
var obj = {
	[name]: "Alice"
};
```

方法二：
```js
var name = Symbol();
var obj = {};
obj[name] = "Alice";
```

方法三：
```js
var obj = {};
Object.defineProperty(obj, name, { value: 'Alice' });
```

在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中，如果不放在方括号中，该属性名就是字符串，而不是代表的Symbol值。
```js
var name = Symbol();
var obj1 = {
	[name]: "Alice"
};
var obj2 = {
	name: "Bruce"
};
console.log(obj1.name); // 输出：undefined
console.log(obj1[name]); // 输出：Alice
console.log(obj2.name); // 输出：Bruce
console.log(obj2[name]); // 输出：undefined
```

Symbol值作为对象属性名时，不能用点运算符。由于点运算符后面总是字符串，所以不会读取name作为标识名所指代的那个值，
导致属性名实际上是一个字符串，而不是一个Symbol值。
```js
var obj = {};
var name = Symbol();
obj.name = 'Alice';
console.log(obj.name);
console.log(obj[name]);
console.log(obj['name']);
```

### 作为对象函数名的Symbol
```js
var func = Symbol();
var obj = {
	func: function() {
		console.log("YES");
	}
};
obj.func(); // 输出：YES
```

### 获取对象属性的两种方法
- Object.getOwnPropertySymbols()方法：返回只包含Symbol类型的属性名的数组
- Object.getOwnPropertyNames()方法：返回只包含字符串类型的属性名的数组
```js
var obj = {};
var age = Symbol("age");
var job = Symbol("job");
obj[age] = "Alice";
obj[job] = "student";
obj.age = 23;
var symbols = Object.getOwnPropertySymbols(obj);
var names = Object.getOwnPropertyNames(obj);
console.log(symbols.length); // 输出：2
console.log(symbols); // 输出：[Symbol(age), Symbol(job)]
console.log(obj[symbols[0]]); // 输出：Alice
console.log(names.length); // 输出：1
console.log(obj[names[0]]); // 输出：23
```


### Symbol.for()和Symbol.keyFor()方法
#### Symbol.for()方法
类似于单例模式，首先在全局中搜索有没有以该参数为名称的Symbol值，如果有则返回该Symbol值，否则新建并返回一个以该参数为名称的Symbol值。
```js
var symbol1 = Symbol.for('Alice');
var symbol2 = Symbol.for('Alice');
console.log(symbol1 === symbol2) // 输出：true
```

#### Symbol.keyFor()方法
返回一个已创建的Symbol类型值的key，实质是检测该Symbol是否已创建。
```js
var symbol1 = Symbol.for("Alice");
console.log(Symbol.keyFor(symbol1)); // 输出："Alice"
var symbol2 = Symbol("Alice");
console.log(Symbol.keyFor(symbol2)); // 输出：undefined
```













### 参考资料
- [浅谈ES6新增类型Symbol](https://blog.csdn.net/zhouziyu2011/article/details/70854512)
- [Symbol 数据类型在 ES6 中起什么作用？](https://www.jianshu.com/p/425148370333?utm_source=oschina-app)
