const _ = require('lodash');

var users = [
    { 'user': 'barney', 'age': 36 },
    { 'user': 'fred', 'age': 40 },
    { 'user': 'pebbles', 'age': 18 }
];
var nums = [1, 2, 3];

/*****************************查找****************************************/
var names = _
    .chain(users)
    .map(function (o) {
        return o.user;
    })
    .join(",")
    .value();
console.log(names);
// => barney,fred,pebbles

console.log(_.find(users, function (o) { return o.age >= 40; }));
// => object for 'fred'

/******************************查找***************************************/
var oldest = _
    .chain(users)
    .sortBy('age')
    .map(function (o) {
        return '最年长的是：' + o.user + ' is ' + o.age;
    })
    .last()
    .value();
console.log(oldest);
// => 最年长的是：fred is 40

/*************************************************************************/
var youngest = _
    .chain(users)
    .sortBy('age')
    .map(function (o) {
        return '最年轻的是：' + o.user + ' is ' + o.age;
    })
    .head()
    .value();
console.log(youngest);
// => 最年轻的是：pebbles is 18

/*************************************************************************/
var userObj = _.chain(users)
    .map(function (o) {
        return [o.user, o.age];
    })
    .value();
console.log(userObj[0]);
// => ["barney", 36]

/*************************************************************************/
/*
    创建一个新数组，包含原数组中所有的非假值元素。
    例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
*/
var compact = _.compact([0, 1, false, 2, '', 3]);
console.log(compact);
// => [1, 2, 3]

/*************************************************************************/
/*  _.difference(array, [values])
    array (Array): 要检查的数组。
    [values] (...Array): 排除的值。
*/
//var difference = _.difference([3, 2, 1], [4, 2]);
console.log(_.difference([3, 2, 1], [4, 2]));
// => [3, 1]

/*************************************************************************/
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var differenceWith = _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
console.log(differenceWith);
// => [{ 'x': 2, 'y': 1 }]

/*************************************************************************/
//创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
console.log(_.drop(nums, nums.length - 1));
// => [3]

/*************************************************************************/
//创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）
console.log(_.dropRight(nums, nums.length - 1));
// => [1]

/*************************************************************************/
console.log(_.dropWhile(users, function (o) { return o.age == 36; }));
// => objects for ['fred', 'pebbles']

/*************************************************************************/
//返回找到元素的 索引值（index），找不到则返回 -1。
console.log(_.findIndex(users, function (o) { return o.user == 'fred'; }));
// => 1

/*************************************************************************/
console.log(_.head([3, 2, 1]));
console.log(_.first([3, 2, 1]));
// => 3

/*************************************************************************/
//返回 值value在数组中的索引位置, 没有找到为返回-1。
console.log(_.indexOf([1, 2, 3, 2], 2));
// => 1

/*************************************************************************/
//去除数组array中的最后一个元素
console.log(_.initial([1, 2, 3]));
// => [1, 2]

/*************************************************************************/
//返回一个包含所有传入数组交集元素的新数组
console.log(_.intersection([2, 1], [4, 2], [1, 2]));
// => [2]

/*************************************************************************/
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
console.log(_.intersectionWith(objects, others, _.isEqual));
// => [{ 'x': 1, 'y': 2 }]

console.log(_.join(['a', 'b', 'c'], ','));
// => a,b,c

//返回array中的最后一个元素
console.log(_.last([1, 2, 3]));
// => 3

//获取array数组的第n个元素 索引从0开始，如果n为负数，则返回从数组结尾开始的第n个元素
console.log(_.nth([1, 2, 3], 1));
// => 2
console.log(_.nth([1, 2, 3, 4], -1));
// => 4

/*************************************************************************/
//移除数组array中所有和给定值相等的元素
console.log(_.pull([1, 2, 3, 1, 2, 3], 2, 3));
// => [1, 1]
console.log(_.pullAll([1, 2, 3, 1, 2, 3], [2, 3]));
// => [1, 1]

//这个方法类似于_.pullAll
//区别是这个方法接受一个 iteratee（迭代函数），通过产生的值进行了比较。
console.log(_.pullAllBy(
    [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }],
    [{ 'x': 1 }, { 'x': 3 }],
    'x'));
// => [{ 'x': 2 }]

console.log(_.pullAllWith(
    [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }],
    [{ 'x': 3, 'y': 4 }],
    _.isEqual));
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]

/*************************************************************************/
//返回被移除元素组成的新数组。
var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);
console.log(array);
// => [5, 15]
console.log(evens);
// => [10, 20]

/*************************************************************************/
//返回被移除元素组成的新数组。
var array = [1, 2, 3, 4];
var evens = _.remove(array, function (n) {
    return n % 2 == 0;
});
console.log(array);
// => [1, 3]
console.log(evens);
// => [2, 4]

console.log(_.reverse([1, 2, 3]));
// => [3, 2, 1]

//_.slice(array, [start=0], [end=array.length])
//裁剪数组array，从 start 位置开始到end结束，但不包括 end 本身的位置
console.log(_.slice([1, 2, 3], 1));
// => [2, 3]

//返回一个新的不重复的数组
console.log(_.uniq([1, 1, 2, 1, 1, 2, 3]));
// => [1, 2, 3]
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
console.log(_.uniqWith(objects, _.isEqual));
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]

/*************************************************************************/
var arr = [
    { name: 'aa', age: 22 },
    { name: 'bb', age: 18 },
    { name: 'cc', age: 40 }
];
console.log(_.sortBy(arr, function (o) { return o.age; }));
console.log(_.sortBy(arr, ['age']));  //可多字段排序['name','age']

console.log(_.groupBy([6.1, 4.2, 6.6], Math.floor));
// => { '4': [4.2], '6': [6.1, 6.3] }

/*****************************循环***************************************/
_([1, 2]).forEach(function (value) {
    console.log(value);
});
// => Logs '1' then '2'

_.forEach({ 'a': 1, 'b': 2 }, function (value, key) {
    console.log(key + " " + value);
});
// => Logs 'a 1' then 'b 2'


/*****************************查找***************************************/
var collection1 = [
    { name: 'aa', age: 20, gender: 'm' },
    { name: 'bb', age: 21, gender: 'f' },
    { name: 'cc', age: 22, gender: 'm' }
];

/*****************************包含***************************************/
console.log(_.includes({ 'user': 'fred', 'age': 40 }, 'fred'));
// => true

/*****************************包含***************************************/
function square(n) {
    return n * n;
}
console.log(_.map([4, 8], square));
// => [16, 64]

/*****************************排序***************************************/
var users = [
    { 'user': 'fred', 'age': 48 },
    { 'user': 'barney', 'age': 34 },
    { 'user': 'fred', 'age': 40 },
    { 'user': 'barney', 'age': 36 }
];
// 以 `user` 升序排序 再  `age` 以降序排序。
console.log(_.orderBy(users, ['user', 'age'], ['asc', 'desc']));
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

/*****************************长度***************************************/
console.log(_.size([1, 2, 3]));
// => 3
console.log(_.size('pebbles'));
// => 7
console.log(_.size('歌曲abc'));
// => 5

//now 获得 Unix 纪元 (1 January 1970 00:00:00 UTC) 直到现在的毫秒数。
//var temp = _.defer(function (stamp) {
//    console.log(_.now() - stamp);
//}, _.now());
//console.log(_.now() + "______" + temp);

/*****************************强制转换数组************************************/
//如果不是数组, 那么强制转为数组。
console.log(_.castArray(1));
// => [1]

console.log(_.castArray({ 'a': 1 }));
// => [{ 'a': 1 }]

console.log(_.castArray('abc'));
// => ['abc']

/*****************************拷贝************************************/
    //_.clone(value) 创建一个 value 的浅拷贝
var objects = [{ 'a': 1 }, { 'b': 2 }];
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true

/***************************深拷贝************************************/
    //_.cloneDeep(value) 创建一个 value 的浅拷贝
var objects = [{ 'a': 1 }, { 'b': 2 }];
var shallow = _.cloneDeep(objects);
console.log(shallow[0] === objects[0]);
// => true

/*****************************等于************************************/
var object = { 'a': 1 };
var other = { 'a': 1 };
console.log(_.eq(object, object));  // => true
console.log(_.eq(object, other));  // => false
console.log(_.eq(1, 1));  // => false

console.log("--------------------------------------------------------");
/*****************************大于************************************/
console.log(_.gt(3, 1));  // => true
/*****************************大于等于********************************/
console.log(_.gte(3, 3));  // => true
/*****************************小于************************************/
console.log(_.lt(1, 3)); // => true
/*****************************小于等于********************************/
console.log(_.lte(3, 3));  // => true

//是否数组
console.log(_.isArray([1, 2, 3]));   // => true
console.log(_.isArray('abc'));   // => false
//是否boolean型
console.log(_.isBoolean(false));  // => true

console.log("--------------------------------------------------------");
//是否日期类型
console.log(_.isDate('02 31 2017')); // => false
console.log(_.isDate(new Date)); // => true
//是否整数
console.log(_.isInteger(3)); // => true
console.log(_.isInteger(3.1)); // => false
console.log(_.isInteger('3')); // => false
//是否字符串
console.log(_.isString('abc')); // => true
console.log(_.isString(1)); // => false
/*****************************转换成数组********************************/
console.log(_.toArray('abc'));
// => ['a', 'b', 'c']

//向上取精度 _.ceil(number, [precision=0])
console.log(_.ceil(6.014, 2));
// => 6.02

//向下取精度 _.floor(number, [precision=0])
console.log(_.floor(6.014, 2));
// => 6.01

//四舍五入取精度
console.log(_.round(4.006, 2));
// => 4.01

//返回最大数
console.log(_.max([4, 2, 8, 6])); // => 8
console.log(_.maxBy(users, function (o) { return o.age })); // => {user: "fred", age: 48}

//返回平均值
console.log(_.mean([4, 2, 8, 6])); // => 5
console.log(_.meanBy(users, function (o) { return o.age })); // => 39.5

//返回最小数
console.log(_.min([4, 2, 8, 6])); // => 2
console.log(_.minBy(users, function (o) { return o.age })); // => {user: "barney", age: 34}

//求和
console.log(_.sum([4, 2, 8, 6])); // => 20
console.log(_.sumBy(users, function (o) { return o.age })); // => 158

//检查字符串string是否以给定的target字符串开始
console.log(_.startsWith('abc', 'a')); // => true
//检查字符串string是否以给定的target字符串结尾
console.log(_.endsWith('abc', 'c'));  // => true

/*****************************Pad填充********************************/
console.log(_.pad('abc', 8, '#')); // => ##abc###
console.log(_.padEnd('abc', 8, '#')); // => abc#####
console.log(_.padStart('abc', 8, '#')); // => #####abc

console.log(_.repeat('abc', 2)); // => 'abcabc'
console.log(_.repeat('abc', 0)); // => ''

console.log(_.replace('Hi Fred Fred', 'Fred', 'Barney')); // => 'Hi Barney Fred'

console.log(_.trim('##abc###', '#')); // => abc
console.log(_.trimStart('##abc###', '#')); // => abc###
console.log(_.trimEnd('##abc###', '#')); // => #abc

console.log(_.truncate('hi-diddly-ho there, neighborino', { 'length': 5 })); // => hi...


/*迭代器reduce*/
let sourceArr = ['name', 'age', 'address', 'school', 'phone'];
let result = _.reduce(sourceArr, (arr, val, index)=> {
    arr.push({
        name: val
    });
    return arr;
}, []);
// [ { name: 'name' },
//   { name: 'age' },
//   { name: 'address' },
//   { name: 'school' },
//   { name: 'phone' } ]

let sourceNumber = [1,2,3,6,7,8,9];
let resultNumber = _.reduce(sourceNumber, (sum, value, index) => {
    return sum + value
}, 0);
// 36
