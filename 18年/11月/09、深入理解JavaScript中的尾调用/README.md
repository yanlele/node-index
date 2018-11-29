# 深入理解JavaScript中的尾调用

[es6 javascript 尾调用](https://blog.csdn.net/qq_30100043/article/details/53406001)                                                 
[深入理解JavaScript中的尾调用(Tail Call)](https://www.jb51.net/article/104875.htm)                           


### 1、什么是尾调用

尾调用是函数式编程里比较重要的一个概念，尾调用的概念非常简单，
一句话就能说清楚，它的意思是在函数的执行过程中，如果最后一个动作是一个函数的调用，
即这个调用的返回值被当前函数直接返回，则称为尾调用。
```javascript
function f(x){
	return g(x);
}
```

上面代码中，函数 f 的最后一步是调用函数 g ，这就叫尾调用。**以下三种情况，都不属于尾调用。**                     
```javascript
//  情况一
function f(x){
	let y = g(x);
	return y;
}
//  情况二
function f(x){
	return g(x) + 1;
}
//  情况三
function f(x){
	g(x);
}
```
上面代码中，情况一是调用函数 g 之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。
```javascript
function f(x){
	g(x);
	return undefined;
}
```

尾调用不一定出现在函数尾部，只要是最后一步操作即可。
```javascript
function f(x) {
	if (x > 0) {
		return m(x)
	}
	return n(x);
}
```
上面代码中，函数 m 和 n 都属于尾调用，因为它们都是函数 f 的最后一步操作。


### 2、尾调用优化
尾调用之所以与其他调用不同，就在于它的特殊的调用位置。                         

我们知道，函数调用会在内存形成一个 “ 调用记录 ” ，又称 “ 调用帧 ” （ call frame ），保存调用位置和内部变量等信息。
如果在函数 A 的内部调用函数 B ，那么在 A 的调用帧上方，还会形成一个 B 的调用帧。
等到 B 运行结束，将结果返回到 A ， B 的调用帧才会消失。
如果函数 B 内部还调用函数 C ，那就还有一个 C 的调用帧，以此类推。
所有的调用帧，就形成一个 “ 调用栈 ” （ call stack ）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。                             
```javascript
function f() {
	let m = 1;
	let n = 2;
	return g(m + n);
}
f();
//  等同于
function f() {
	return g(3);
}
f();
//  等同于
g(3);
```

