## <div id="class03">第三篇、结构型设计模式</div>

### <div id="class03-09">09章、外观模式</div>
**外观模式(Facade)**: 为一组复杂的子系统提供一个更高级的统一接口，通过这个接口是的对子系统接口的访问更加容易。


#### 一个点击事件的例子
在大多数的事件绑定中，我们要用 DOM2 级事件处理方法addEventListener来实现，但是在IE9一下的浏览器不支持，要用attachEvent，
如果是不支持DOM2事件处理的低版本浏览器，要用onclick绑定事件。

#### 兼容方式                   
我们可以通过像点套餐一样定义一个统一的接口方法，然后提供一个更加简单的高级接口，简化底层接口不统一的使用需求。
```javascript
    function addEvent(dom , type, fn) {
        if(dom.addEventListener) {
            dom.addEventListener(type, fn ,false);
        } else if(dom.attachEvent) {
            dom.attachEvent('on' + type, fn);
        } else {
            dom['on' + type] = fn;
        }
    }
    let myButton = document.getElementById('myButton');
    addEvent(myButton, 'click', function() {
        console.log('click my button')
    })
```
这样我们就不用在考虑任何浏览器兼容性的问题了，就可以放心绑定事件和处理事件。

#### 其他的兼容处理                
在低版本IE下面，不兼容e.preventDefault() 和 e.target 。也可以通过外观模式来解决
```javascript
let getEvent = function(event) {
    return event || window.event;
};
let getTarget = function(event) {
    let myEvent = getEvent(event);
    return myEvent.target || myEvent.srcElement;
};
//阻止默认行为
let preventDefault = function (event) {
    let myEvent = getEvent(event);
    if(myEvent.preventDefault) {
        myEvent.preventDefault();
    }else {
        myEvent.returnValue = false;
    }
};
```

#### 小型代码库
很多代码库通过外观设计模式来封装多个功能，简化底层操作方法。
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
    },
    on(id, type, fn) {
        this.g(id)['on' + type] = fn;
    }
};
```

### <div id="class03-10">10章、适配器模式</div>
**适配器模式(Adapter)**: 将一个类（对象）的接口（方法或者属性）转化为另外一个接口， 使类（对象）之间接口的不兼容问题通过适配器得以解决。                        
实质上就是为两个代码库缩写的代码兼容运行而书写的额外代码。


#### jquery适配器
如果有一个A框架，跟jquery特别类似，如果我们希望A框架要兼容jquery，那么很简单的做法就是：                     
`window.A = A = jquery`             
这样A框架里面，有jquery的所有方法了，如果A中有的方法； jquery中也有，那么jquery会直接覆盖；如果A有的方法，jquery没有，那么直接沿用A的方法。                    

#### 适配异类框架
比如我们有这样一个类库：                
```javascript
let A = A || {};
A.g = function (id) {
    return document.getElementById(id);
};
A.on = function (id, type, fn) {
    let dom = typeof id === 'string' ? this.g(id) : id;
    if(dom.addEventListener) {
        dom.addEventListener(type, fn ,false);
    } else if(dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
};

//调用
A.on(window, 'load', function(){
    A.on('myButton', 'click', function () {
        // do something
    })
});
```

如果我们想用jquery 替换之前这个类库:
```javascript
/*用jquery来兼容这个类库*/
A.g = function(id) {
    return $(id).get(0);
};
A.on = function(id, type, fn) {
    let dom = typeof id === 'string' ? $('#' + id) :  $(id);
    dom.on(type, fn);
};
```
由此可见，要适配异类框架，要写很多代码。                        


#### 参数适配器
比如一个方法需要传递多个参数：                 
`function doSomeThing(name, title, age, color, size, prize)()`              
记住这些参数顺序是很困难的，我们就直接传递一个对象。但是又不知道传递对象数据是否完整，所以我们需要给定一些默认值，通过是要配齐来适配传递的这个参数对象：                    
```javascript
function doSomeThing(obj) {
    let _adapter = {
        name: 'yanle',
        title: 'no game no life',
        age: 26,
        color: 'prink',
        size: 100,
        prize: 50
    };
    for(let i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i]
    }
    
    // do something
}
```

#### 服务端数据适配器                   
服务端数据适配实际上就是把服务端拿下的数据，做一些适当的数据重组和检验，然后再使用。              
```javascript
function ajaxAdapter(data) {
    return [data['key1'], data['key2'], data['key3']]
}
$.ajax({
    url: 'xxxxxx.json',
    success: function(data) {
        if(data) {
            doSomeThing(ajaxAdapter(data));
        }
    }
})
```


### <div id="class03-11">11章、代理模式</div>
略， 就是类似于相关 跨域的解决方案                  



### <div id="class03-12">12章、装饰者模式</div>
**装饰者模式（Decorator）**: 不改变原对象的基础上，通过对其进行包装扩展（添加属性或者方法）让原有对象可以满足用户的更复杂需求。

#### 比如有这么一个需求
用户点击输入框时，如果输入框输入的内容有限制，那么在其后面显示用户输入内容的限制格式的提示文案 ---------------->>>>>>> 现在要改为：                  
多加一条需求，默认输入框上边显示一行文案，当用户点击输入框的时候，文案消失。                      
这里是以前的代码：               
```javascript
// 输入框元素
let telInput = document.getElementById('tel_input');
// 输入框提示文案
let telWarnText = document.getElementById('tel_warn_text');
// 点击输入框显示输入框输入格式提示文案
input.onclick = function () {
    telWarnText.style.display = 'inline-block';
};
```
这里是修改后的代码：
```javascript
// 输入框元素
let telInput = document.getElementById('tel_input');
// 输入框输入格式提示文案
let telWarnText = document.getElementById('tel_warn_text');
// 输入框提示输入文案
let telDemoText = document.getElementById('tel_demo_text');
// 点击输入框显示输入框输入格式提示文案
input.onclick = function () {
    telWarnText.style.display = 'inline-block';
    telDemoText.style.display = 'none';
};
```

但是紧接着悲剧就来了，修改了电话输入框，还有姓名、地址输入框等等；                   


#### 装饰已有的功能对象                          
原有的功能已经不满足用户的需求了，此时需要做的是对原有的功能添加，设置新的属性和方法来满足新的需求，但是有不影响原来已经有的部分。                          
```javascript
let decorator = function (input, fn) {
    let getInput = document.getElementById(input);
    if(typeof getInput.onclick === 'function') {
        let oldClick = getInput.onclick;
        getInput.onclick = function() {
            // 原来的事件回调函数
            oldClick();
            // 新增的事件回调函数
            fn();
        }
    } else {
        getInput.onclick = fn;
    }
    // 其他事件
};
```


