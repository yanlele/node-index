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

1. done,fail,progress都是给回调列表添加回调，因为jQuery的Deferred内部使用了其$.Callbacks对象，并且增加了memory的标记（详情请查看我的这篇文章jQuery1.9.1源码分析--Callbacks对象），
所以如果我们第一次触发了相应的回调列表的回调即调用了resolve，resolveWith，reject，rejectWith或者notify，notifyWith这些相应的方法，当我们再次给该回调列表添加回调时，就会立刻触发该回调了，
即使用了done,fail,progress这些方法，而不需要我们手动触发。jQuery的ajax会在请求完成后就会触发相应的回调列表。所以我们后面的链式操作的注册回调有可能是已经触发了回调列表才添加的，所以它们就会立刻被执行。


2. always方法则是不管成功还是失败都会执行该回调。

接下来要介绍重量级的then方法（也是pipe方法）：


3. then方法会返回一个新的Deferred对象               
* 如果then方法的参数是deferred对象，                   
* 上一链的旧deferred会调用[ done | fail | progress ]方法注册回调，该回调内容是：执行then方法对应的参数回调（fnDone, fnFail, fnProgress）。              


* 1）如果参数回调执行后返回的结果是一个promise对象，我们就给该promise对象相应的回调列表添加回调，该回调是触发then方法返回的新promise对象的成功，失败，处理中（done，fail，progress）的回调列表中的所有回调。                
* 当我们再给then方法进行链式地添加回调操作（done,fail,progress,always,then）时，就是给新deferred对象注册回调到相应的回调列表。           
* 如果我们then参数fnDoneDefer, fnFailDefer, fnProgressDefer得到了解决，就会执行后面链式添加回调操作中的参数函数。            

 
* 2）如果参数回调执行后返回的结果returned不是promise对象，就立刻触发新deferred对象相应回调列表的所有回调,且回调函数的参数是先前的执行返回结果returned。               
* 当我们再给then方法进行链式地添加回调操作（done,fail,progress,always,then）时，就会立刻触发我们添加的相应的回调。             


* 可以多个then连续使用，此功能相当于顺序调用异步回调。

示例代码：           
```javascript
$.ajax({
   url: 't2.html',
   dataType: 'html',
   data: {
      d: 4
   }
}).then(function(){
    console.log('success');
},function(){
    console.log('failed');
}).then(function(){
    console.log('second');
    return $.ajax({
        url: 'jquery-1.9.1.js',
        dataType: 'script'
    });
}, function(){
    console.log('second f');
    return $.ajax({
        url: 'jquery-1.9.1.js',
        dataType: 'script'
    });
}).then(function(){
    console.log('success2');
},function(){
    console.log('failed2');
});
```
上面的代码，如果第一个对t2.html的请求成功输出success，就会执行second的ajax请求，接着针对该请求是成功还是失败，执行success2或者failed2。
如果第一个失败输出failed，然后执行second f的ajax请求（注意和上面的不一样），接着针对该请求是成功还是失败，执行success2或者failed2。
理解这些对失败处理很重要。
 



可以参考如下资料
[https://www.cnblogs.com/webFrontDev/p/3265568.html](https://www.cnblogs.com/webFrontDev/p/3265568.html)