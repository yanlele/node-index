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
比如本书里面的三个雷，抽象共同点，比如属性this.content, 公用方法show, 
不同点，确认框和提示框的确认按钮， 比如提示框的用户输入框等， 所以你就可以像下面这样创建了。
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
将实现创建对象的工作推迟到子类当中。这样核心类就成了抽象类，我们可以将工厂方法看做一个实例化对象的工厂类。
将创建对象的基类放在工厂方法类的原型就可以了。        

#### 用简单方法实现的一个广告展现的示例              
```javascript
let Java = function(content) {
    this.content = content;
    (function(content) {
        console.log(content)
    })(content);
};

let Php = function(content) {
    this.content = content;
    (function(content) {
        console.log(content)
    })(content);
};

let JavaScript = function(content) {
    this.content = content;
    (function(content) {
        console.log(content)
    })(content);
};

// 学科工厂
function JobFactory(type, content) {
    switch (type) {
        case 'java':
            return new Java(content);
        case 'php':
            return new Php(content);
        case 'javascript':
            return new JavaScript(content);
    }
}
let java = JobFactory('javascript', '我是js书籍');
```
缺点，如果有后续的更多的需求，需要添加类，又要修改简单工厂函数。

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

#### 安全工厂方法                 
实际上的本质还是把类的实例化移动到了原型中去，本质并没有发生变化。之前的简单工厂方法，是把对象的实例化放置在工厂方法本身上的。                 
这个方法就实现了所有的类都写在了原型里面，动态判断了是否是工厂函数本身，根据不同的装填添加不同的方法；                     
```javascript
let Factory = function (type, content) {
    if (this instanceof Factory) {
        return new this[type](content);
    } else {
        return new Factory(type, content)
    }
};

Factory.prototype = {
    Java(content) {
        this.content = content;
        (function (content) {
            console.log(content)
        })(content);
    },
    Php(content) {
        this.content = content;
        (function (content) {
            console.log(content)
        })(content);
    },
    JavaScript(content) {
        this.content = content;
        (function (content) {
            console.log(content)
        })(content);
    }
};
```

### <div id="class02-05">05章、抽象工厂模式</div>
js中abstract是保留字段，抽象类是一种申明但是不能使用的类，当你使用的时候就会报错。我们可以在类的方法中手动排除错误来模拟抽象类。                   
```javascript
let Car = function() {};
Car.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用');
    },
    getSpeed() {
        return new Error('抽象方法不能被调用');
    }
};
```
这个car类什么都不能做，不能使用，但是在继承上却很有用，因为定义类一个类，这给类具备必要的方法，如果在子类没有重写这些方法，那么调用的时候就会报错。                     
在大型程序中，总会有一些子类去继承另外一些父类，这些父类经常会定义一些必要的方法，却没有具体实现。这种写法是忘记重写子类的这些错误遗漏的避免是很有帮助的。                   

#### 抽象工厂模式                 
```javascript
//抽象工厂
let VehicleFactory = function(subType, superType) {
    if(typeof VehicleFactory[superType] === 'function') {
        // 缓存类
        function F(){}
        // 集成父类的属性和方法
        F.prototype = new VehicleFactory[superType]();
        // 将子类的constructor 指向子类
        superType.constructor = subType;
        // 子类原型继承 父类
        subType.prototype = new F();
    } else {
        throw new Error('没有创建该类抽象对象');
    }
};
// 小汽车抽象类
VehicleFactory.Car = function() {
    this.type = 'car'
};
VehicleFactory.Car.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用')
    },
    getSpeed() {
        return new Error('抽象方法不能被调用')
    }
};

// 公交车
VehicleFactory.Bus = function() {
    this.type = 'bus'
};
VehicleFactory.Bus.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用')
    },
    getSpeed() {
        return new Error('抽象方法不能被调用')
    }
};

// 货车抽象类
VehicleFactory.Truck = function() {
    this.type = 'truck'
};
VehicleFactory.Truck.prototype = {
    getPrice() {
        return new Error('抽象方法不能被调用')
    },
    getSpeed() {
        return new Error('抽象方法不能被调用')
    }
};
```
[源码请见02、抽象工厂的实现](./05章、抽象工厂模式/02、抽象工厂的实现.js)

抽象工厂实际上是一个实现一个子类继承一个抽象父类的方法。

#### 抽象与实现
抽象工厂是创建子类的，所以我们需要一些子类产品，让子类继承父类就可以了。具体实现如下：                     
```javascript
/*具体实现*/
//宝马汽车子类
let BMW = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function() {
    return this.price;
};
BMW.prototype.getSpeed = function() {
    return this.speed;
};
//兰博基尼汽车子类
let Lamborghini = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(Lamborghini, 'Car');
Lamborghini.prototype.getPrice = function() {
    return this.price;
};
Lamborghini.prototype.getSpeed = function() {
    return this.speed;
};

//宇通汽车子类
let YUTONG = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(YUTONG, 'Bus');
YUTONG.prototype.getPrice = function() {
    return this.price;
};
YUTONG.prototype.getSpeed = function() {
    return this.speed;
};

//奔驰汽车子类
let BenzTruck = function(price, speed) {
    this.price = price;
    this.speed = speed;
};
VehicleFactory(BenzTruck, 'Truck');
BenzTruck.prototype.getPrice = function() {
    return this.price;
};
BenzTruck.prototype.getSpeed = function() {
    return this.speed;
};

let truck = new BenzTruck(10000, 100);
console.log(truck.getPrice());
console.log(truck.type);
console.log(truck.getSpeed());
```
[源码请见:03、抽象与实现](./05章、抽象工厂模式/03、抽象与实现.js)


### <div id="class02-06">06章、建造者模式</div>
将一个复杂对象的构建层与其表现层相互分离

#### 创建对象的另外一种形式
工厂模式主要是为了创建对象和抽象工厂，关心的是最终产出（创建）的是什么。不关心你创建的过程，仅仅需要你知道最终创建的结果是什么就可以了。                
建造者设计模式目的也是为了创建对象，但是更加关心的是创建这个对象的过程。比如创建一个人，不仅仅要得到人的实例，还要关心创建人的时候，这个人穿什么衣服，是男是女，兴趣爱好是什么。
```javascript
//应聘者类
let Human = function(param) {
    this.skill = param && param.skill || '保密';
    this.hobby = param && param.hobby || '保密';
};
Human.prototype = {
    getSkill() {
        return this.skill;
    },
    getHobby() {
        return this.hobby
    }
};
//实例化姓名类
let Named = function(name) {
    let that = this;
    (function(name, that) {
        that.whileName = name;
        if(name.indexOf(' ') > -1) {
            that.firstName = name.slice(0, name.indexOf(' '));
            that.secondName = name.slice(name.indexOf(' '));
        }
    })(name, that)
};
// 实例化工作职位类
let Work = function(work) {
    let that = this;
    (function(work, thar) {
        switch (work) {
            case 'code':
                that.work = '工程师';
                that.workDescript = '写代码';
                break;
            case 'UI':
            case 'UE':
                that.work = '设计师';
                that.workDescript = '艺术工作';
                break;
            case 'teach':
                that.work = '教师';
                thar.workDescript = '教书育人';
                break;
            default:
                that.work = work;
                that.workDescript = '没有你描述的职位'
        }
    })(work, that)
};
//期望的职位
Work.prototype.changeWork = function(work) {
    this.work = work;
};
//添加职位描述
Work.prototype.changeDescript = function(setence) {
    this.workDescript = setence;
};
```

#### 创建一位应聘者                            
上面我们创建了三个类 - 应聘者类、姓名解析类与期望职位类。最终目的是创建一个应聘者，所以需要抽象上面三个类。写一个建造者类，在建造者类中，我们要通过对这三个类组合调用，创建一个完整的应聘者对象出来。                            
核心代码如下：                 
```javascript
let Person = function(name, work) {
    // 应聘者缓存对象
    let _person = new Human();
    // 姓名解析
    _person.name = new Named(name);
    // 应聘者职位
    _person.work = new Work(work);
    return _person;
}
```
在创造者中，我们分为三个部分来创建一个应聘者的，首先创建一个应聘者缓存对象，缓存对象添加姓名和职位，最终得到一个完整的应聘者了。                        

[源码请见：02、创建一位应聘者](./06章、建造者模式/02、创建一位应聘者.js)

建造者模式不仅仅要得到穿件的结果，还要参与到创建的过程，对于创建的具体实现的细节也参与了干涉。这种创建模式创建的对象是一个复杂的符合对象。


### <div id="class02-07">07章、原型链模式</div>                
原型链模式就是讲原型对象只想创建对象的类，使这类共享原型对象的方法与属性。

#### 创建一个轮播图                                   
创建轮播图最好的方式就是通过创建对象来一一实现：
```javascript
let LoopImages = function(imgArr, container) {
    this.imagesArray = imgArr;              // 轮播图片数组
    this.container = container;             // 轮播图片容器
    this.createImage = function(){};        // 创建轮播图片
    this.changeImage = function(){};        // 切换下一张图片
}
```
如果一个页面有多个这类轮播图，切换动画也是变化多样，有的上下切换，有的左右切换，有的渐隐渐出，有的缩放切换等等。
这种情况下我们就需要抽象出来一个基类，让不同的特效类去继承这个基类，对于差异化的需求，通过重写这些基类下面的属性或者方法来解决。                
```javascript
// 上下滑动切换类
let SlideLoopImg = function(imgArr, container) {
    //继承
    LoopImages.call(this, imgArr, container);

    // 重写方法
    this.changeImage = function() {
        console.log('上下滑动切换')
    }
};

// 隐藏出现切换类
let FadeLoopImg = function(imgArr, container, arrow) {
    // 继承
    LoopImages.call(this, imgArr, container);
    this.arrow = arrow;
    this.changeImage = function() {
        console.log('隐藏出现切换类');
    }
};

//实例化一个对象
let fadeImg = new FadeLoopImg([
    '1.jpg',
    '2.jpg',
    '3.jpg',
], 'slide', [
    'left.jpg',
    'right.jpg'
]);
```


#### 优化的解决方案                        
上面的缺点：每次子类继承父类都要创建一次父类。所以我们需要一种共享机制，每次创建基类的时候，对于每次创建的一些简单又差异化的属性，我们可以放在构造函数中，将一些消耗资源比较大的方法放在基类的原型中。              
```javascript
// 图片轮播图
let LoopImages = function(imgArr, container) {
    this.imagesArray = imgArr;
    this.container = container;
};
LoopImages.prototype = {
    // 创建轮播图片
    crateImage() {
        console.log('创建轮播图片')
    },

    // 切换下一个图片
    changeImage() {
        console.log('切换下一个图片')
    }
};

// 上下滑动切换类
let SlideLoopImg = function(imgArr, container) {
    //继承
    LoopImages.call(this, imgArr, container);
};
SlideLoopImg.prototype = new LoopImages();
SlideLoopImg.prototype.changeImage = function () {
    console.log('上下滑动切换')
};


// 隐藏出现切换类
let FadeLoopImg = function(imgArr, container, arrow) {
    // 继承
    LoopImages.call(this, imgArr, container);
    this.arrow = arrow;
};
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function () {
    console.log('隐藏出现切换类')
};

//实例化一个对象
let fadeImg = new FadeLoopImg([
    '1.jpg',
    '2.jpg',
    '3.jpg',
], 'slide', [
    'left.jpg',
    'right.jpg'
]);
console.log(fadeImg.container);
fadeImg.changeImage();
```
在原型链设计模式中，父子类的具体实现，都可以放在原型中去；


#### 原型的扩展
原型对象是一个共享对象，无论父类的实例还是子类的继承，都是对他的一个指向引用。所以对于原型的扩展，无论是子类还是父类的示例，都会被继承下来。


#### 备注
上面实际上只是一个原型链的一个继承方式， 其实现在又es6之后， 这种方式渐渐已经可以用es6 的面向对象class 去掉掉。



### <div id="class02-08">08章、单例模式</div>  
单例模式（Singleton） - 只允许实例化一次的对象类。

#### 做一个滑动特效的示例
```javascript
function g(id) {
    return document.getElementById(id)
}

function css(id, key, value) {
    g(id).style[key] = value;
}
function attr(id, key, value) {
    g(id)[key] = value;
}
function html(id, value) {
    g(id).innerHeight = value;
}
```

这些代码存在不妥的地方：如果以后有人要在页面添加新的需求，添加代码的时候定义了一个on变量，或者重写了on方法，这样就会出现代码冲突了。

#### 命名空间
用命名空间可以约束每个人定义的变量来解决上面的问题
```javascript
let Le = {
    g(id) {
        return document.getElementById(id)
    },
    css(id, key, value) {
        this.g(id).style[key] = value;
    },
    attr(id, key, value) {
        this.g(id)[key] = value;
    },
    html(id, value) {
        this.g(id).innerHeight = value;
    }
};
```

#### 无法改变的静态变量                      
将变量放在一个函数内部，只有通过特权方法访问，如果不提供赋值变量的方法，只提供获取变量的方法，就可以做到限制变量的修改而且可以提供外界访问的需求。                   
为了实现创建后就能使用，我们需要让穿件的函数执行一次。最后将这个对象最为一个单利放在全局空间里面，作为静态变量提供给他人使用。                 
```javascript
let Conf = (function () {
    // 私有变量
    let conf = {
        MAX_NUM: 100,
        MIN_NUM:1,
        COUNT: 1000
    };
    return {
        get(name) {
            return conf[name] ? conf[name] : null
        }
    }
})();
let count = Conf.get('COUNT');
console.log(count);
```

#### 惰性单例                   
有的时候对于单例对象需要延迟创建，所以单例中还存在一种延迟创建的形式，被称为惰性创建。
```javascript
let LazySingle = (function () {
    let _instance = null;
    function single() {
        return {
            publicMath() {},
            publicConst: 100
        }
    }
    return function() {
        if(!_instance) {
            _instance = single();
        }
        //返回单例
        return _instance;
    }
})();

console.log(LazySingle().publicConst);
```


