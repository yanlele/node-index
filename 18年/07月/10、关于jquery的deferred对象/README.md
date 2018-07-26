# jQuery中的Deferred-详解和使用            

## 首先为什么要是用Deferred ?           

先来看一段AJAX的代码：               
```javascript
var data;
$.get('api/data', function(resp) {
   data = resp.data;     
});
doSomethingFancyWithData(data);
```

这段代码极容易出问题，请求时间多长或者超时，将会导致我们获取不到data。只有把请求设置为同步我们才能够等待获取到data，才执行我们的函数。
但是这会带来阻塞，导致用户界面一直被冻结，对用户体验有很严重的影响。所以我们需要使用异步编程，JS的异步编程有两种方式基于事件和基于回调。                   


传统的异步编程会带来的一些问题:
1.序列化异步操作导致的问题：

    1），延续传递风格Continuation Passing Style (CPS)
    2），深度嵌套
    3），回调地狱

2.并行异步操作的困难
下面是一段序列化异步操作的代码：                    
```javascript
$.get('api1/data', function(resp1) {
    $.get('api2/data', function(resp2) {
        $.get('api3/data', function(resp3) {
            $.get(); 
        });
    });
});
```
当回调越来越多，嵌套越深，代码可读性就会越来越差。如果注册了多个回调，那更是一场噩梦！

再看另一段有关并行化异步操作的代码：
```javascript
$.get('api1/data', function(resp1) { trackMe(); });
$.get('api2/data', function(resp2) { trackMe(); });
$.get('api3/data', function(resp3) { trackMe(); });
var trackedCount = 0;
function trackMe() {
    ++trackedCount;
    if (trackedCount === 3) {
        doSomethingThatNeededAllThree();
    }
}
```
上面的代码意思是当三个请求都成功就执行我们的函数（只执行一次），毫无疑问，这段代码有点繁琐，而且如果我们要添加失败回调将会是一件很麻烦的事情。             

我们需要一个更好的规范，那就是Promise规范，这里引用Aaron的一篇文章中的一段，[http://www.cnblogs.com/aaronjs/p/3163786.html](http://www.cnblogs.com/aaronjs/p/3163786.html);

现在有不少库已经实现了Deferred的操作，其中jQuery的Deferred就非常热门：                  

## jQuery的有关Deferred的API简介          
先看一个简单的例子
```javascript
$.ajax('data/url')
    .done(function(response, statusText, jqXHR){
        console.log(statusText);
    })
    .fail(function(jqXHR, statusText, error){
        console.log(statusText);
    })
    .always(function(){
        console.log('I will always done.');
    });
```



可以参考如下资料
[https://www.cnblogs.com/webFrontDev/p/3265568.html](https://www.cnblogs.com/webFrontDev/p/3265568.html)