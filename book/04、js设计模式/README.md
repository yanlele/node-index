# 《javascript设计模式》 张容铭 著            

- [第一篇、面向对象编程]()
- [第二篇、创建型设计模式](#class02)               
    - [03章、简单工程模式](#class02-03)
    - [04章、工厂方法模式](#class02-04)






## <div id="class02">第二篇、创建型设计模式</div>
### <div id="class02-03">03章、简单工程模式</div>

#### 简单工厂的最简单示例
所有的类都封装到一个函数里面，这样在模块调用的时候只需要记住这个函数，通过这个函数创建用户需要的对象就可以了。
这样用户可以不再关注创建这些对象依赖了那些基类，只要知道这个函数就可以了。这个函数就是被称为工厂函数，这种设计模式就被称为简单工厂设计模式。
一个最简单的示例如下：     
```javascript
//篮球基类
class BasketBall {
    constructor() {
        this.intro = '篮球盛行于美国'
    }

    getMember() {
        console.log('每一个队伍需要五个球员');
    }

    getBallSize() {
        console.log('篮球很大')
    }
}

// 足球基类
class FootBall {
    constructor() {
        this.intro = '足球在全世界范围都很流行'
    }

    getMember() {
        console.log('每一个队伍需要11个球员');
    }

    getBallSize() {
        console.log('足球很大')
    }
}

let SportsFactory = function(name) {
    switch (name) {
        case 'NBA':
            return new BasketBall();
        case 'wordCup':
            return new FootBall();
    }
};

// 为直接被创建一个足球，只需要记住工厂，并且调用就可以了
let footNall  = SportsFactory('wordCup');
console.log(footNall);
console.log(footNall.intro);
footNall.getMember();
```

#### 一个对象也可以替代许多类                   
不同的类有相同的地方，是可以抽取出来公用的。
简单工厂设计模式的理念是创建对象，上面的方式是不同的类实例化而已，不过除此之外，简单工厂模式还可以用来创建对象。
举一个例子：              
比如创建一些书，书有一些相似的地方，比如目录，页码等，也有一些不同的地方，比如书名，出版时间，书的类型等，对于创建的对象想死的属性处理好，不同的属性针对想处理。
比如我们将不同的属性作为参数传递进来处理。                   
```javascript
function createBook(name, time, type) {
    let o  = new Object();
    o.name = name;
    o.time = time;
    o.type = type;
    o.getName = function() {
        console.log(this.name);
    };
    return o;
}

let book1 = createBook('js book', 2018, 'js');
let book2 = createBook('css book', 2017, 'css');

book1.getName();
book2.getName();
```
比如本书里面的三个雷，抽象共同点，比如属性this.content, 公用方法show, 不同点，确认框和提示框的确认按钮， 比如提示框的用户输入框等， 所以你就可以像下面这样创建了。
```javascript
function createPop(type, text) {
    let o = new Object();
    o.content = text;
    o.show = function() {
        // 显示方法
    };

    if(type === 'alert') {
        // 警告框差异部分
    }
    if(type === 'prompt') {
        // 提示框差异部分
    }
    if(type === 'confirm') {
        //确认框差异部分
    }
    return o;
}
let userNameAlert = createPop('alert', '用户名只能是26个字母和数字');
```

### <div id="class02-04">04章、工厂方法模式</div>               
将实现创建对象的工作推迟到子类当中。这样核心类就成了抽象类，我们可以将工厂方法看做一个实例化对象的工厂类。将创建对象的基类放在工厂方法类的原型就可以了。        

#### 安全模式类          
安全模式类，可以屏蔽调用错误，没有new 关键字的时候，直接调用类，是会报错的。安全类就是可以屏蔽这个错误的类。
```javascript
let Demo = function(){

};
Demo.proptotype = {
    show() {
        console.log('获取成功');
    }
};
let d = new Demo();
d.show();
let d = Demo();
d.show();   // 这个地方就会报错： TypeError: Cannot read property 'show' of undefined
```               
安全模式就是为了解决上面问题的。                

解决办法：
```javascript
let Demo = function(){
    if(!(this instanceof Demo)) {
        return new Demo();
    }
};
Demo.proptotype = {
    show() {
        console.log('获取成功');
    }
};
let d = new Demo();
d.show();
let d = Demo();
d.show();
```
