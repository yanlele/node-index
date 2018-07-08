# 关于深拷贝和浅拷贝的实现              

## 1、浅拷贝存在的问题：                  
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
请参考： [01、浅拷贝存在的问题](./01、浅拷贝存在的问题.js)


## 2、普通的深拷贝
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


## 3、数据对象深拷贝的简单实现                   
如果对象是一个数据对象，那么可以用字符串方法来实现深拷贝（就是断开引用连接，赋予新的对象实例）             
`arr.slice(0)` 这样得到的数组对象就会指向自己心的引用了;


## 4、利用对象实现深拷贝                  
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

## 5、利用class实现深拷贝
