# 关于深拷贝和浅拷贝的实现       

目录

<!-- toc -->

- [No.1 浅拷贝存在的问题](#no1-%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%AD%98%E5%9C%A8%E7%9A%84%E9%97%AE%E9%A2%98)
- [No.2 普通的深拷贝](#no2-%E6%99%AE%E9%80%9A%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D)
- [No.3 数组对象深拷贝的简单实现](#no3-%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E6%B7%B1%E6%8B%B7%E8%B4%9D%E7%9A%84%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0)
- [No.4 利用对象实现深拷贝](#no4-%E5%88%A9%E7%94%A8%E5%AF%B9%E8%B1%A1%E5%AE%9E%E7%8E%B0%E6%B7%B1%E6%8B%B7%E8%B4%9D)
- [No.5 利用class实现深拷贝](#no5-%E5%88%A9%E7%94%A8class%E5%AE%9E%E7%8E%B0%E6%B7%B1%E6%8B%B7%E8%B4%9D)
- [No.6 解决深拷贝终极奥义](#no6-%E8%A7%A3%E5%86%B3%E6%B7%B1%E6%8B%B7%E8%B4%9D%E7%BB%88%E6%9E%81%E5%A5%A5%E4%B9%89)

<!-- tocstop -->

## No.1 浅拷贝存在的问题
```javascript
var person={
    name:'yanle',
    age:24,
    address:{
        home:'home address',
        office:'office address'
    },
    schools:['xiaoxue','daxue']
};
var programer={
    language:'javascript'
};
function extend(p,c){
    var c=c||{};
    for(var prop in p){
        c[prop]=p[prop]
    }
    return c;
}
```
extend(person,programer)                
programer.schools[0]='lelele'               
person.schools[0]       //输出结果也是lelele，                 
说明了不仅是父对象里面还有个对象这种情况，子对象发生改变影响父对象，如果父对象里面是一个数组，也是会影响的！              
请参考： [浅拷贝存在的问题](./01、浅拷贝存在的问题.js)


## No.2 普通的深拷贝
```javascript
let person = {
    name: 'yanle',
    age: 24,
    address: {
        home: 'home address',
        office: 'office address'
    },
    schools: ['xiaoxue', 'daxue']
};
let programer = {
    language: 'javascript'
};

function extendDeeply(p, c = {}) {
    for (let prop in p) {
        if (typeof p[prop] === 'object') {
            c[prop] = (p[prop].constructor === Array) ? [] : {};
            extendDeeply(p[prop], c[prop])
        } else {
            c[prop] = p[prop]
        }
    }
    return c;
}

extendDeeply(person, programer);
console.log(programer);
programer.name = 'lelelelele';
console.log(programer);
console.log(person);
```
这种情况无论是数组还是对象，子类发生改变都不会影响父类了                
原理：这里的c对象并不是直接就取的p对象里面的值，而是先赋予了一个空的对象或者数据，再拿空的对象或者数据去装填p对象的数据，这样就可以断开引用关系；              
请参考：[普通的深拷贝](./02、普通的深拷贝.js)


## No.3 数组对象深拷贝的简单实现
如果对象是一个数组对象，那么可以用字符串方法来实现深拷贝（就是断开引用连接，赋予新的对象实例）             
`arr.slice(0)` 这样得到的数组对象就会指向自己心的引用了;


## No.4 利用对象实现深拷贝
```javascript
function Parent(){
    this.name='abc';
    this.address={home:'home'}
}
function Child(){
    Parent.call(this);
    this.language='java'
}

let parent = new Parent();
let child = new Child();

console.log(parent);
console.log(child);

console.log('=======================');

child.name = '123';
console.log(parent);
console.log(child);
```
原理：返回的是不同对象的实例，所以不存在公用一个this指向的问题               
请参考：[利用对象实现深拷贝](./03、利用对象实现深拷贝.js)


## No.5 利用class实现深拷贝
```javascript
class Person{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    run() {
        console.log('person can run');
    }
}

class Child extends Person{
    constructor(name,age,address) {
        super(name, age);
        this.address = address;
    }
}

let person = new Person('yanle', 25);
let child = new Child('yanle', 25, 'chongqing');
console.log(person);
console.log(child);
console.log('=========================');
child.name = 'lelellelelele';
console.log(person);
console.log(child);
```
原理跟第四种情况是一模一样的；
请参考： [利用class实现深拷贝](./04、利用class实现深拷贝.js)

## No.6 解决深拷贝终极奥义     
github有开源模块专门解决这个问题的： [https://github.com/unclechu/node-deep-extend](https://github.com/unclechu/node-deep-extend)                  
其源码实例如下： [deep-extend.js](https://github.com/unclechu/node-deep-extend/blob/master/lib/deep-extend.js)              
也可以参考本地目录： [deep-extend.js](./deep-extend.js)               
本地使用实例： [test](./test.js)
