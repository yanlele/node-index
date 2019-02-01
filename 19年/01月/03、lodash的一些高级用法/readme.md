# lodash的一些高级用法

### webpack 优化 lodash 打包
lodash webpack 打包无法threeShaking， 导致之后体积过大的问题解决方案                            
组合拳： `npm install babel-plugin-lodash lodash-webpack-plugin --save`                             
```js
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const config = {
    plugins: [
        new LodashModuleReplacementPlugin({
            path: true,
            flattening: true
        })
    ]
};

//.babelrc
plugins: ['transform-runtime', 'lodash']
```


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
根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

#### unescape([string=''])
这个方法转换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。     
```js
_.unescape('fred, barney, &amp; pebbles');
// => 'fred, barney, & pebbles'
```

#### _.escape([string=''])
转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。 
```js
_.escape('fred, barney, & pebbles');
// => 'fred, barney, &amp; pebbles'
```

#### _.omitBy(object, [predicate=_.identity])
这个方法一个对象，这个对象忽略 predicate（断言函数）判断**不是真值**的属性后，object自身和继承的可枚举属性组成。
predicate调用与2个参数：(value, key)。
```js
let object = {'a': 1, 'b': '2', 'c': 3};
let result = _.omitBy(object, function (value, key) {
    return typeof value === "string"
});
console.log(result);    // { a: 1, c: 3 }
```

#### pickBy(object, [predicate=_.identity])
创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。 predicate调用2个参数：(value, key)。
```js
let object = {'a': 1, 'b': '2', 'c': 3};
let result = _.pickBy(object, function (value, key) {
    return typeof value === "string"
});
console.log(result);    // { b: '2' }
```

#### _.values(object)
创建 object 自身可枚举属性的值为数组。 非对象的值会强制转换为对象。
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
_.values(new Foo);
// => [1, 2] (无法保证遍历的顺序)
 
_.values('hi');
// => ['h', 'i']
```

#### _.valuesIn(object) 
创建 object 自身和继承的可枚举属性的值为数组 .非对象的值会强制转换为对象。
```js
function Foo() {
  this.a = 1;
  this.b = 2;
}

Foo.prototype.c = 3;

_.valuesIn(new Foo);
// => [1, 2, 3] (无法保证遍历的顺序)
```

#### uniqueId([prefix=''])
生成唯一ID。 如果提供了 prefix ，会被添加到ID前缀上。
```js
_.uniqueId('contact_');
// => 'contact_104'
 
_.uniqueId();
// => '105'
```

