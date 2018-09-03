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


