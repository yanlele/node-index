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



