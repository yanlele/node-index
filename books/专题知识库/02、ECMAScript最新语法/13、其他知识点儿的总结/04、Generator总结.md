## Generator

目录
- [1.Generator](#1.generator)
- [2.yield [[expression]]](#2.yield-[[expression]])
- [3.next方法的参数](#3.next方法的参数)
- [4.for…of循环](#4.for…of循环)
- [5.async/await](#5.async/await)
- [6.Promise和async使用场景](#6.promise和async使用场景)


### 1.Generator                     

从计算机角度看，生成器是一种类协程或半协程，它提供了一种可以通过特定语句或方法使其执行对象暂停的功能。                                     
​Generator函数，返回一个部署了Iterator接口的遍历器对象，用来操作内部指针。
以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。                         

### 2.yield [[expression]]                        

yield 关键字使生成器函数暂停执行，并返回跟在它后面的表达式的当前值。
可以把它想成是return关键字的一个基于生成器的版本，但其并非退出函数体，而是切出当前函数的运行时，
与此同时可以将一个值带到主线程中。yield语句是暂停执行的标记，而next方法可以恢复执行。                         
```javascript
function* gen(){
  yield 'li';
  yield 'gang'; // 有误！！！
  return '!';
}
var g = gen();
g.next(); // {value: 'li', done: false}
g.next(); // {value: 'gang', done: false}
g.next(); // {value: '!', done: true}
```
（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值；                          
（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句；                             
（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值；                             
（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。                           

需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```javascript
function* gen() {
  yield  123 + 456;
}
```
上述示例中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。
Generator函数也可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。                          
```javascript
function* f() {
  console.log('执行了！')
}
let gen = f();
setTimeout(function () {
  gen.next()
}, 2000);
```

### 3.next方法的参数                   
注意： yield句本身没有返回值（返回undefined）。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next();  // Object{value:6, done:false}
a.next();  // Object{value:NaN, done:false}
a.next();  // Object{value:NaN, done:true}

var b = foo(5);
b.next();   // { value:6, done:false }
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }
``` 
next方法不带参数，导致y的值等于2 * undefined（即NaN），除以3以后还是NaN；
next方法提供参数，第一次调用b的next方法时，返回x+1的值6；
第二次调用next方法，将上一次yield语句的值设为12，因此y等于24，返回y/3的值8。 

注意：这个功能有很重要的语法意义。Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。
也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
```javascript
function* f() {
  for(let i=0; true; i++) {
    let reset = yield i;
    if(reset) { i = -1; }
  }
}

let g = f();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

### 4.for…of循环                        
for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。
```javascript
function *foo() {
  yield 1;
  yield 2;
  return 3;
}
for (let v of foo()) {
  console.log(v);
}
```

利用Generator函数和for...of循环，实现斐波那契数列                       
```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}
for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

**yield* [[expression]]**                       
yield* 一个可迭代对象，就相当于把这个可迭代对象的所有迭代值分次 yield 出去。
表达式本身的值就是当前可迭代对象迭代完毕（当done为true时）时的返回值。                         
```javascript
function* gen(){
  yield [1, 2];
  yield* [3, 4];
}
var g = gen();
g.next(); // {value: Array[2], done: false}
g.next(); // {value: 3, done: false}
g.next(); // {value: 4, done: false}
g.next(); // {value: undefined, done: true}
```

**判断是否为Generator函数**                    
```javascript
function isGenerator(fn){
  // 生成器示例必带@@toStringTag属性
  if(Symbol && Symbol.toStringTag) {
    return fn[Symbol.toStringTag] === 'GeneratorFunction';
  }
}
```

### 5.async/await                   

async函数可以理解为Generator函数的语法糖，使用async内置了执行器，无需调用next方法进行逐步调用。且其返回值为Promise。

**基本用法**                    
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

正常情况下，await命令后是一个Promise对象。如果不是，会被转成一个立即resolve的Promise对象。                  
await只能用在async函数中，不能用在普通函数中

await后面可能存在reject，需要进行try…catch代码块中                 
多个异步操作，如果没有继承关系，最好同时触发

### 6.Promise和async使用场景                         
一个过程中同时存在异步、同步情况，请使用Promise                     
```javascript
/*常规方式，错误！不能实现*/
function test(bool) {
  // bool为true，直接返回"hello"
  // bool为false，进行异步请求，这里使用setTimeout代替异步过程
  if(bool) {
    return "hello";
  } else {
    setTimeout(() => {
      return "world";
    }, 5000); 
  }
}
test(true);  // "hello"
test(false); // 无任何输出内容

/*Promise正确方式*/
function test(bool) {
  // bool为true，直接返回"hello"
  // bool为false，进行异步请求，这里使用setTimeout代替异步过程
  return new Promise((resolve, reject) => {
    if(bool) {
        return resolve("hello");
    } else {
        setTimeout(() => {
          return resolve("world");
        }, 5000); 
    }
  });
}
test(true).then(v => console.log(v));   // 'hello'
test(false).then(v => console.log(v));  // 大约5s后输出 'world'
```

包裹本身不支持async的函数，且hold住当前请求
```javascript
import fs from "fs";

async function readFile(filepath) {
    return await new Promise((resolve, reject) => {
        fs.stat(filepath, (error) => {
            if(error) {
                return reject("文件不存在！");
            }
            let content = fs.readFileSync(filepath, "utf8");
            return resolve(content);
        })
    })
}
// 测试
readFile(__filename).then((content) => {
    console.log(content)
}).catch((error) => {
    console.error(error);
});
```