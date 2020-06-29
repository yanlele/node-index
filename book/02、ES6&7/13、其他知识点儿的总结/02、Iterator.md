## Iterator

### 什么是迭代器(Iterator)？
满足迭代器协议的对象。                                 
迭代器协议: 对象的next方法是一个无参函数，它返回一个对象，该对象拥有done和value两个属性：

- done(boolean):
    - 如果迭代器已经经过了被迭代序列时为true。这时value可能描述了该迭代器的返回值。
    - 如果迭代器可以产生序列中的下一个值，则为false。这等效于连同done属性也不指定。
- value: 迭代器返回的任何 JavaScript值。done为true时可省略。




### 参考资料
- [ES6 迭代器(Iterator)和 for...of循环使用方法](https://www.jianshu.com/p/3bb77516fa7e)
- [理解ES6的 Iterator 、Iterable 、 Generator](https://github.com/yueshuiniao/blog/issues/2)
