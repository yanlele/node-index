function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }


/*function* f() {
    for(var i=0; true; i++) {
        var reset = yield i;
        if(reset) { i = -1; }
    }
}
var g = f();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }*/


/*function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:4、通信类, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:4、通信类, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }*/

/*
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
// 1 2 3 4 5*/


/*
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
// last: Doe*/


/*function* numbers() {
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
// 2*/


/*
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
*/


/*function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
g.next() // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next() // { value: undefined, done: true }*/


/*
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
// "y"*/


/*
let obj = {
    * myGeneratorMethod() {
        ···
    }
};*/

/*
function* g() {
}

g.prototype.hello = function () {
    return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!'*/


/*function* F() {
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
obj.c // 3*/


/*var ticking = true;
var clock = function() {
    if (ticking)
        console.log('Tick!');
    else
        console.log('Tock!');
    ticking = !ticking;
}*/

/*
var clock = function*() {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};*/


/*
function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}

var loader = loadUI();
//  加载 UI
loader.next()
//  卸载 UI
loader.next()*/

/*
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
*/

/*function* numbers() {
    let file = new FileReader("numbers.txt");
    try {
        while (!file.eof) {
            yield parseInt(file.readLine(), 10);
        }
    } finally {
        file.close();
    }
}*/


/*
step1(function (value1) {
    step2(value1, function (value2) {
        step3(value2, function (value3) {
            step4(value3, function (value4) {
                // Do something with value4
            });
        });
    });
});*/


/*Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) {
        // Do something with value4
    }, function (error) {
        // Handle any error from step1 through step4
    })
    .done();*/

/*
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
*/

/*scheduler(longRunningTask(initialValue));
function scheduler(task) {
    var taskObj = task.next(task.value);
    //如果 Generator 函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}*/

/*
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
*/

/*function* iterEntries(obj) {
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]]
    }
}

let myObj = {foo: 3, bar: 7};
for (let [key, value] of iterEntries(myObj)) {
    console.log(key, value);
}*/


























