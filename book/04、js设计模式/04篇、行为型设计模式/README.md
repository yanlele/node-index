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
let Observer = (function () {
    // 消息容器
    let __message = {};
    return {
        // 注册
        regist: function(type, fn){
            // 如果消息不存在，那么创建一个消息
            if(typeof __message[type] === 'undefined') {
                // 动作推送到消息对应的动作执行队列中
                __message[type] = [fn];
            } else {    // 消息已经存在
                __message.push(fn);
            }
        },
        // 发布
        fire: function(type, args){
            // 如果该消息没有被注册，就直接返回
            if(!__message[type]) return;
            // 定义消息消息
            let events = {
                type,                           // 消息类型
                args: args || {}                // 消息携带的数据
            },
                i = 0,                          // 消息动作循环变量
                len = __message[type].length;   // 消息动作长度
            for (; i <len;i++) {
                // 依次执行注册信息对应的动作序列
                __message[type][i].call(this, events);
            }
        },
        // 移除消息
        remove: function(type, fn){
            // 如果消息队列存在
            if(__message[type] instanceof Array) {
                // 从最后一个动作反向遍历
                let i = __message[type].length - 1;
                for(; i >= 0;i--) {
                    // 如果存在就移除相对应的动作
                    __message[type][i] === fn && __message[type].splice(i, 1);
                }
            }
        }
    }
})();

// 订阅一个信息
Observer.regist('test', function (e) {
    console.log(e.type, e.args.message)
});

// 发布一个信息
Observer.fire('test', {
    message: '传递的参数'
});
```




