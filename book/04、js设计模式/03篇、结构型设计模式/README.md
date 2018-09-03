## <div id="class03">第三篇、结构型设计模式</div>

### <div id="class03-09">09章、外观模式</div>
为一组复杂的子系统提供一个更高级的统一接口，通过这个接口是的对子系统接口的访问更加容易。


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

