/*
var it = ['a', 'b'];
console.log(it.next())*/

/*
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
};
var iterator = generator();
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
console.log(iterator.next()) // { value: undefined, done: true }*/

/*
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }*/


/*调用 Iterator 接口的场合*/
/*
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
// x='a'; y='b'
let [first, ...rest] = set;
// first='a'; rest=['b','c'];*/


/*//  例一
var str = 'hello';
[...str] // ['h','e','l','l','o']
//  例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']*/


/*
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
};
var iterator = generator();
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }*/


/*Iterator 接口与 Generator 函数*/
/*var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
//  或者采用下面的简洁写法
let obj = {
    * [Symbol.iterator]() {
        yield 'hello';
        yield 'world';
    }
};
for (let x of obj) {
    console.log(x);
}
// hello
// world*/


/*数组的for of*/
/*const arr = ['red', 'green', 'blue'];
let iterator = arr[Symbol.iterator]();
for(let v of arr) {
    console.log(v); // red green blue
}
for(let v of iterator) {
    console.log(v); // red green blue
}*/


/*var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
    console.log(a); // 0 1 2 3
}

for (let a of arr) {
    console.log(a); // a b c d
}*/


/*
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
    console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
    console.log(i); // "3", "5", "7"
}*/


//set和map数据结构下面的Iterator接口
/*var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
    console.log(e);
}
// Gecko
// Trident
// Webkit
var es6 = new Map();
es6.set("edition", 4、通信类);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
    console.log(name + ": " + value);
}
// edition: 4、通信类
// committee: TC39
// standard: ECMA-262*/


/*
let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
    console.log(pair);
}
// ['a', 1]
// ['b', 2]
for (let [key, value] of map) {
    console.log(key + ' : ' + value);
}
// a : 1
// b : 2*/


/*
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
    console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']*/


/*var es6 = {
    edition: 6,
    committee: "TC39",
    standard: "ECMA-262"
};

for (e in es6) {
    console.log(e);
}
// edition
// committee
// standard

for (e of es6) {
    console.log(e);
}
// TypeError: es6 is not iterable*/


/*for (var key of Object.keys(someObject)) {
    console.log(key + ": " + someObject[key]);
}*/


/*function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
for (let [key, value] of entries(obj)) {
    console.log(key, "->", value);
}
// a -> 1
// b -> 2
// c -> 3*/
