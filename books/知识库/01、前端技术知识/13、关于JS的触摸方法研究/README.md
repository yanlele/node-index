# 关于JS的触摸方法             

## touch事件调用

js的touch事件，一般用于移动端的触屏滑动                     
```javascript
$(function(){document.addEventListener("touchmove", _touch, false);}); 
function _touch(event){alert(1);}
```

## 相关说明
### 事件
touchstart:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。          
touchmove:当手指在屏幕上滑动时连续的触发。在这个事件发生期间，调用preventDefault()可阻止滚动。                
touchend:当手指从屏幕上移开时触发。          
touchcancel:当系统停止跟踪触摸时触发。关于此事件的确切触发事件，文档中没有明确说明。                


### event对象上面的属性介绍                  
touches:表示当前跟踪的触摸操作的Touch对象的数组。             
targetTouches:特定于事件目标的Touch对象的数组。               
changeTouches:表示自上次触摸以来发生了什么改变的Touch对象的数组。                  

### 每个Touch对象包含下列属性：                    
clientX:触摸目标在视口中的X坐标。                       
clientY:触摸目标在视口中的Y坐标。                       
identifier：表示触摸的唯一ID。                       
pageX：触摸目标在页面中的x坐标。                     
pageY：触摸目标在页面中的y坐标。                     
screenX:触摸目标在屏幕中的x坐标。                       
screenY:触摸目标在屏幕中的y坐标。                       
target:触摸的DOM节点坐标     


### 具体的示例说明                 
```javascript
/**
 * Created by 晴小篆-颜乐 on 2017/1/26.
 * 移动端触摸控制移动
 * function('元素名称'，上边距，下边距)
 */
module.exports = function touch(element, top, bottom) {
    var width, height;
    var btn = $(element).get(0);
    btn.addEventListener('touchstart', function (e) {
        width = $(this).width();
        height = $(this).height();
        var touch = e.changedTouches[0];
        var x = touch.pageX, y = touch.pageY;
    });

    btn.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var touch = e.changedTouches[0];
        var moveX = touch.pageX, moveY = touch.pageY;
        btn.style.position = 'absolute';
        btn.style.left = moveX - width / 2 + 'px';
        btn.style.top = moveY - height / 2 + 'px';
    });

    btn.addEventListener('touchend', function (e) {
        btn.style.position = 'fixed';
        var changeMoveY = e.changedTouches[0].pageY - $(document).scrollTop() - height / 2;
        var topLine = top;
        var bottomLine = $(window).height() - bottom - height;
        var touch = e.changedTouches[0];
        var endX = touch.pageX, endY = touch.pageY - $(document).scrollTop();
        if (endX < $(window).width() / 2) {
            btn.style.left = '5%';
        } else {
            btn.style.left = '85%';
        }

        if (endY < topLine) {
            btn.style.top = topLine + 'px'
        } else if (endY > bottomLine) {
            btn.style.top = bottomLine + "px"
        } else {
            btn.style.top = changeMoveY + 'px';
        }
    })
}
```









                  


