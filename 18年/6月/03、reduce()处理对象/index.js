/*let data = {
    name: 'yanle',
    age: 26,
    address: 'chongqing'
};

let reData = {};
Object.keys(data).forEach(function( key) {
    if(data[key] !== 26) {
       reData[key] = data[key]
    }
});
console.log(data);
console.log(reData);*/

/*基本demo*/
[0, 1, 2, 3, 4].reduce(function (accumulator, currentValue, currentIndex, array) {
    return accumulator + currentValue;
});

/*如果你打算提供一个初始值作为reduce()方法的第二个参数，以下是运行过程及结果：*/
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + currentValue;
}, 10);

/*举一个例子*/
let initialValue = 0;
let sum = [{x: 1}, {x: 2}, {x: 3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
}, initialValue);
// sum 6

/*将二维数组转化为一维*/
let flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    function (a, b) {
        return a.concat(b);
    },
    []
);
// flattened is [0, 1, 2, 3, 4, 5]


/*计算数组中每个元素出现的次数*/
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
let countedNames = names.reduce(function (allNames, name) {
    if (name in allNames) {
        allNames[name]++;
    } else {
        allNames[name] = 1;
    }
    return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }


/*按属性对object分类*/
let people = [
    {name: 'Alice', age: 21},
    {name: 'Max', age: 20},
    {name: 'Jane', age: 20}
];

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

let groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }


/*使用扩展运算符和initialValue绑定包含在对象数组中的数组*/
// friends - 对象数组
// where object field "books" - list of favorite books
var friends = [{
    name: 'Anna',
    books: ['Bible', 'Harry Potter'],
    age: 21
}, {
    name: 'Bob',
    books: ['War and peace', 'Romeo and Juliet'],
    age: 26
}, {
    name: 'Alice',
    books: ['The Lord of the Rings', 'The Shining'],
    age: 18
}];

// allbooks - list which will contain all friends' books +
// additional list contained in initialValue
var allbooks = friends.reduce(function (prev, curr) {
    return [...prev, ...curr.books];
}, ['Alphabet']);

// allbooks = [
//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
//   'Romeo and Juliet', 'The Lord of the Rings',
//   'The Shining'
// ]


/*数组去重*/
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let result = arr.sort().reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
        init.push(current);
    }
    return init;
}, []);
console.log(result); //[1,2,3,4,5]


/*按顺序运行Promise*/
/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
    return arr.reduce(
        (promiseChain, currentFunction) => promiseChain.then(currentFunction),
        Promise.resolve(input)
    );
}

// promise function 1
function p1(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 5);
    });
}

// promise function 2
function p2(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 2);
    });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
    return a * 3;
}

// promise function 4
function p4(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 4);
    });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10)
    .then(console.log);   // 1200


/*Polyfill*/
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
if (!Array.prototype.reduce) {
    Object.defineProperty(Array.prototype, 'reduce', {
        value: function(callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError( 'Array.prototype.reduce ' +
                    'called on null or undefined' );
            }
            if (typeof callback !== 'function') {
                throw new TypeError( callback +
                    ' is not a function');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // Steps 3, 4, 5, 6, 7
            var k = 0;
            var value;

            if (arguments.length >= 2) {
                value = arguments[1];
            } else {
                while (k < len && !(k in o)) {
                    k++;
                }

                // 3. If len is 0 and initialValue is not present,
                //    throw a TypeError exception.
                if (k >= len) {
                    throw new TypeError( 'Reduce of empty array ' +
                        'with no initial value' );
                }
                value = o[k++];
            }

            // 8. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kPresent be ? HasProperty(O, Pk).
                // c. If kPresent is true, then
                //    i.  Let kValue be ? Get(O, Pk).
                //    ii. Let accumulator be ? Call(
                //          callbackfn, undefined,
                //          « accumulator, kValue, k, O »).
                if (k in o) {
                    value = callback(value, o[k], k, o);
                }

                // d. Increase k by 1.
                k++;
            }

            // 9. Return accumulator.
            return value;
        }
    });
}
