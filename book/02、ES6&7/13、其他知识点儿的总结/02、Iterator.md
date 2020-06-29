## Iterator

### 什么是迭代器(Iterator)？
满足迭代器协议的对象。                                 
迭代器协议: 对象的next方法是一个无参函数，它返回一个对象，该对象拥有done和value两个属性：

- done(boolean):
    - 如果迭代器已经经过了被迭代序列时为true。这时value可能描述了该迭代器的返回值。
    - 如果迭代器可以产生序列中的下一个值，则为false。这等效于连同done属性也不指定。
- value: 迭代器返回的任何 JavaScript值。done为true时可省略。

### 什么是可迭代对象(Iterable)？
满足可迭代协议的对象是可迭代对象。                       
可迭代协议: 对象的[Symbol.iterator]值是一个无参函数，该函数返回一个迭代器。

在ES6中，所有的集合对象（Array、 Set 与 Map）以及String、arguments都是可迭代对象，它们都有默认的迭代器。                        

可迭代对象可以在以下语句中使用：

- for...of循环
```js
for (let value of ['a', 'b', 'c']) {
  console.log(value);
}
// "a"
// "b"
// "c"
```

- 扩展运算符
```js
[...'abc'];   // ["a", "b", "c"]
console.log(...['a', 'b', 'c']);   // ["a", "b", "c"]
```

- yield*
```js
function* gen() {
  yield* ['a', 'b', 'c'];
}

gen().next(); // { value: "a", done: false }
```

- 解构赋值
```js
let [a, b, c] = new Set(['a', 'b', 'c']);
a;   // 'a'
```

### 理解 for...of 循环
for...of接受一个可迭代对象（Iterable），或者能被强制转换/包装成一个可迭代对象的值（如'abc'）。
遍历时，for...of会获取可迭代对象的`[Symbol.iterator]()`，
对该迭代器逐次调用next()，直到迭代器返回对象的done属性为true时，遍历结束，不对该value处理。

for...of循环实例：
```js
var a = ["a","b","c","d","e"];

for (var val of a) {
	console.log( val );
}
// "a" "b" "c" "d" "e"
```

转换成普通for循环示例，等价于上面for...of循环：
```js
var a = ["a","b","c","d","e"];

for (var val, ret, it = a[Symbol.iterator]();
	(ret = it.next()) && !ret.done;
) {
	val = ret.value;
	console.log( val );
}
// "a" "b" "c" "d" "e"
```


### 参考资料
- [ES6 迭代器(Iterator)和 for...of循环使用方法](https://www.jianshu.com/p/3bb77516fa7e)
- [理解ES6的 Iterator 、Iterable 、 Generator](https://github.com/yueshuiniao/blog/issues/2)
