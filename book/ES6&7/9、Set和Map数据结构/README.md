# Set和Map数据结构

### 1、Set   

#### 1.1、ES6 提供了新的数据结构 Set 。它类似于数组，但是成员的值都是唯一的，没有重复的值。

#### 1.2、Set 实例的属性和方法

- Set 结构的实例有以下属性。               
    - Set.prototype.constructor：构造函数，默认就是Set函数。              
    - Set.prototype.size：返回Set实例的成员总数。              

- Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。         
    - add(value)：添加某个值，返回 Set 结构本身。
    - delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
    - has(value)：返回一个布尔值，表示该值是否为Set的成员。
    - clear()：清除所有成员，没有返回值。
    
实例1：            
```javascript
    s.add(1).add(2).add(2);
    //  注意 2 被加入了两次
    s.size // 2
    s.has(1) // true
    s.has(2) // true
    s.has(3) // false
    s.delete(2);
    s.has(2) // false
```

#### 1.3、遍历操作       

- Set 结构的实例有四个遍历方法，可以用于遍历成员。            
    - keys()：返回键名的遍历器
    - values()：返回键值的遍历器
    - entries()：返回键值对的遍历器
    - forEach()：使用回调函数遍历每个成员
    

（1）keys() ，values() ，entries()              
key方法、value方法、entries方法返回的都是遍历器对象（详见《 Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以key方法和value方法的行为完全一致。         
```javascript
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
    // ["blue", "blue"]
```


（ 2 ）forEach()              
Set 结构的实例的forEach方法，用于对每个成员执行某种操作，没有返回值。            
```javascript
    let set = new Set([1, 2, 3]);
    set.forEach((value, key) => console.log(value * 2) )
    // 2
    // 4
    // 6
```


### 2、WeakSet           
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。              
首先， WeakSet 的成员只能是对象，而不能是其他类型的值。                
其次， WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。这个特点意味着，无法引用 WeakSet 的成员，因此 WeakSet 是不可遍历的。               


- WeakSet 结构有以下三个方法。
    - WeakSet.prototype.add(value) ：向 WeakSet 实例添加一个新成员。
    - WeakSet.prototype.delete(value) ：清除 WeakSet 实例的指定成员。
    - WeakSet.prototype.has(value) ：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

实例1：基本使用            
```javascript
    var ws = new WeakSet();
    var obj = {};
    var foo = {};
    
    ws.add(window);
    ws.add(obj);
    
    ws.has(window); // true
    ws.has(foo); // false
    
    ws.delete(window);
    ws.has(window); // false
```


### 3、Map           

#### 3.1、基本使用和概述        

JavaScript 的对象（ Object ），本质上是键值对的集合（ Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。            
为了解决这个问题， ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是 “ 键 ” 的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说， Object 结构提供了 “ 字符串 — 值 ” 的对应， Map 结构提供了 “ 值 — 值 ” 的对应，是一种更完善的 Hash 结构实现。如果你需要 “ 键值对 ” 的数据结构， Map 比 Object 更合适。               

实例1：        
```javascript
    var m = new Map();
    var o = {p: 'Hello World'};
    
    m.set(o, 'content')
    m.get(o) // "content"
    
    m.has(o) // true
    m.delete(o) // true
    
    m.has(o) // false
```
上面代码使用set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。             


实例2：            
```javascript
    //实例2：作为构造函数， Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
    var map = new Map([
        ['name', ' 张三 '],
        ['title', 'Author']
    ]);
    map.size // 2
    map.has('name') // true
    map.get('name') // " 张三 "
    map.has('title') // true
    map.get('title') // "Author"
```

#### 3.2、实例的属性和操作方法

size 属性：    
size属性返回 Map 结构的成员总数。               


set(key, value)：                
set方法设置key所对应的键值，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。              


get(key)：               
get方法读取key对应的键值，如果找不到key，返回undefined。               


has(key)：               
has方法返回一个布尔值，表示某个键是否在 Map 数据结构中。                


delete(key)：                
delete方法删除某个键，返回 true 。如果删除失败，返回 false 。                


clear()：                
clear方法清除所有成员，没有返回值。                


#### 3.3、 遍历方法          
- Map 原生提供三个遍历器生成函数和一个遍历方法。
    - keys()：返回键名的遍历器。
    - values()：返回键值的遍历器。
    - entries()：返回所有成员的遍历器。
    - forEach()：遍历 Map 的所有成员。

实例1：遍历方法            
```javascript
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
    }
```


实例2：结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（ Map 本身没有map和filter方法）。     
```javascript
    //map 过滤
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
    //  产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```


#### 3.4、与其他数据结构的互相转换           
```javascript
    //实例1： Map 转为数组
    let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
    [...myMap]
    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```


```javascript
    //实例2：将数组转入 Map 构造函数，就可以转为 Map 。
    new Map([[true, 7], [{foo: 3}, ['abc']]])
    // Map {true => 7, Object {foo: 3} => ['abc']}
```

```javascript
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
```

```javascript
    //实例4：对象转为 Map
    function objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }
    objToStrMap({yes: true, no: false})
    // [ [ 'yes', true ], [ 'no', false ] ]
```

```javascript
    //实例5： Map 转为 JSON  一种情况是， Map 的键名都是字符串，这时可以选择转为对象 JSON 。
    function strMapToJson(strMap) {
        return JSON.stringify(strMapToObj(strMap));
    }
    let myMap = new Map().set('yes', true).set('no', false);
    strMapToJson(myMap)
    // '{"yes":true,"no":false}'
```

```javascript
    //实例6： Map 的键名有非字符串，这时可以选择转为数组 JSON 。
    function mapToArrayJson(map) {
        return JSON.stringify([...map]);
    }
    let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
    mapToArrayJson(myMap)
    // '[[true,7],[{"foo":3},["abc"]]]'
```


```javascript
    //实例7、JSON 转为 Map  JSON 转为 Map ，正常情况下，所有键名都是字符串。
    function jsonToStrMap(jsonStr) {
        return objToStrMap(JSON.parse(jsonStr));
    }
    jsonToStrMap('{"yes":true,"no":false}')
    // Map {'yes' => true, 'no' => false}
```


### 4、WeakMap   

WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。            

