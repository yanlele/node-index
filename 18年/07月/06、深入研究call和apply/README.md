# 深入研究call和apply                

## apply()与call()的区别                
JavaScript中的每一个Function对象都有一个apply()方法和一个call()方法，它们的语法分别为：         
```javascript
/*apply()方法*/
function.apply(thisObj[, argArray])

/*call()方法*/
function.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
```

**它们各自的定义：**                
apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如： `B.apply(A, arguments);` 即A对象应用B对象的方法。           
call：调用一个对象的一个方法，用另一个对象替换当前对象。例如： `B.call(A, args1,args2);` 即A对象调用B对象的方法。               


**它们的共同之处：**                    
都“可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象”。               

**它们的不同之处：**                
apply：最多只能有两个参数——新this对象和一个数组argArray。如果给该方法传递多个参数，则把参数都写进这个数组里面，当然，即使只有一个参数，
也要写进数组里。如果argArray不是一个有效的数组或arguments对象，那么将导致一个TypeError。如果没有提供argArray和thisObj任何一个参数，
那么Global对象将被用作thisObj，并且无法被传递任何参数。               

call：它可以接受多个参数，第一个参数与apply一样，后面则是一串参数列表。这个方法主要用在js对象各方法相互调用的时候，
使当前this实例指针保持一致，或者在特殊情况下需要改变this指针。如果没有提供thisObj参数，那么 Global 对象被用作thisObj。              

             
实际上，apply和call的功能是一样的，只是传入的参数列表形式不同。                

## 一些基本使用示例

**基本使用**                
```javascript
function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
let a1 = add.apply(sub,[4,2]);　　//sub调用add的方法
let a2 = sub.apply(add,[4,2]);
console.log(a1);  //6
console.log(a2);  //2

/*call的用法*/
let a3 = add.call(sub,4,2);
console.log(a3);
```

**实现继承**
```javascript
function Animal(name){
    this.name = name;
    this.showName = function(){
        console.log(this.name);
    }
}

function Cat(name){
    Animal.apply(this,[name]);
}

let cat = new Cat("咕咕");
cat.showName();

/*call的用法*/
Animal.call(this,name);
```

**多重继承**            
```javascript
function Class10(){
    this.showSub = function(a,b){
        console.log(a - b);
    }
}

function Class11(){
    this.showAdd = function(a,b){
        console.log(a + b);
    }
}

function Class12(){
    Class10.apply(this);
    Class11.apply(this);
    // Class10.call(this);
    //Class11.call(this);
}

let c2 = new Class12();
c2.showSub(3,1);    //2
c2.showAdd(3,1);    //4
```