## 第四篇、行为型设计模式

<!-- toc -->

- [第十六章、模板方法模式](#%E7%AC%AC%E5%8D%81%E5%85%AD%E7%AB%A0%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F)
  * [提示框归一化](#%E6%8F%90%E7%A4%BA%E6%A1%86%E5%BD%92%E4%B8%80%E5%8C%96)
  * [创建基本提示框](#%E5%88%9B%E5%BB%BA%E5%9F%BA%E6%9C%AC%E6%8F%90%E7%A4%BA%E6%A1%86)
  * [根据模板创建类](#%E6%A0%B9%E6%8D%AE%E6%A8%A1%E6%9D%BF%E5%88%9B%E5%BB%BA%E7%B1%BB)
  * [继承类也可以作为模板类](#%E7%BB%A7%E6%89%BF%E7%B1%BB%E4%B9%9F%E5%8F%AF%E4%BB%A5%E4%BD%9C%E4%B8%BA%E6%A8%A1%E6%9D%BF%E7%B1%BB)
  * [创建一个提示框](#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%8F%90%E7%A4%BA%E6%A1%86)
  * [创建多类导航](#%E5%88%9B%E5%BB%BA%E5%A4%9A%E7%B1%BB%E5%AF%BC%E8%88%AA)
- [第十七章、观察者模式](#%E7%AC%AC%E5%8D%81%E4%B8%83%E7%AB%A0%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)
  * [场景是各个模块需要通信](#%E5%9C%BA%E6%99%AF%E6%98%AF%E5%90%84%E4%B8%AA%E6%A8%A1%E5%9D%97%E9%9C%80%E8%A6%81%E9%80%9A%E4%BF%A1)
  * [创建一个订阅者](#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E8%AE%A2%E9%98%85%E8%80%85)
  * [各组件需要通信的思考](#%E5%90%84%E7%BB%84%E4%BB%B6%E9%9C%80%E8%A6%81%E9%80%9A%E4%BF%A1%E7%9A%84%E6%80%9D%E8%80%83)
- [解决对象间的耦合](#%E8%A7%A3%E5%86%B3%E5%AF%B9%E8%B1%A1%E9%97%B4%E7%9A%84%E8%80%A6%E5%90%88)
- [第十八章、状态模式](#%E7%AC%AC%E5%8D%81%E5%85%AB%E7%AB%A0%E7%8A%B6%E6%80%81%E6%A8%A1%E5%BC%8F)
  * [用最美图片写一个例子](#%E7%94%A8%E6%9C%80%E7%BE%8E%E5%9B%BE%E7%89%87%E5%86%99%E4%B8%80%E4%B8%AA%E4%BE%8B%E5%AD%90)
  * [另外一个例子，超级玛丽](#%E5%8F%A6%E5%A4%96%E4%B8%80%E4%B8%AA%E4%BE%8B%E5%AD%90%E8%B6%85%E7%BA%A7%E7%8E%9B%E4%B8%BD)
  * [状态的优化](#%E7%8A%B6%E6%80%81%E7%9A%84%E4%BC%98%E5%8C%96)
- [第十九章、策略模式](#%E7%AC%AC%E5%8D%81%E4%B9%9D%E7%AB%A0%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F)
  * [商品促销的例子](#%E5%95%86%E5%93%81%E4%BF%83%E9%94%80%E7%9A%84%E4%BE%8B%E5%AD%90)
  * [策略对象的实现](#%E7%AD%96%E7%95%A5%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AE%9E%E7%8E%B0)
  * [jquery中的缓冲函数](#jquery%E4%B8%AD%E7%9A%84%E7%BC%93%E5%86%B2%E5%87%BD%E6%95%B0)
  * [表单验证](#%E8%A1%A8%E5%8D%95%E9%AA%8C%E8%AF%81)
- [第二十章、责任链模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E7%AB%A0%E8%B4%A3%E4%BB%BB%E9%93%BE%E6%A8%A1%E5%BC%8F)
  * [半成品的需求](#%E5%8D%8A%E6%88%90%E5%93%81%E7%9A%84%E9%9C%80%E6%B1%82)
  * [站点测试-单元测试](#%E7%AB%99%E7%82%B9%E6%B5%8B%E8%AF%95-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)
  * [总结](#%E6%80%BB%E7%BB%93)
- [第二十一章、命令模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%80%E7%AB%A0%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F)
  * [自由化创建视图的例子](#%E8%87%AA%E7%94%B1%E5%8C%96%E5%88%9B%E5%BB%BA%E8%A7%86%E5%9B%BE%E7%9A%84%E4%BE%8B%E5%AD%90)
  * [具体实现](#%E5%85%B7%E4%BD%93%E5%AE%9E%E7%8E%B0)
  * [测试上面的代码](#%E6%B5%8B%E8%AF%95%E4%B8%8A%E9%9D%A2%E7%9A%84%E4%BB%A3%E7%A0%81)
  * [另外的需求，绘图命令](#%E5%8F%A6%E5%A4%96%E7%9A%84%E9%9C%80%E6%B1%82%E7%BB%98%E5%9B%BE%E5%91%BD%E4%BB%A4)
- [第二十二章、访问者模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%BA%8C%E7%AB%A0%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F)
- [第二十三、中介者模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%B8%89%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F)
- [第二十四章、备忘录模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E5%9B%9B%E7%AB%A0%E5%A4%87%E5%BF%98%E5%BD%95%E6%A8%A1%E5%BC%8F)
- [第二十五章、迭代器模式](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E4%BA%94%E7%AB%A0%E8%BF%AD%E4%BB%A3%E5%99%A8%E6%A8%A1%E5%BC%8F)
- [第二十六章、解释器](#%E7%AC%AC%E4%BA%8C%E5%8D%81%E5%85%AD%E7%AB%A0%E8%A7%A3%E9%87%8A%E5%99%A8)

<!-- tocstop -->

### 第十六章、模板方法模式
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


### 第十七章、观察者模式
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


### 第十八章、状态模式
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


### 第十九章、策略模式
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

### 第二十章、责任链模式
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


### 第二十一章、命令模式                         
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


### 第二十二章、访问者模式
定义个绑定事件， 但是在低版本浏览器中会报错。
```js
let bindEvent = function (dom, type, fn) {
    if(dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if(dom.attachEvent) {
        dom.attachEvent('on'+ type, fn);
    } else {
        dom['on'+ type] = fn;
    }
};


/**
 * 下面的在IE低版本浏览器运行会有问题
 * 这个地方运行就有问题了，因为this.style 中的this 在低版本IE中，指向的是window对象
 * @type {HTMLElement | null}
 */
let demo = document.getElementById('dome');
bindEvent(demo, 'click', function () {
    this.style.background = 'red';
});
```

[对象访问器的一个示例](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/22章、访问者模式/02、对象访问器.js)
```js
/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-31 18:10
 */

let Visitor = {
    // 截取方法
    splice: function () {
        // splice 方法参数， 从原来的参数的第二个参数开始计算
        let args = Array.prototype.splice.call(arguments, 1);
        // 对第一个参数对象执行splice 方法
        return Array.prototype.splice.apply(arguments[0], args);
    },

    push: function () {
        let len = arguments[0].length || 0;
        let args = this.splice(arguments, 1);
        arguments[0].length = len + arguments.length - 1;
        return Array.prototype.push.apply(arguments[0], args);
    },

    pop: function () {
        return Array.prototype.pop.apply(arguments[0]);
    }
};


// 这样就可以操作类数组的方式操作对象了
let a = {};
console.log(a.length);          // undefined
Visitor.push(a, 1,2,3,4);
console.log(a.length);          // 4
Visitor.push(a, 4,5,6);
console.log(a);                 // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 4, '5': 5, '6': 6, length: 7 }
console.log(a.length);          // 7
Visitor.pop(a);
console.log(a);                 // { '0': 1, '1': 2, '2': 3, '3': 4, '4': 4, '5': 5, length: 6 }
console.log(a.length);          // 6
Visitor.splice(a, 2);
console.log(a);                 // { '0': 1, '1': 2, length: 2 }
```




### 第二十三、中介者模式
通过中介者对象封装一些列对象之间的交互，是对象之间不再相互引用，降低耦合度。有的时候也可以改变对象之间的交互。

跟观察者模式的区别：                       
首先他们都是通过消息收发机制实现的，不过在观察者模式中，一个对象既可以是消费者的发送者，也可以是消息的接受者，他们之间的信息交流依托于消息系统之间的解耦。                       
中介者模式中消息的发送方只有一个，就是中介者对象，而且中介者对象不能订阅消息， 只能那些活跃对象(订阅者)才能订阅中介者的消息。

代码示例如下： [01、创建中介者对象](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/23、中介者模式/01、创建中介者对象.js)
```js
/**
 * create by yanle
 * create time 2019/1/2 下午4:46
 */

class Mediator {
    constructor() {
        // 消息对象
        this._msg = {};
    }

    /**
     * 订阅消息方法
     * @param type  消息名称
     * @param action    消息回到函数
     */
    register(type, action) {
        // 如果消息存在
        if(this._msg[type]) {
            // 存入
            this._msg[type].push(action)
        } else {
            // 消息不存在, 创建容器
            this._msg[type] = [];
            this._msg[type].push(action)
        }
    }

    /**
     * 发布消息的方法
     * @param type  发布消息的名称
     */
    send(type) {
        if(this._msg[type]) {
            for (let actionKey in this._msg[type]) {
                // 执行回调函数
                this._msg[type] && this._msg[type][actionKey]();
            }
        }
    }
}

module.exports = Mediator;

let mediator = new Mediator();
mediator.register('demo', function () {
    console.log('first');
});
mediator.register('demo', function () {
    console.log('second')
});

mediator.send('demo');  // 分别输出first, second
```


一个实际场景的使用：[02、一个完整的使用场景](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/23、中介者模式/02、一个完整的使用场景.js)
```js
/**
 * create by yanle
 * create time 2019/1/2 下午5:11
 */

const Mediator = require('./01、创建中介者对象');

/**
 * 隐藏导航方法
 * @param mod   模块
 * @param tag   标签
 * @param showOrHide    是否隐藏（show/hide）
 */
let showHideNavWidget = function (mod, tag, showOrHide) {
    // 获取导航
    let dom = document.getElementById(mod);
    // 过去tag
    let tags = dom.getElementsByTagName(tag);
    let isShowOrHide = (!showOrHide || showOrHide === 'hide') ? 'hidden' : 'visible';
    tags.forEach(function (item) {
        item.style.visibility = isShowOrHide;
    })
};


const mediator = new Mediator();

// 订阅隐藏用户收藏导航消息提示信息
mediator.register('hideAllNavNum', function () {
    showHideNavWidget('collection_nav', 'b', false);
});
// 订阅现实用户收藏导航消息提示信息
mediator.register('showAllNavNum', function () {
    showHideNavWidget('collection_nav', 'b', true);
});
// 订阅隐藏用户收藏导航网址信息
mediator.register('hideAllNavUrl', function () {
    showHideNavWidget('collection_nav', 'span', false);
});
// 订阅现实用户收藏导航网址信息
mediator.register('showAllNavUrl', function () {
    showHideNavWidget('collection_nav', 'span', true);
});

// 发布消息
let hideNum = document.getElementById('hide_num'),
    hideUrl = document.getElementById('hide_url');
// 消息提示选框事件
hideNum.onchange = function () {
    if(hideNum.checked) {
        mediator.send('hideAllNavNum');
    } else {
        mediator.send('showAllNavNum');
    }
};

// 网址选框事件
hideUrl.onchange = function () {
    if(hideUrl.checked) {
        mediator.send('hideAllNavUrl');
    } else {
        mediator.send('showAllNavUrl');
    }
};
```


### 第二十四章、备忘录模式
描述：                         
在不破坏对象的封装性的前提下， 在对象之外捕获并保存该对象内部的状态以便日后对象使用或者对象回复到以前的某个状态。

实际场景：                   
有这么一个场景， 就是在分页中， 用户点击下一页的时候， 就去去请求数据， 但是又点回上一页的时候， 大多数的操作还是请求上一页数据。
这样的操作就会导致多余的请求。为了避免这种多余的请求， 我们就可以做缓存数据。

```js
/**
 * create by yanle
 * create time 2019/1/2 下午5:56
 */

class Page {
    constructor() {
        this.cache = {};
    }

    init(page, fn) {
        // 判定是否有缓存
        if(this.cache[page]) {
            // 恢复到该页面的状态 ， 现实该页面的内容
            this.showPage(page, this.cache[page]);
            // 执行成功的回调
            fn && fn();
        } else {
            // 没有cache数据
            $.post('/data/getNewsData.php', {
                page: page
            },  (res) => {
                // 请求成功
                if(res.errno === 0) {
                    // 显示页面数据
                    this.showPage(page, res.data);
                    this.cache[page] = res.data;
                    fn && fn();
                } else {
                    console.log('异常处理');
                }
            })
        }
    }

    showPage(page, data) {
        // 处理页面逻辑
        console.log('处理页面逻辑', page, data)
    }
}
```

示例： [01、新闻缓存器](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/24、备忘录模式/01、新闻缓存器.js)


### 第二十五章、迭代器模式
描述：                     
在不暴露对象内部结构的同时， 可以顺序的访问聚合对象的元素。

```js
/**
 * create by yanle
 * create time 2019/1/2 下午6:26
 */

class Iterator {
    constructor(items, container) {
        // 父容器， 若 container 参数存在， 并且可以获取该元素则获取， 否则获取document
        this.container = container && document.getElementById(container) || document;
        // 获取元素
        this.items = this.container.getElementsByTagName(items);
        // 元素长度
        this.length = this.items.length;

        // 当前索引值， 默认： 0
        this.index = 0;
        // 缓存源数组splice方法
        this.splice = [].splice();
    }

    first() {
        this.index = 0;
        return this.items[this.index];
    }

    last() {
        this.index = this.length - 1;
        return this.items[this.index];
    }

    pre() {
        if (--this.index > 0) {
            return this.items[this.index];
        } else {
            this.index = 0;
            return null;
        }
    }

    next() {
        if (++this.index < this.length) {
            return this.items[this.index]
        } else {
            this.index = length - 1;
            return null;
        }
    }

    get(num) {
        this.index = num >= 0 ? num % this.length : num % this.length + this.length;
        return this.items[this.index];
    }

    // 对于每一个元素执行某一个方法
    dealEach(fn) {
        // 第二个参数作为回调函数参数
        let args = this.splice.call(arguments, 1);
        for (let item of this.items) {
            fn.apply(item, args);
        }
    }

    // 对某一个元素执行某一个方法
    dealItem(num, fn) {
        fn.apply(this.get(num), this.splice.call(arguments, 2))
    }

    // 排他方式处理某一个元素
    exclusive(nums, allfn, numfn) {
        // 对所有元素执行回调函数
        this.dealEach(allfn);
        // 如果是num类型的数组
        if(Object.prototype.toString.call(nums) === "[object Array]") {
            nums.forEach((num) => {
                this.dealItem(num, numfn)
            })
        } else {
            this.dealItem(nums, numfn)
        }
    }
}


/*
* 比如获取页面中id 为 container 的ul元素中的4个li元素
* */
let demo  = new Iterator('li', 'container');
console.log(demo.first());          // <li>1</li>
console.log(demo.pre());            // null
console.log(demo.next());           // <li>2</li>
console.log(demo.get(2000));        // <li>1</li>

// 处理所有元素
demo.dealEach(function (text, color) {
    this.innerHTML = text;
    this.style.background = color;
}, 'test', 'pink');

// 排他思想处理3，4元素
demo.exclusive([2,3], function () {
    this.innerHTML = '被排除了';
    this.style.background = 'green';
}, function () {
    this.innerHTML = '选中的';
    this.style.background = 'red';
});
```

代码示例：               
[01、迭代器的实现](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/25、迭代器模式/01、迭代器的实现.js)


### 第二十六章、解释器
描述：                 
用一些描述性的语句， 几次功能的提取抽象， 形成一套语法规则， 这就是解释器要处理的事情。

```js
/**
 * create by yanle
 * create time 2019/1/3 下午7:14
 */

//  解释器
class Interpreter {
    // 获取兄弟元素名称
    static getSiblingName(node) {
        // 存在兄弟节点
        if(node.previousSibling) {
            let name = '',
                count = 1,
                nodeName = node.nodeName,
                sibling = node.previousSibling;

            // 如果存在前一个兄弟元素
            while(sibling) {
                // 如果节点为元素， 并且节点类型与前一个兄弟元素类型相同， 并且前一个兄弟元素名称存在
                if(sibling.nodeType === 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
                    // 如果节点名称和前一个兄弟元素名称相同
                    if(nodeName === sibling.nodeName) {
                        // 节点名称后面添加计数
                        name += ++count;
                    } else {
                        count = 1;
                        name += '|' + sibling.nodeName.toUpperCase();
                    }
                }
                sibling = sibling.previousSibling;
            }
            return name;
        } else {
            return ''
        }
    }

    // XPath 解释器
    static main(node, wrap = document) {
        let path = [];      // 路径数组
        if(node === wrap) {
            // 容器节点为元素
            if(wrap.nodeType === 1) {
                path.push(wrap.nodeName.toUpperCase());
            }
            return path;
        }

        // 当前节点的父节点不等于容器节点
        if(node.parentNode !== wrap) {
            // 对当前节点的父节点执行遍历操作
            path = arguments.callee(node.parentNode, wrap);
        } else {
            // 容器节点为元素
            if(wrap.nodeType === 1) {
                path.push(wrap.nodeName.toUpperCase());
            }
        }

        // 获取元素的兄弟元素名称统计
        let siblingsNames = this.getSiblingName(node);
        // 如果节点为元素
        if(node.nodeType === 1) {
            path.push(node.nodeName.toUpperCase() + siblingsNames);
        }
        return path;
    }
}

// 使用方式
let path = Interpreter.main(document.getElementById('span7'));
console.log(path);          // HTML>BODY|HEAD>DEV2>DEV2>DEV>UL>LI2>SPAN
```

代码示例：                       
[01、Interpreter](/books/专题知识库/04、js设计模式/04篇、行为型设计模式/26、解释器模式/01、Interpreter.js)


