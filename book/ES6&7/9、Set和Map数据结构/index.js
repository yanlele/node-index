/*//1.2、
s.add(1).add(2).add(2);
//  注意 2 被加入了两次
s.size // 2
s.has(1) // true
s.has(2) // true
s.has(3) // false
s.delete(2);
s.has(2) // false*/


/*//1.3  遍历方法
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
    console.log(item);
}
// red
// green
// blue
for (let item of set.values()) {
    console.log(item);
}
// red
// green
// blue
for (let item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]*/

/*2*/
/*
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo); // false

ws.delete(window);
ws.has(window); // false
*/

/*//实例2：作为构造函数， Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
var map = new Map([
    ['name', ' 张三 '],
    ['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // " 张三 "
map.has('title') // true
map.get('title') // "Author"*/


//遍历方法
/*
let map = new Map([
    ['F', 'no'],
    ['T', 'yes'],
]);

for (let key of map.keys()) {
    console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
    console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

//  或者
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
//  等同于使用 map.entries()
for (let [key, value] of map) {
    console.log(key, value);
}*/


/*
//实例2：map 过滤
let map0 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
let map1 = new Map(
    [...map0].filter(([k, v]) => k < 3)
);
//  产生 Map 结构 {1 => 'a', 2 => 'b'}
let map2 = new Map(
    [...map0].map(([k, v]) => [k * 2, '_' + v])
);
//  产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}*/



/* 与其他数据结构的互相转换*/
/*//实例1： Map 转为数组
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]*/

/*//实例2：将数组转入 Map 构造函数，就可以转为 Map 。
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map {true => 7, Object {foo: 3} => ['abc']}*/

/*
//实例3： Map 转为对象，如果所有 Map 的键都是字符串，它可以转为对象。
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
*/


/*//实例4：对象转为 Map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
objToStrMap({yes: true, no: false})
// [ [ 'yes', true ], [ 'no', false ] ]*/


/*//实例5： Map 转为 JSON  一种情况是， Map 的键名都是字符串，这时可以选择转为对象 JSON 。
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'*/

/*//实例6： Map 的键名有非字符串，这时可以选择转为数组 JSON 。
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'*/


/*//实例7、JSON 转为 Map  JSON 转为 Map ，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes":true,"no":false}')
// Map {'yes' => true, 'no' => false}*/










