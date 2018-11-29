# 实现函数防抖

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
