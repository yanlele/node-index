# 深入call、apply、bind实现原理
[https://www.jianshu.com/p/6a1bc149b598](https://www.jianshu.com/p/6a1bc149b598)

简单粗暴地来说，call，apply，bind是用于绑定this指向的。

## 什么是call和apply方法
我们单独看看ECMAScript规范对apply的定义，看个大概就行：                 

通过定义简单说一下call和apply方法，他们就是参数不同，作用基本相同。                      

1、每个函数都包含两个非继承而来的方法：apply()和call()。                     
2、他们的用途相同，都是在特定的作用域中调用函数。                       
3、接收参数方面不同，apply()接收两个参数，一个是函数运行的作用域(this)，另一个是参数数组。                        
4、call()方法第一个参数与apply()方法相同，但传递给函数的参数必须列举出来。                        


一个简单的demo:              
```javascript
let yanle = {
    name: 'yanle',
    sayHello: function (age) {
        console.log(`hello, i am ${this.name} and ${age} years old`);
    }
};
let lele = {
    name: 'lele'
};
yanle.sayHello(26);          // hello, i am yanle and 26 years old

yanle.sayHello.call(lele, 20);          // hello, i am lele and 20 years old
yanle.sayHello.apply(lele, [21]);       // hello, i am lele and 21 years old
```

结果都相同。从写法上我们就能看出二者之间的异同。
相同之处在于，第一个参数都是要绑定的上下文，后面的参数是要传递给调用该方法的函数的。
不同之处在于，call方法传递给调用函数的参数是逐个列出的，而apply则是要写在数组中。

总结一句话介绍call和apply                           
call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法。                           
apply()方法在使用一个指定的this值和参数值必须是数组类型的前提下调用某个函数或方法                          


