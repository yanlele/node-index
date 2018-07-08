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
}
```
extend(person,programer)                
programer.schools[0]='lelele'               
person.schools[0]       //输出结果也是lelele，                 
说明了不仅是父对象里面还有个对象这种情况，子对象发生改变影响父对象，如果父对象里面是一个数组，也是会影响的！              




