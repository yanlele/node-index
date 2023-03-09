# 实现函数防抖

参考文档：
[https://blog.csdn.net/beijiyang999/article/details/79832604](https://blog.csdn.net/beijiyang999/article/details/79832604)

## 函数防抖是什么
函数防抖是指对于在事件被触发n秒后再执行的回调，如果在这n秒内又重新被触发，则重新开始计时，是常见的优化，适用于                
- 表单组件输入内容验证            
- 防止多次点击导致表单多次提交                    
等情况，防止函数过于频繁的不必要的调用。                            

## 代码实现


### 思路
用 setTimeout 实现计时，配合 clearTimeout 实现“重新开始计时”。                           
即只要触发，就会清除上一个计时器，又注册新的一个计时器。直到停止触发 wait 时间后，才会执行回调函数。                           
不断触发事件，就会不断重复这个过程，达到防止目标函数过于频繁的调用的目的。


### 初步实现
```javascript
function debounce(func, wait) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(func, wait);         // 返回计时器 ID 
    }
}
container.onmousemove = debounce(doSomething, 1000);
```

### 注解：关于闭包
每当事件被触发，执行的都是那个被返回的闭包函数。                            
因为闭包带来的其作用域链中引用的上层函数变量声明周期延长的效果，
debounce 函数的 settimeout计时器 ID timeout 变量可以在debounce 函数执行结束后依然留存在内存中，供闭包使用。                          

### 优化：修复
相比于未防抖时的                    
```javascript
container.onmousemove = doSomething 
```
防抖优化后，指向 HTMLDivElement 的从 doSomething 函数的 this 变成了闭包匿名函数的 this ，前者变成了指向全局变量。                        
同理，doSomething 函数参数也接收不到 MouseEvent 事件了。                        

### 修复代码
```javascript
function debounce(func, wait) {
    let timeout
    return function () {
        let context = this //传给目标函数
        clearTimeout(timeout)
        timeout = setTimeout(
            ()=>{func.apply(context, arguments)} //修复
        , wait)
    }
}
```

## 优化：立即执行
相比于 一个周期内最后一次触发后，等待一定时间再执行目标函数；                     
我们有时候希望能实现 在一个周期内第一次触发，就立即执行一次，然后一定时间段内都不能再执行目标函数。                      
这样，在限制函数频繁执行的同时，可以减少用户等待反馈的时间，提升用户体验。                       

### 代码
在原来基础上，添加一个是否立即执行的功能                        
```javascript
function debounce(func, wait, immediate) {
    let time
    let debounced = function() {
        let context = this
        if(time) clearTimeout(time)

        if(immediate) {
            let callNow = !time
            if(callNow) func.apply(context, arguments)
            time = setTimeout(
                ()=>{time = null} //见注解
            , wait)
        } else {
            time = setTimeout(
                ()=>{func.apply(context, arguments)}
            , wait) 
        }
    }
    return debounced
}
```
把保存计时器 ID 的 time 值设置为 null 有两个作用:

- 作为开关变量，表明一个周期结束。使得 callNow 为 true，目标函数可以在新的周期里被触发时被执行
- timeout 作为闭包引用的上层函数的变量，是不会自动回收的。手动将其设置为 null ，让它脱离执行环境，一边垃圾收集器下次运行是将其回收。

## 优化：取消立即执行
添加一个取消立即执行的功能。                      
函数也是对象，也可以为其添加属性。                       
为了添加 “取消立即执行”功能，为 debounced 函数添加了个 cancel 属性，属性值是一个函数
```javascript
debounced.cancel = function() {
        clearTimeout(time)
        time = null
 }
```
示意：
```javascript
var setSomething = debounce(doSomething, 1000, true)
container.onmousemove = setSomething
document.getElementById("button").addEventListener('click', function(){
    setSomething.cancel()
})
```

## 完整代码
```javascript
function debounce(func, wait, immediate) {
    let time;
    let debounced = function() {
        let context = this;
        if(time) clearTimeout(time);

        if(immediate) {
            let callNow = !time;
            if(callNow) func.apply(context, arguments);
            time = setTimeout(
                ()=>{time = null} //见注解
            , wait)
        } else {
            time = setTimeout(
                ()=>{func.apply(context, arguments)}
            , wait) 
        }
    };

    debounced.cancel = function() {
        clearTimeout(time);
        time = null
    };
    return debounced
}
```

