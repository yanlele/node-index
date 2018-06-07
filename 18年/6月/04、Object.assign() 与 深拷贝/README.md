# Object.assign()与深拷贝               

> 深拷贝与浅拷贝         

所谓深拷贝与浅拷贝，是围绕引用类型变量的拷贝进行的讨论。            
在ECMAScript中，变量分为基本类型和引用类型两种。其本质区别是不可变性，基本类型是不可变的，而引用类型是可变的。            
所谓基本类型的不可变性，我们可以举个例子            

```javascript
let a = 1;
let b = 1;
a++;
a === 2;//true
b === 1;//true
```

声明一个变量a，并为其赋值1，这时内存中开辟出一片区域用来储存1。此时声明了一个变量b，也为b赋值1。当执行a++时，基本类型的不可变性就体现出来，a++的值应该为2，但是这个值并不会将原来储存1的那片内存覆盖掉，而是再开辟一片内存来存储2。所以对于这个1来讲，他是永远不可变的。            
而对于引用变量则不同，因为其存储的是只想某个内存区域的地址，所以其修改时直接操作在内存上的，这就导致了深拷贝和浅拷贝问题的出现。                

> 浅拷贝

```javascript
let foo = {
    x: 1,
    y: -1
}
let bar = foo;
foo.x++;
foo.x === 2 //true
bar.x === 2 //true
```

这就是最简单的浅拷贝，其效果十分明显，对拷贝源的操作，会直接体现在拷贝目标上，因为这个赋值行为的本质是内存地址的赋值，所以他们指向了同一片内存区域。          
浅拷贝十分容易，也十分常见，但却无法满足需求，假如我们需要获得与拷贝源完全相同，却又不会互相影响的对象，应该怎么办呢              

> Object.assign()               

ES6为我们提供了一种十分好用的方法，Object.assign(target, ...source)方法               
assign方法接受多个参数，第一个参数target为拷贝目标，剩余参数...source是拷贝源。此方法可以将...source中的属性复制到target中，同名属性会进行覆盖，并且在复制过程中实现了'伪'深拷贝                 
```javascript
let foo = {
    a: 1,
    b: 2,
    c: {
        d: 1,
    }
}
let bar = {};
Object.assign(bar, foo);
foo.a++;
foo.a === 2 //true
bar.a === 1 //true
```
乍一看，好像已经实现了深拷贝的效果，对foo.a进行的操作并没有体现在bar.a中,但是再往后看            
```javascript
foo.c.d++;
foo.c.d === 2 //true
bar.c.d === 1 //false
bar.c.d === 2 //true
```

Object.assign()的拷贝类型十分明显了,这是一种可以对非嵌套对象进行深拷贝的方法,如果对象中出现嵌套情况,那么其对被嵌套对象的行为就成了普通的浅拷贝.           
如果真的想进行深拷贝,最简单粗暴地方式就是JSON操作.            

JSON对象中包含两个方法, stringify()和parse(),前者可以将对象JSON化,而后者可以将JSON格式转换为对象.这是一种可以实现深拷贝的方法.           
但这种方法的缺陷是会破坏原型链,并且无法拷贝属性值为function的属性           
所以如果只是想单纯复制一个嵌套对象,可以使用此方法           

```javascript
let foo = {
    a: 1,
    b: {
        c: 1
    }
}
let bar = JSON.parse(JSON.stringify(foo));
```



## 关于一个对象引用和重新拷贝问题的区别问题探究
如果直接赋值对象的方式，改变某一条属性值，那么原对象也会跟着发生改变：例如这样 
```javascript
let Mock  = require('mockjs');

let data = Mock.mock({
    'list|1-10': [{
        'id|+1': Mock.mock('@integer(1,10)'),
        name: Mock.mock('@cname'),
        title: Mock.mock('@ctitle')
    }],
    message: '123'
});

let reData = data;

reData.message = 456;

console.log(data); //结果中，message 为 456
```

但是我们可以用Object.assign的方式来拷贝对象本身，然后赋予新的值，就可以形成一个对象拷贝的模式：
```javascript
let reData = Object.assign({}, data);
reData.message = 456;

console.log('data', data.prototype.name);
console.log('reData', reData);
```
