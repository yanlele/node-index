# 数组的扩展

<!-- toc -->

- [1、Array.from()](#1arrayfrom)
- [2、Array.of()](#2arrayof)
- [3、数组实例的 copyWithin()](#3%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-copywithin)
- [4、数组实例的 find() 和 findIndex() - 非常重要](#4%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-find-%E5%92%8C-findindex------%E9%9D%9E%E5%B8%B8%E9%87%8D%E8%A6%81)
- [5、数组实例的 fill()](#5%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-fill)
- [6、 数组实例的 entries() ， keys() 和 values()](#6-%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-entries--keys-%E5%92%8C-values)
- [7、数组实例的 includes()](#7%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-includes)

<!-- tocstop -->

#### 1、Array.from()            
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（ array-like object ）和可遍历（ iterable ）的对象（包括 ES6 新增的数据结构 Set 和Map ）。

实例1：            
```javascript
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    // ES6 的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```                 

实例2：实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
```javascript
    // NodeList 对象
    let ps = document.querySelectorAll('p');
    Array.from(ps).forEach(function (p) {
        console.log(p);
    });
    // arguments 对象
    function foo() {
        var args = Array.from(arguments);
    // ...
    }
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。               
实例3：            
```javascript
    Array.from(arrayLike, x => x * x);
    //  等同于
    Array.from(arrayLike).map(x => x * x);
    Array.from([1, 2, 3], (x) => x * x)
    // [1, 4, 9]
```

#### 2、Array.of()          
Array.of方法用于将一组值，转换为数组。             
```javascript
    Array.of(3, 11, 8) // [3,11,8]
    Array.of(3) // [3]
    Array.of(3).length // 1
```  

#### 3、数组实例的 copyWithin()          
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。                
```javascript
语法：Array.prototype.copyWithin(target, start = 0, end = this.length)             
```                     
target （必需）：从该位置开始替换数据的下标位置。             
start （可选）：从该位置开始读取数据，默认为 0 。如果为负值，表示倒数。        
end （可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。           

实例：         
```javascript
    [1, 2, 3, 4, 5].copyWithin(0, 3)
    // [4, 5, 3, 4, 5]
    
    //  将 3 号位复制到 0 号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4)
    // [4, 2, 3, 4, 5]
    // -2 相当于 3 号位， -1 相当于 4 号位
    [1, 2, 3, 4, 5].copyWithin(0, -2, -1)
    // [4, 2, 3, 4, 5]
    //  将 3 号位复制到 0 号位
    [].copyWithin.call({length: 5, 3: 1}, 0, 3)
    // {0: 1, 3: 1, length: 5}
    //  将 2 号位到数组结束，复制到 0 号位
    var i32a = new Int32Array([1, 2, 3, 4, 5]);
    i32a.copyWithin(0, 2);
    // Int32Array [3, 4, 5, 4, 5]
    //  对于没有部署 TypedArray 的 copyWithin 方法的平台
    //  需要采用下面的写法
    [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
    // Int32Array [4, 2, 3, 4, 5]
```

#### 4、数组实例的 find() 和 findIndex()   -  非常重要            
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。               
实例1：                
```javascript
    [1, 5, 10, 15].find(function(value, index, arr) {
        return value > 9;
    }) // 10
```
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。            
实例2：            
```javascript
    [1, 5, 10, 15].findIndex(function(value, index, arr) {
        return value > 9;
    }) // 2
```

#### 5、数组实例的 fill()            
fill方法使用给定值，填充一个数组。             
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。              
实例:         
```javascript
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

#### 6、 数组实例的 entries() ， keys() 和 values()
ES6 提供三个新的方法 —— entries()，keys()和values() —— 用于遍历数组。它们都返回一个遍历器对象（详见《 Iterator 》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。             
实例：             
```javascript
for (let index of ['a', 'b'].keys()) {
    console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
    console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

#### 7、数组实例的 includes()                
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于 ES7 ，但 Babel 转码器已经支持。          
实例：         
```javascript
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```
