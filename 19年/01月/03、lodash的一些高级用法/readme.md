# lodash 的一些高级用法

#### intersection
```js
//返回一个包含所有传入数组交集元素的新数组
console.log(_.intersection([2, 1], [4, 2], [1, 2]));
// => [2]
```

#### each/forEach
```js
_([1, 2]).forEach(function (value) {
    console.log(value);
});
// => Logs '1' then '2'

_.forEach({ 'a': 1, 'b': 2 }, function (value, key) {
    console.log(key + " " + value);
});
// => Logs 'a 1' then 'b 2'
```

#### reduce
```js
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
```

#### get


