# 实现函数节流

[https://blog.csdn.net/beijiyang999/article/details/79836463](https://blog.csdn.net/beijiyang999/article/details/79836463)

## 函数节流是什么
**对于持续触发的事件，规定一个间隔时间（n秒），每隔一段只能执行一次。**                      
函数防抖（debounce）与本篇说的函数节流（throttle）相似又不同。                     
函数防抖一般是指对于**在事件被触发n秒后再执行的回调，如果在这n秒内又重新被触发，则重新开始计时。**                        
二者都能防止函数过于频繁的调用。                        
区别在于，当事件持续被触发，如果触发时间间隔短于规定的等待时间（n秒），那么                      
- 函数防抖的情况下，函数将一直推迟执行，造成不会被执行的效果；
- 函数节流的情况下，函数将每个 n 秒执行一次。


## 函数节流的实现
函数节流的实现有不同的思路，可以通过**时间戳实现**，也可以通过**定时器实现**。

### 时间戳
#### 思路
只要触发，就用 Date 获取现在的时间，与上一次的时间比较。                     
如果时间差大于了规定的等待时间，就可以执行一次；                        
目标函数执行以后，就更新 previous 值，确保它是“上一次”的时间。                       
否则就等下一次触发时继续比较。                     

#### 代码如下
```javascript
function throttle(func, wait) {
    let previous = 0;
    return function() {
        let now = +new Date();
        let context = this;
        if (now - previous >= wait) {
            func.apply(context, arguments);
            previous = now; // 执行后更新 previous 值
        }
    }
}
container.onmousemove = throttle(doSomething, 1000);
```

### 定时器
#### 思路
用定时器实现时间间隔。                             
当定时器不存在，说明可以执行函数，于是定义一个定时器来向任务队列注册目标函数                              
目标函数执行后设置保存定时器ID变量为空                                
当定时器已经被定义，说明已经在等待过程中。则等待下次触发事件时再进行查看。                               

#### 代码
```javascript
function throttle(func, wait) {
    let time, context;
    return function(){
        context = this;
        if(!time){
            time = setTimeout(function(){
                func.apply(context, arguments);
                time = null
            }, wait)
        }
    }
}
```


### 效果差异
一个周期内：                      
时间戳实现的：先执行目标函数，后等待规定的时间段；                       
计时器实现的：先等待够规定时间，再执行。 即停止触发后，若定时器已经在任务队列里注册了目标函数，它也会执行最后一次。                      

### 优化：二者结合
结合二者，实现一次触发，两次执行（先立即执行，结尾也有执行）                  
```javascript
function throttle (func, wait) {
    let previous = 0;
    let context, args, time;
    return function(){
        let now = +new Date();
        context = this;
        args = arguments;
        if(now - previous >= wait){ //当距上一次执行的间隔大于规定，可以直接执行
            func.apply(context, args);
            previous = now
        } else { // 否则继续等待，结尾执行一次
            if(time) clearTimeout(time);
            time = setTimeout(
                () => {
                        func.apply(context, args);
                        time = null
                      }
            , wait)
        }
    }
}
```

#### 问题
已经实现了一次触发，两次执行，有头有尾的效果。             
问题是，上一个周期的“尾”和下一个周期的“头”之间，失去了对时间间隔的控制。              

#### 修复
仔细查看，发现问题出在了 previous 的设置上。                                 
仅仅在“可直接执行”的情况下更新了 previous 值，在通过计时器注册入任务队列后执行的情况下，忽略了 previous 的更新。
导致了 previous 的值不再是“上一次执行”时的时间，而是“上一次直接可执行情况下执行”的时间。                                  
同时，引入变量 remaining 表示还需要等待的时间，来让尾部那一次的执行也符合时间间隔。

#### 完善后代码：
```javascript
function throttle(func, wait) {
    let previous = 0;
    let context, args, time, remaining;

    return function() {
        let now = +new Date();
        context = this;
        args = arguments;
        remaining = wait - (now - previous);    // 剩余的还需要等待的时间
        if (remaining <= 0) {
            func.apply(context, args);
            previous = now // 重置“上一次执行”的时间
        } else {
            if (time) {
                clearTimeout(time);
            }
            time = setTimeout(() => {
                func.apply(context, args);
                time = null;
                previous = +new Date() // 重置“上一次执行”的时间
            }, remaining) //等待还需等待的时间
        }
    };
}
```
[请看demo1](books/专题知识库/05、基础知识点专题/other/07、实现函数节流/demo1.js)


#### 更进一步的优化
参考 underscore 与 mqyqingfeng ，实现是否启用第一次 / 尾部最后一次计时回调的执行。             
设置 options 作为第三个参数，然后根据传的值判断到底哪种效果，约定:              
- leading：false 表示禁用第一次执行
- trailing: false 表示禁用停止触发的回调
```javascript
function throttle(func, wait, options) {
    let time, context, args, result;
    let previous = 0;
    if (!options) options = {};

    let later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        time = null;
        func.apply(context, args);
        if (!time) context = args = null;
    };

    let throttled = function () {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (time) {
                clearTimeout(time);
                time = null;
            }
            previous = now;
            func.apply(context, args);
            if (!time) context = args = null;
        } else if (!time && options.trailing !== false) {
            time = setTimeout(later, remaining);
        }
    };
    return throttled;
}
```
[请看demo2](books/专题知识库/05、基础知识点专题/other/07、实现函数节流/demo2.js)

如果想添加一个取消功能：
```javascript
throttled.cancel = function() {
    clearTimeout(time);
    time = null;
    previous = 0;
}
```
