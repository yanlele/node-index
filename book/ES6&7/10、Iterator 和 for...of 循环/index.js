/*
var it = ['a', 'b'];
console.log(it.next())*/



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
console.log(iterator.next()) // { value: undefined, done: true }