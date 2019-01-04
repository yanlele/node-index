## <div id="class04">第四篇、行为型设计模式</div>


### <div id="class04-16">16章、模板方法模式</div>
**模板方法模式（Template Method）**: 父类中定义一组操作算法骨架，将一些实现步骤延迟到子类中，是的子类可以不改变弗雷算法结构的同事，可以重新定义算法中实现步骤。              

#### 提示框归一化             
这个例子中需要报所有的提示框弄成统一样式。
将多个模型抽象化归一，从中抽象提取出来一个最基本的模板，这个模板可以最为实体对象也可以做为抽象对象。

就好比我们要做一个蛋糕，蛋糕的模型是一样的，外面奶油涂层不一样，就做成了不同的蛋糕了。

#### 创建基本提示框
首先要创建一个基本的提示框父类，其他的提示框只需要继承这个父类，扩展自己所需要的即可。我们以后再改动我们的鸡肋，就可以实现所有提示框样式统一变化的效果了。               
```javascript
let Alert = function (data) {
    if (!data) return;
    // 设置内容
    this.content = data.content;
    // 创建提示面板
    this.panel = document.createElement('div');
    // 创建提示内容组件
    this.contentNode = document.createElement('p');
    // 创建确认按钮
    this.confirmBtn = document.createElement('span');
    // 创建关闭按钮
    this.closeBtn = document.createElement('b');
    // 为提示面板添加类
    this.panel.className = 'alert';
    // 未关闭按钮添加类
    this.closeBtn.className = 'a-close';
    // 未确认按钮添加类
    this.confirmBtn.className = 'a-confirm';
    // 为确认按钮添加文案
    this.confirmBtn.innerHTML = data.confirm || '确认';
    // 为提示按钮添加文案
    this.contentNode.innerHTML = this.content;
    // 点击确认按钮执行的方法
    this.success = data.success || function(){};
    // 点击关闭按钮执行方法
    this.fail = data.fail || function(){};
};

// 模板原型方法，包含了模板的基本行为方法
Alert.prototype = {
    // 创建方法
    init: function () {
        // 生成提示框
        this.panel.appendChild(this.closeBtn);
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.confirmBtn);
        // 插入到页面中去
        document.body.appendChild(this.panel);
        // 绑定事件
        this.bindEven();
        // 现实提示框
        this.show()
    },
    // 绑定事件方法
    bindEvent: function () {
        let me = this;
        // 关闭按钮事件
        this.closeBtn.onclick = function () {
            // 执行关闭取消方法
            me.fail();
            // 隐藏弹出层
            me.hide();
        };
        // 点击确认事件
        this.confirmBtn.onclick = function () {
            // 执行关闭确认方法
            me.success();
            // 隐藏弹出层
            me.hide();
        }
    },
    // 隐藏弹出层方法
    hide: function () {
        this.panel.style.display = 'none';
    },
    // 现实弹出框的方法
    show: function () {
        this.panel.style.display = 'block';
    }
};
```

#### 根据模板创建类
```javascript
const Alert = require('./01、创建一个基础提示模板');

// 右侧按钮提示框
let RightAlert = function () {
    // 集成基本提示框构造函数
    Alert.call(this, data);
    // 确认按钮添加right类设置位置居右
    this.confirmBtn.className = this.confirmBtn.className + ' right';
};
// 继承基本提示框方法
RightAlert.prototype = new Alert();

// 标题提示框
let TitleAlert = function (data) {
    Alert.call(this);
    this.title = data.title;
    // 创建标题
    this.titleNode = document.createElement('h3');
    this.titleNode.innerHTML = this.title;
};
// 继承基本提示框方法
TitleAlert.prototype = new Alert();
// 对基本提示框方法的扩展
TitleAlert.prototype.init = function () {
    // 插入标题
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    // 继承基本提示框的init
    Alert.prototype.init.call(this);
};
```

#### 继承类也可以作为模板类
在此基础上，如果希望创建带有取消按钮的标题提示框，只需要在构造函数中创建一个取消按钮。然后原型方法实例化方法init中加入取消按钮，绑定事件就可以了。
因为上面已经创建了提示框了， 所以我们可以以上一个TitleAlert作为模板类。                   
```javascript
// 标题提示框
let TitleAlert = function (data) {
    Alert.call(this);
    this.title = data.title;
    // 创建标题
    this.titleNode = document.createElement('h3');
    this.titleNode.innerHTML = this.title;
};
// 继承基本提示框方法
TitleAlert.prototype = new Alert();
// 对基本提示框方法的扩展
TitleAlert.prototype.init = function () {
    // 插入标题
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    // 继承基本提示框的init
    Alert.prototype.init.call(this);
};

/*模板类还可以作为模板类，继续被继承*/
let CancelAlert = function (data) {
    TitleAlert.call(this);
    // 取消按钮文案
    this.cancel = data.cancel;
    this.cancelBtn = document.createElement('span');
    this.cancelBtn.className = 'cancel';
    this.cancelBtn.innerHTML = this.cancel || '取消'
};
CancelAlert.prototype =new Alert();
CancelAlert.prototype.init = function () {
    // 继承标题提示框创建方法
    TitleAlert.prototype.init.call(this);
    this.panel.appendChild(this.cancelBtn);
};
CancelAlert.prototype.bindEvent = function () {
    let me = this;
    TitleAlert.prototype.bindEvent.call(me);
    // 取消按钮绑定事件
    this.cancelBtn.onclick = function () {
        me.fail();
        me.hide();
    }
};
```

#### 创建一个提示框
```javascript
/*创建一个提示框*/
new CancelAlert({
    title: '提示框标题',
    content: '提示框内容',
    success: function () {
        console.log('ok');
    },
    fail: function () {
        console.log('cancel');
    }
}).init();
```

#### 创建多类导航
这种模板设计模式在创建页面的时候也很常用。比如创建三级导航，第一类是基础，第二类多了消息提示功能，第三类在第二类的基础上多了显示网址的功能。
```javascript
function formateString(str, data) {
    return str.replace(/\{(\w+)}/g, function (match, key) {
        return typeof data[key] === "undefined" ? '' : data[key];
    })
}

// 基础导航类
exports.loader = function (path) {
    if (/.css$/.test(path)) return `<link rel="stylesheet" type="text/css" href="${config.staticURI}${path}">`;
    else return `<script type="text/javascript" src="${config.staticURI}${path}"></script>`;
};
let Nav = function (data) {
    this.item = `<a href="${href}" title="${title}">${name}</a>  `;
    this.html = '';
    for (let i = 0, len = data.length; i < len; i++) {
        this.html += formateString(this.item, data[i]);
    }
    return this.html
};

// 带有消息提示的导航类
let NumNav = function (data) {
    // 创建信息模板
    let tep = `<b>${num}</b>`;
    // 装饰数据
    for (let i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tep, data[i]);
    }
    return Nav.call(this, data);
};

//带有链接的导航地址
let LinkNav = function (data) {
    let tpl = `<span>${link}</span>`;
    for (let i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i]);
    }
    return Nav.call(this, data);
};
```


### <div id="class04-17">17章、观察者模式</div>
**观察者模式（Observer）**: 又被成
为发布者-订阅者或者消息定制，定义一种依赖关系，解决主体对象与观察者之间的功能耦合；                  

#### 场景是各个模块需要通信
当用户发表评论的时候，会在评论区展示新的评论，同事用户的信息模块消息数量递增。删除模块的时候，用户消息模块数量也会递减。整个功能是由三个不同开发做的。
不想跟别人的代码强耦合，又希望别的模块接收到自己的推送信息。                      
作为一个观察者对象，那应该具有两个功能，一个功能是接受被观察者发送过来的信息，第二个功能是想订阅者推送一个被观察者发送过过来的信息。                  
还需要一个注销订阅者身份的一个方法。还需要一个保存信息的容器。

#### 创建一个订阅者
总结一下： 我们需要把观察者对象创建出来，他有消息容器，有三个方法，分别是订阅信息方法，取消订阅方法，发送订阅信息方法。                        
                        
注册信息方法: 将订阅者注册的信息推送到信息队列中。接受两个参数，一个是动作类型，相应的信息。而且需要保证多个模块注册同一个信息能够顺利执行。                 
发布者信息方法： 当观察者发布一个信息时， 将所有订阅者订阅的信息依次执行，接受两个参数，消息类型和动作执行是传递的参数。然后遍历消息只想方法队列，并且一次执行。然后将信息类别以及传递的参数打包一次传入信息执行方法中。                   
注销方法: 需要两个参数，消息类型和执行的某一个动作。

```javascript
// 把观察者放在闭包中，页面加载就执行
class Observer {
    // 消息容器
    constructor() {
        this.__message = {};
    }
    // 注册
    regist(type, fn) {
        // 如果消息不存在，那么创建一个消息
        if (typeof this.__message[type] === 'undefined') {
            // 动作推送到消息对应的动作执行队列中
            this.__message[type] = [fn];
        } else {    // 消息已经存在
            this.__message[type].push(fn);
        }
    }
    // 发布
    fire(type, args) {
        // 如果该消息没有被注册，就直接返回
        if (!this.__message[type]) return;
        // 定义消息消息
        let events = {
                type,                           // 消息类型
                args: args || {}                // 消息携带的数据
            },
            i = 0,                          // 消息动作循环变量
            len = this.__message[type].length;   // 消息动作长度
        for (; i < len; i++) {
            // 依次执行注册信息对应的动作序列
            this.__message[type][i].call(this, events);
        }
    }
    remove(type, fn) {
        // 如果消息队列存在
        if (this.__message[type] instanceof Array) {
            // 从最后一个动作反向遍历
            let i = this.__message[type].length - 1;
            for (; i >= 0; i--) {
                // 如果存在就移除相对应的动作
                this.__message[type][i] === fn && this.__message[type].splice(i, 1);
            }
        }
    }
}
let observer = new Observer();

// 订阅一个信息
observer.regist('test', function (e) {
    console.log(e.type, e.args.message)
});

// 发布一个信息
observer.fire('test', {
    message: '传递的参数'
});
```

#### 各组件需要通信的思考
因为不同的工程师吧自己的代码卸载了不同的必报模块中导致无法互相调用。我们使用观察者模式来解决问题。首先要分析什么模块应该注册消息，那些模块应该发布消息。
发布留言和删除留言是观察者发布信息、追加评论和用户信息的增减是被动出发所以是订阅者需要去注册信息。
用户模块是发布信也是信息的接受者，提交模块是信息的发送者，浏览模块是信息的接受者。

具体实现如下：             
```javascript
let Observer = require('./01、创建一个订阅者');
let observer = new Observer();

// 外观模式 简化获取元素
function $(id) {
    return document.getElementById(id);
}
//工程师 A
(function() {
    // 追加一则信息
    function addMsgItem(e) {
        let text = e.args.text,                     // 获取信息中用户添加的文本内容
            ul = $('msg'),                          // 留言容器元素
            li = document.createElement('li'),      // 创建内容容器元素
            span = document.createElement('span');  // 删除按钮
        li.innerHTML = text;

        // 关闭按钮
        span.onclick = function () {
            ul.removeChild(li);
            // 发布删除留言信息
            observer.fire('removeCommentMessage', {
                num: -1
            });
        };
        // 添加删除按钮
        li.appendChild(span);
        // 添加留言节点
        ul.appendChild(li);
    }
    // 注册添加评论信息
    observer.regist('addCommentMessage', addMsgItem);
})();

// 工程师B
(function () {
    function changeMsgNum(e) {
        // 获取需要增加的用户信息数目
        let num = e.args.num;
        // 增加用户消息数目并写入页面
        $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num;
    }
    // 注册添加评论信息
    observer.regist('addCommentMessage', changeMsgNum);
    observer.regist('removeCommentMessage', changeMsgNum);
})();

// 工程师C 提交信息
(function () {
    $('user_submit').onclick = function () {
        // 获取用户输入
        let text = $('user_input');
        if(text.value === '') return;
        // 发布一则评论信息
        observer.fire('addCommentMessage', {
            text: text.value,
            num: 1
        });
        text.value = ''
    }
})();
```

### 解决对象间的耦合
以课堂老师提问学生的例子来说明问题： 创建学生类，学生是被提问对象，所以他们是订阅者。同时学生也要对问题进行回答的动作。
```javascript
let Observer = require('./01、创建一个订阅者');
let observer = new Observer();

// 学生类
let Student = function (result) {
    let that = this;
    that.result = result;
    // 回答问题动作
    that.say = function () {
        console.log(that.result);
    }
};
// 所有学生都可以回答问题，他们回答问题的方法answer
Student.prototype.answer = function (question) {
    // 注册问题
    observer.regist(question, this.say)
};
// 如果学生睡着了，就没有办法回答问题了
Student.prototype.sleep = function (question) {
    console.log(this.result + question + ' 已经注销');
    // 取消对老师的监听
    observer.remove(question, this.say)
};

// 教师类，是一个发布者，他需要一个提问方法
let Teacher = function(){};
Teacher.prototype.ask = function (question) {
    console.log(`问题是 ${question}`);
    // 发布问题
    observer.fire(question);
};

/*测试*/
// 创建三个学生对象
let student1 = new Student('学生1 回答问题');
let student2 = new Student('学生2 回答问题');
let student3 = new Student('学生3 回答问题');

// 这三个同学监听老师的提问
student1.answer('什么是设计模式');
student1.answer('简述观察者模式');
student2.answer('什么是设计模式');
student3.answer('什么是设计模式');
student3.answer('简述观察者模式');
// 3同学睡着了，注销监听
student3.sleep('简述观察者模式');

// 教师类
let teacher = new Teacher();
teacher.ask('什么是设计模式');
teacher.ask('简述观察者模式');
```


### <div id="class04-18">18章、状态模式</div>
**状态模式（State）**: 当一个对象内部状态发生变化时，会导致其行为发生改变，状态改变了对下对象。                   

#### 用最美图片写一个例子
需要选出本月最美图片，根据网友的投票，每张图片有一下几个结果。
```javascript
// 展示结果
function showResult(result) {
    if(result === 0) {
        // 处理结果 0
    } else if (result === 1) {
        // 处理结果1
    } else if(result === 2) {
        // 处理结果2
    } else if(result === 3) {
        // 处理结果3
    }
}
```
如果某一天项目经理心血来潮，想增删结果，那就悲剧了。用状态模式，每一种条件作为对象内部的一种状态，面对不同判断结果，它其实就只是选择对象内的一种状态而已。                   
一个最简单的例子，我们可以将不同的判断结果封装在对象内，然后返回一个可以被调用的接口。
```javascript
// 投票结果状态对象
class ResultState {
    // 判断结果保存在内部状态中
    constructor() {
        this.states = {
            state0: function () {
                console.log('这里是第一种结果状态')
            },
            state1: function () {
                console.log('这里是第二种状态结果')
            },
            state2: function () {
                console.log('这里是第三种状态结果')
            },
            state3: function () {
                console.log('这里是第四种状态结果')
            }
        }
    }
    show(result) {
        this.states['state' + result] && this.states['state' + result]()
    }
}
let resultState = new ResultState();

/*测试*/
resultState.show(3);
```
上面这个例子基本上有了状态模式的基本雏形了。
对于状态模式，主要是讲条件判断的不同结果转换为状态对象的内部状态。一般作为状态对象内部的私有变量。提供一个可以调用的对象内部状态的接口方法，做增删改用。                

#### 另外一个例子，超级玛丽                    
在超级玛丽游戏中，跳跃，开枪，蹲下，奔跑等都是一个一个的状态。很多时候再游戏中需要好几个状态同时触发的。                    
如果用普通的if else 的方式来做判断，会出现下面的结果：
```javascript

// 单动作条件判断 每增加一个动作就需要添加一个判断
let lastAction = '';
function changeMarry(action) {
    if(action === 'jump') {
        // 跳跃
    } else if(cation === 'move') {
        // 移动动作
    } else {
        // 默认情况
    }
}

// 复合动作的判断 开销是要翻倍的
let lastAction1 = '';
let lastAction2 = '';
function changeMarry(action1, action2) {
    if(action1 === 'shoot') {
        // 射击
    } else if(action1 === 'jump') {
        // 跳跃
    } else if(action1 === 'move' && action2 === 'shoot') {
        // 移动射击
    } else if(action1 === 'jump' && action2 === 'shoot') {
        // 跳跃射击
    }
    //保留上一个动作
    lastAction1 = action1 || '';
    lastAction2 = action2 || '';
}
```

#### 状态的优化
上面虽然实现的需求，但是可维护性非常糟糕。用状态模式优化： 首先创建一个状态对象，内部保存状态变量，然后内部封装好每一种动作对应的状态，最后状态返回一个借口对象。
```javascript
class Action {
    constructor() {
        // 内部私有变量
        this._currentState = {};
        // 动作与状态方法的映射
        this.states = {
            jump() {
                console.log('跳跃')
            },
            move() {
                console.log('移动')
            },
            shoot() {
                console.log('移动')
            },
            squat() {
                console.log('下蹲')
            }
        }
    }
}

class MarryState extends Action {
    constructor() {
        super();
    }

    //改变状态方法
    changeState() {
        let arg = arguments;
        // 重置内部状态
        this._currentState = {};
        if(arg.length) {
            for(let i  = 0, len = arg.length; i< len; i++) {
                // 向内部添加动作
                this._currentState[arg[i]] = true;
            }
        }
        return this;
    }
    // 执行动作
    gose() {
        console.log('触发一次动作');
        for(let i in this._currentState) {
            // 如果该动作在就执行
            this.states[i] && this.states[i]();
        }
        return this;
    }
}

let marry  = new MarryState();
marry.changeState('jump', 'shoot').gose().gose().changeState('shoot').gose();
```


### <div id="class04-19">19章、策略模式</div>
**策略模式（Strategy）**: 将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定的独立性，不会碎客户端变化而变化。                  

#### 商品促销的例子                        
在圣诞节，一部分商品五折出售，一部分八折出售，一部分九折出售。到了元旦节，普通用户满100返30， vip满100返50。
状态模式可以处理这种多分支的情况。但是这里有圣诞节和元旦节两种情况。对于一种商品的促销策略只有一种情况，而不需要其他促销策略。因此采用策略模式。

从结构上看，他和状态模式很像。内部封装一个对象，通过返回的接口对象实现内部对象的调用。不同的是策略模式不需要状态管理，状态之间没有依赖关系，策略之间可以互换，在策略对象内部保存的是相互独立的一些算法。            
首先要讲这些算法封装在一个策略对象内，然后对每一种商品的策略调用时，直接对策略对象中的算法调用就可以了。而策略算法又独立地封装在策略对象内。

#### 策略对象的实现
```javascript
// 价格策略对象
class PriceStrategy {
    constructor() {
        // 内部算法对象
        this.stragtegy = {
            // 100返30
            return30(price) {
                return +price + parseInt( price / 100) * 30;
            },
            // 100 返 50
            return50(price) {
                return +price + parseInt(price/ 100) * 50;
            },
            // 9 折
            percent90(price) {
                return price * 100 * 90 / 10000
            },
            percent80(price) {
                return price * 100 * 80 / 10000
            },
            percent50(price) {
                return price * 100 * 50 / 10000
            }
        }
    }
    // 策略算法调用接口
    getPrice(algorithm, price) {
        return this.stragtegy[algorithm] && this.stragtegy[algorithm](price);
    }
}
let priceStrategy = new PriceStrategy();
let price = priceStrategy.getPrice('return50', 314.67);
console.log(price);
```
策略模式我们外部看不到算法的具体实现，我们也只关心算法实现的记过，不关注过程。                 

#### jquery中的缓冲函数
让一个div动起来，通过对jquery的animate动画传入不同运动算法就可以实现不同的运动曲线了。
```javascript
$('div').animate({width:'200px'}, 1000, 'linear');
$('div').animate({width:'200px'}, 1000, 'swing');
```
这个就是用策略模式实现的，提供了linear、swing两种曲线就是策略算法。                     


#### 表单验证
```javascript
class InputStrategy {
    constructor() {
        this.strategy = {
            // 是否为空
            notNull(value) {
                return /\s+/.test(value) ? '请输入内容' : '';
            },
            // 是否是一个数字
            number(value) {
                return /^[0-9]+(\.[0-9]?$)/.test(value) ? '' : '请输入数字';
            },
            phone(value) {
                return /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/.test(value) ? '' : '正输入正确的电话号码格式， 如： 010-12345678 或者 0234-1234567'
            }
        }
    }
    check(type, value) {
        // 祛除空格
        value = value.replace(/^\s|\s+$/g, '');
        return this.strategy[type] ? this.strategy[type](value) : '没有改类型检测方法'
    }
    // 添加策略
    addStrategy(type, fn) {
        this.strategy[type] = fn;
    }
}
let inputStrategy = new InputStrategy();
// 比如说我们需要添加一个扩展
inputStrategy.addStrategy('email', function (value) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value) ? '' : '请输入真确的email'
});

/*算法的调用*/
// 外观模式
function $tag(tag, context) {
    context  = context || document;
    return context.getElementsByTagName(tag);
}
// 提价按钮
$tag('input')[1].onclick = function () {
    // 获取输入框的内容
    let value = $tag('input')[0].value;
    // 获取日期格式检验结果
    $tag('span')[0].innerHTML = inputStrategy.check('email', value);
};
```

### <div id="class04-20">20章、责任链模式</div>
**责任链模式（Chain of Responsibility）**: 解决请求的发送者与请求的接受者之间的耦合。通过责任链上的多个对象分解请求流程。实现请求在多个对象之间传递，知道最后一个对象完成请求处理。                    

#### 半成品的需求                     
有一个半成品的需求，首先要在表单输入框中添事件，做输入提示和输入验证处理。完成功能需要向服务端发送请求，还要在原有的页面中创建其他的组件，但是具体输入框有哪些不确定。
分析这个需求： 有的输入框需要绑定keyup事件，有的输入框需要绑定change事件，绑定事件是第一部分。第二部分创建XHR进行一步请求。第三部分是适配相应数据，处理数据格式。最后一部分是向组件创建器传入数据生成组件。
```javascript
// 异步请求对象
let sendData = function (data, dealType, dom) {
    let xhr = new XMLHttpRequest(),
        url = 'getData.json?mod=userInfo';
    // 请求返回事件
    xhr.onload = function () {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            dealData(xhr.responseText, dealType, dom);
        } else {
            // 请求失败
        }
        // 拼接请求字符串
        for (let i in data) {
            url += '&' + i + '=' + data[i];
        }
        // 发送请求
        xhr.open('get', url, true);
        xhr.send(null);
    }
};

// 响应数据适配模块
let dealData = function (data, dealType, dom) {
    let dataType = Object.prototype.toString.call(data);
    switch (dealType) {
        // 输入框提示
        case 'sug':
            // 如果是数组对象
            if(dataType === '[object Array]') {
                // 创建提示框组件
                return createSug(data, dom);
            }
            // 将相应的对象数据转化为数组
            if(dataType === '[object Object]') {
                let newData = [];
                for (let i in data) {
                    newData.push(data[i]);
                }
                return createSug(newData, dom);
            }
            return createSug([data], dom);
        case 'validate':
            // 校验组件
            return createValidateResult(data, dom);
    }
};

// 创建提示框组件
let createSug = function (data, dom) {
    let i = 0,
        len = data.length,
        html = '';
    // 拼接每一条语句
    for(; i < len; i++) {
        html += `<li> ${data[i]} </li>`
    }
    dom.parentNode.getElementsByTagName('ul')[0].innerHTML = html;
};

// 创建校验组件
let createValidateResult = function (data, dom) {
    dom.parentNode.getElementsByTagName('span')[0].innerHTML = data;
};
```

#### 站点测试-单元测试
```javascript
/*站点的测试*/
dealData('用户名不对', 'validate', input[0]);
dealData(123, 'sug', input[1]);
dealData(['爱奇艺', '阿里巴巴'], 'sug', input[1]);
dealData({
    'iqy': '爱奇艺',
    'albb': '阿里巴巴'
}, 'sug', input[1]);
// 这样测试会直接调用到了， createSug 和 createValidateResult , 可以先暂时简化他们， 模拟一下测试方法
let createSug = function (data, dom) {
    console.log(data, dom, 'createSug');
};
let createValidateResult = function (data, dom) {
    console.log(data, dom, 'createValidateResult')
};
// 然后就可以执行了
```
最后等方案确定之后，直接把我们需要的东西灌进去就可以了。

#### 总结
责任链模式，其实就是把一个较大的或者不确定的需求，拆分成一个一个细小的模块。各自做好各自模块的功能，把做好的事儿，交给下一步做。                                          


### <div id="class04-21">21章、命令模式</div>                         
**命令模式（Command）**: 将请求和实现解耦并封装成为独立的对象，从而使不同的请求对客户端的实现参数化。                   

#### 自由化创建视图的例子
在莫夸里面创建一个图片，有时候又想创建多个图片。这种场景就可以使用命令模式。
命令模式就是讲请求和实现解耦。将创建模块的逻辑封装在一个对象里面，然后对外提供一个参数化请求接口，通过调用这个接口传递一些参数实现调用命令对象内部的一些方法。

#### 具体实现
```javascript
// 命令对象
let viewCommand = function() {
    let me = this;
    let tpl = {
        // 展示图片结构模块
        product: [
            `<div>
                <img src="${me.src}" alt="">
                <p>${me.text}</p>
            </div>`
        ].join(''),
        // 展示标题结构模板
        title: [
            `<div class="title">
                <div class="main">
                    <h2>${me.title}</h2>
                    <p>${me.text}</p>
                </div>
            </div>`
        ].join('')
    };
    // 格式化字符串缓存字符串
    let html = '';

    // 方法集合
    let Action = {
        // 创建方法
        create: function(data, view){
            if(data.length) {
                me = Object.assign(me, data);
                for (let i = 0,len = data.length;i < len;i++) {
                    // 将格式化之后的字符串缓存到html中
                    html += tpl[view];
                }
            } else {
                me = Object.assign(me, data);
                html +=tpl[view]
            }
        },
        // 展示方法
        display: function(container, data, view){
            if(data) {
                this.create(data, view);
            }
            document.getElementById(container).innerHTML = html;
            html = '';
        },
    };
    // 命令接口
    return function excute(msg){
        msg.param = Object.prototype.toString.call(msg.param) === '[Object Array]' ? msg.param : [msg.param];
        Action[msg.command].apply(Action, msg.param);
    }
}
```

#### 测试上面的代码
```javascript
// 测试数据
let productData = [
        {
            src: 'command/01.jpg',
            text: '图片1'
        },
        {
            src: 'command/02.jpg',
            text: '图片2'
        },
        {
            src: 'command/03.jpg',
            text: '图片3'
        }
    ],
    titleData = {
        title: '我是title',
        tips: 'bibibibibibibibibib'
    };

// 调用
viewCommand({
    command: 'create',
    //
    param: ['title', {
        src: 'command/01.jpg',
        text: '图片1'
    }, 'product']
});

// 创建多个图片
viewCommand({
    command: 'display',
    param: ['product', productData, 'product']
})
```

#### 另外的需求，绘图命令
在使用canvas的时候，经常调用内置方法，需要不停的使用canvas元素的上下文。这样开发中耦合度很高，如果被人串改了canvas的上下文，整个项目就跑不起来。所以有解耦的必要，可以考虑使用命令模式。                               
```javascript
let CanvasCommand = (function () {
    let canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // 内置方法
    let Action = {
        // 填充颜色
        fillStyle(c) {
            ctx.fillStyle = c;
        },
        // 填充矩形
        fillRect(x, y, width, height) {
            ctx.fillRect(x, y, width, height);
        },
        // 描边色彩
        strokeStyle(c) {
            ctx.strokeStyle = c;
        },
        // 描边矩形
        strokeRect(x, y, width, height) {
            ctx.strokeRect(x, y, width, height);
        },
        // 填充文字
        fillText(text, x, y) {
            ctx.fillText(text, x, y);
        },
        // 开启路径
        beginPath() {
            ctx.beginPath();
        },
        // 移动画笔
        moveTo(x, y) {
            ctx.moveTo(x, y);
        },
        // 画笔连线
        lineTo(x, y) {
            ctx.lineTo(x, y);
        },
        // 绘制弧线
        arc(x, y, r, begin, end, dir) {
            ctx.arc(x, y, r, begin, end, dir);
        },
        // 填充
        fill() {
            ctx.fill();
        },
        // 描边
        stroke() {
            ctx.stroke();
        }
    };

    return {
        // 命令接口
        excute(msg) {
            if(! msg) return;
            if(msg.length) {
                for(let i = 0,len = msg.length;i<len;i++) {
                    arguments.callee(msg[i]);
                }
            } else {
                msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ? msg.param: [msg.param];
                Action[msg.command].apply(Action, msg.param);
            }
        }
    }
})();

// 填充给一个矩形
CanvasCommand.excute([
    {
        command: 'fillStyle',
        param: 'red'
    },
    {
        command: 'fillRect',
        param: [20,20,100,100]
    }
])
```




