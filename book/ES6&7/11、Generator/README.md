# Generator  函数   （重要）
### 1、简介
#### 1.1、基本概念
执行 Generator 函数会返回一个遍历器对象，也就是说， Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。               
形式上， Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态（ yield 语句在英语里的意思就是 “ 产出 ” ）。             
实例1：基本使用            
```javascript
    function* helloWorldGenerator() {
        yield 'hello';
        yield 'world';
        return 'ending';
    }
    
    var hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield语句 “hello” 和 “world” ，即该函数有三个状态： hello ， world 和 return 语句（结束执行）。          
然后， Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（ Iterator Object ）。          
下一步，必须调用遍历器对象的 next 方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之， Generator 函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。          
实例1执行结果     
```javascript
    hw.next()
    // { value: 'hello', done: false }
    hw.next()
    // { value: 'world', done: false }
    hw.next()
    // { value: 'ending', done: true }
    hw.next()
    // { value: undefined, done: true }
```

第一次调用， Generator 函数开始执行，直到遇到第一个yield语句为止。next方法返回一个对象，它的value属性就是当前yield语句的值hello ，done属性的值 false ，表示遍历还没有结束。           
第二次调用， Generator 函数从上次yield语句停下的地方，一直执行到下一个yield语句。next方法返回的对象的value属性就是当前yield语句的值world ，done属性的值 false ，表示遍历还没有结束。            
第三次调用， Generator 函数从上次yield语句停下的地方，一直执行到return语句（如果没有 return 语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为 undefined ），done属性的值 true ，表示遍历已经结束。           
第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为 undefined ，done属性为 true 。以后再调用next方法，返回的都是这个值。          
总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。           

#### 1.2、yield 语句
由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。         
- （ 1 ）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
- （ 2 ）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。
- （ 3 ）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
- （ 4 ）如果该函数没有return语句，则返回的对象的value属性值为undefined。

实例2：            
```javascript
    function* gen() {
        yield 123 + 456;
    }
```

### 2、next 方法的参数
yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。            
实例1：            
```javascript
    function* f() {
        for(var i=0; true; i++) {
            var reset = yield i;
            if(reset) { i = -1; }
        }
    }
    
    var g = f();
    g.next() // { value: 0, done: false }
    g.next() // { value: 1, done: false }
    g.next(true) // { value: 0, done: false }
```

实例2：来一个复杂而全面的例子     
```javascript
    function* foo(x) {
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
    }
    
    var a = foo(5);
    a.next() // Object{value:6, done:false}
    a.next() // Object{value:NaN, done:false}
    a.next() // Object{value:NaN, done:true}
    
    var b = foo(5);
    b.next() // { value:6, done:false }
    b.next(12) // { value:8, done:false }
    b.next(13) // { value:42, done:true }
```

### 3、for...of 循环           
for...of循环可以自动遍历 Generator 函数时生成的Iterator对象，且此时不再需要调用next方法。            
实例1：最基础使用           
```javascript
    function* foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
        return 6;
    }
    
    for (let v of foo()) {
        console.log(v);
    }
    // 1 2 3 4 5
```
上面代码使用for...of循环，依次显示 5 个yield语句的值。这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的 6 ，不包括在for...of循环之中。            


利用for...of循环，可以写出遍历任意对象（ object ）的方法。原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。      
实例2：        
```javascript
    function* objectEntries(obj) {
        let propKeys = Reflect.ownKeys(obj);
        for (let propKey of propKeys) {
            yield [propKey, obj[propKey]];
        }
    }
    
    let jane = { first: 'Jane', last: 'Doe' };
    
    for (let [key, value] of objectEntries(jane)) {
        console.log(`${key}: ${value}`);
    }
    // first: Jane
    // last: Doe
```

实例3：除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。           
```javascript
    function* numbers() {
        yield 1
        yield 2
        return 3
        yield 4
    }
    
    //  扩展运算符
    [...numbers()] // [1, 2]
    
    // Array.form  方法
    Array.from(numbers()) // [1, 2]
    
    //  解构赋值
    let [x, y] = numbers();
    x // 1
    y // 2
    
    // for...of  循环
    for (let n of numbers()) {
        console.log(n)
    }
    // 1
    // 2
```

### 4、Generator.prototype.throw()           
Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。          
实例：基本使用         
```javascript
    var g = function* () {
        try {
            yield;
        } catch (e) {
            console.log(' 内部捕获 ', e);
        }
    };
    
    var i = g();
    i.next();
    
    try {
        i.throw('a');
        i.throw('b');
    } catch (e) {
        console.log(' 外部捕获 ', e);
    }
    //  内部捕获 a
    //  外部捕获 b
```

### 5、Generator.prototype.return()          
Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数。         
实例1：基本使用            
```javascript
    function* gen() {
        yield 1;
        yield 2;
        yield 3;
    }
    
    var g = gen();
    g.next() // { value: 1, done: false }
    g.return('foo') // { value: "foo", done: true }
    g.next() // { value: undefined, done: true }
```

### 6、yield* 语句
如果在 Generater 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。      
实例1：基本使用        
```javascript
    function* foo() {
        yield 'a';
        yield 'b';
    }
    
    function* bar() {
        yield 'x';
        foo();
        yield 'y';
    }
    
    for (let v of bar()) {
        console.log(v);
    }
    // "x"
    // "y"
```


### 7、作为对象属性的 Generator 函数
如果一个对象的属性是 Generator 函数，可以简写成下面的形式。         
实例：基础用法             
```javascript
    let obj = {
        * myGeneratorMethod() {
            ···
        }
    };
```

### 8、Generator 函数的 this
Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法。           
实例1：            
```javascript
    function* F() {
        this.a = 1;
        yield this.b = 2;
        yield this.c = 3;
    }
    
    var obj = {};
    var f = F.call(obj);
    
    f.next(); // Object {value: 2, done: false}
    f.next(); // Object {value: 3, done: false}
    f.next(); // Object {value: undefined, done: true}
    obj.a // 1
    obj.b // 2
    obj.c // 3
```


### 9、含义
#### 9.1 Generator 与状态机         
实例：         
```javascript
    var clock = function*() {
        while (true) {
            console.log('Tick!');
            yield;
            console.log('Tock!');
            yield;
        }
    };
```
Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。          

### 10  应用

Generator 可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景。      

#### 10.1、异步操作的同步化表达        
Generator 函数的暂停执行的效果，意味着可以把异步操作写在 yield 语句里面，等到调用 next 方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在 yield 语句下面，反正要等到调用 next 方法时再执行。所以， Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。         
实例1：基本使用方式          
```javascript
    function* loadUI() {
        showLoadingScreen();
        yield loadUIDataAsynchronously();
        hideLoadingScreen();
    }
    
    var loader = loadUI();
    //  加载 UI
    loader.next()
    //  卸载 UI
    loader.next()
```

实例2：Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达。

```javascript
    function* main() {
        var result = yield request("http://some.url");
        var resp = JSON.parse(result);
        console.log(resp.value);
    }
    
    function request(url) {
        makeAjaxCall(url, function (response) {
            it.next(response);
        });
    }
    
    var it = main();
    it.next();
```

实例3:通过 Generator 函数逐行读取文本文件。            
```javascript
    function* numbers() {
        let file = new FileReader("numbers.txt");
        try {
            while (!file.eof) {
                yield parseInt(file.readLine(), 10);
            }
        } finally {
            file.close();
        }
    }
```

#### 10.2、控制流管理     
如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。         
实例1：            
```javascript
    step1(function (value1) {
        step2(value1, function (value2) {
            step3(value2, function (value3) {
                step4(value3, function (value4) {
                    // Do something with value4
                });
            });
        });
    });
    
    //采用 Promise 改写上面的代码。
    Promise.resolve(step1)
        .then(step2)
        .then(step3)
        .then(step4)
        .then(function (value4) {
            // Do something with value4
        }, function (error) {
            // Handle any error from step1 through step4
        })
        .done();
    
    //上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。 Generator 函数可以进一步改善代码运行流程。
    function* longRunningTask(value1) {
        try {
            var value2 = yield step1(value1);
            var value3 = yield step2(value2);
            var value4 = yield step3(value3);
            var value5 = yield step4(value4);
            // Do something with value4
        } catch (e) {
            // Handle any error from step1 through step4
        }
    }
    
    //然后，使用一个函数，按次序自动执行所有步骤。
    scheduler(longRunningTask(initialValue));
    function scheduler(task) {
        var taskObj = task.next(task.value);
        //如果 Generator 函数未结束，就继续调用
        if (!taskObj.done) {
            task.value = taskObj.value
            scheduler(task);
        }
    }
```

#### 10.3、部署 Iterator 接口        
利用 Generator 函数，可以在任意对象上部署 Iterator 接口。         
```javascript
    function* iterEntries(obj) {
        let keys = Object.keys(obj);
        for (let i=0; i < keys.length; i++) {
            let key = keys[i];
            yield [key, obj[key]];
        }
    }
    
    let myObj = { foo: 3, bar: 7 };
    for (let [key, value] of iterEntries(myObj)) {
        console.log(key, value);
    }
    // foo 3
    // bar 7
```




























