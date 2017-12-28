/*//3.1  数组的结构赋值

const [a,b,c]=[1,2,3];
console.log({a,b,c});*/


/*
//3.2  对象的解构赋值
//实例1
var obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};
var { p: [x, { y }] } = obj;
x // "Hello"
y // "World"*/

//实例2
// let node={
//     yanle:{
//         start:{
//             name:1,
//             age:25
//         }
//     }
// };
//
// let {yanle}=node;
// console.log(node);

//实例3：指定默认值
/*
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1
y // 5
var {x:y = 3} = {};
y // 3
var {x:y = 3} = {x: 5};
y // 5
var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
*/

/*
//3.4
let {toString: s} = 123;
s === Number.prototype.toString // true
let {toString: s} = true;
s === Boolean.prototype.toString // true
*/


//3.5
//实例1
// function add([x, y]){
//     return x + y;
// }
// add([1, 2]); // 3

//实例2：
// function move({x = 0, y = 0} = {}) {
//     return [x, y];
// }
// move({x: 3, y: 8}); // [3, 8]
// move({x: 3}); // [3, 0]
// move({}); // [0, 0]
// move(); // [0, 0]

//实例3：
/*function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]*/

//7、用途
/*//  返回一个数组
function example() {
    return [1, 2, 3];
}
var [a, b, c] = example();

//  返回一个对象
function example() {
    return {
        foo: 1,
        bar: 2
    };
}
var { foo, bar } = example();*/

/*
function f({x, y, z}) {
    return {
        x, y, z
    }
}

console.log(f({z: 3, y: 2, x: 1}));
*/





