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
 
将我们上面序列化异步操作的代码使用then方法改造后，代码立马变得扁平化了，可读性也增强了：
```javascript
var req1 = $.get('api1/data');
var req2 = $.get('api2/data');
var req3 = $.get('api3/data');

req1.then(function(req1Data){
    return req2.done(otherFunc);
}).then(function(req2Data){
    return req3.done(otherFunc2);
}).then(function(req3Data){
    doneSomethingWithReq3();
});
```

4. 接着介绍$.when的方法使用，主要是对多个deferred对象进行并行化操作，当所有deferred对象都得到解决就执行后面添加的相应回调。              
```javascript
$.when(
    $.ajax({
        url: 't2.html'
    }),
    $.ajax({
        url: 'jquery-1.9.1-study.js'
    })
).then(function(FirstAjaxSuccessCallbackArgs, SecondAjaxSuccessCallbackArgs){
    console.log('success');
}, function(){
    console.log('failed');
});
```
如果有一个失败了都会执行失败的回调。
将我们上面并行化操作的代码改良后：
```javascript
$.when(
    $.get('api1/data'),
    $.get('api2/data'),
    $.get('api3/data'),
    { key: 'value' }
 ).done();
```

## 如何使用deferred封装异步函数           

- 第一种
```javascript
function getData(){
  var deferred = $.Deferred();
  var xhr = new XMLHttpRequest();
  xhr.open("GET","data",true);
  xhr.addEventListener('load',function(){
    if(xhr.status === 200){
      deferred.resolve(xhr.response);
    }else{
      deferred.reject("HTTP error: " + xhr.status);
    }
  },false);
  xhr.send();
  return deferred.promise();
}
```

- 第二种                   
```javascript
function prepareInterface() {   
   return $.Deferred(function( dfd ) {   
       var latest = $( '.news, .reactions' );  
       latest.slideDown( 500, dfd.resolve );  
       latest.addClass('active');  
    }).promise();   
}
```

## Deferred的一些使用技巧：             
1.异步缓存

以ajax请求为例，缓存机制需要确保我们的请求不管是否已经存在于缓存，只能被请求一次。 因此，为了缓存系统可以正确地处理请求,我们最终需要写出一些逻辑来跟踪绑定到给定url上的回调。
```javascript
var cachedScriptPromises = {};

$.cachedGetScript =  function(url, callback){
    if(!cachedScriptPromises[url]) {
        cachedScriptPromises[url] = $.Deferred(function(defer){
            $.getScript(url).then(defer.resolve, defer.reject);
        }).promise();
    }

    return cachedScriptPromises[url].done(callback);
};
```

我们为每一个url缓存一个promise对象。 如果给定的url没有promise，我们创建一个deferred，并发出请求。 
如果它已经存在我们只需要为它绑定回调。 该解决方案的一大优势是，它会透明地处理新的和缓存过的请求。 
另一个优点是一个基于deferred的缓存 会优雅地处理失败情况。 当promise以‘rejected’状态结束的话，我们可以提供一个错误回调来测试：
`$.cachedGetScript( url ).then( successCallback, errorCallback );`          
请记住：无论请求是否缓存过，上面的代码段都会正常运作！        

**通用异步缓存**              
为了使代码尽可能的通用，我们建立一个缓存工厂并抽象出实际需要执行的任务             
```javascript
$.createCache = function(requestFunc){
    var cache = {};

    return function(key, callback){
        if(!cache[key]) {
            cache[key] = $.Deferred(function(defer){
                requestFunc(defer, key);
            }).promise();
        }

        return cache[key].done(callback);
    };
};


// 现在具体的请求逻辑已经抽象出来，我们可以重新写cachedGetScript：
$.cachedGetScript = $.createCache(function(defer, url){
    $.getScript(url).then(defer.resolve, defer.reject);
});
```

我们可以使用这个通用的异步缓存很轻易的实现一些场景：

图片加载            
```javascript
// 确保我们不加载同一个图像两次
$.loadImage = $.createCache(function(defer, url){
    var image = new Image();
    function clearUp(){
        image.onload = image.onerror = null;
    }
    defer.then(clearUp, clearUp);
    image.onload = function(){
        defer.resolve(url);
    };
    image.onerror = defer.reject;
    image.src = url;
});

// 无论image.png是否已经被加载，或者正在加载过程中，缓存都会正常工作。
$.loadImage( "my-image.png" ).done( callback1 );  
$.loadImage( "my-image.png" ).done( callback1 );
```

缓存响应数据          
```javascript
$.searchTwitter = $.createCache(function(defer, query){
        $.ajax({
            url: 'http://search.twitter.com/search.json',
            data: {q: query}, 
            dataType: 'jsonp'
        }).then(defer.resolve, defer.reject);
    });

// 在Twitter上进行搜索，同时缓存它们
$.searchTwitter( "jQuery Deferred", callback1 );
```

定时:
基于deferred的缓存并不限定于网络请求;它也可以被用于定时目的。
```javascript
// 新的afterDOMReady辅助方法用最少的计数器提供了domReady后的适当时机。 如果延迟已经过期，回调会被马上执行。
$.afterDOMReady = (function(){
    var readyTime;
    
    $(function(){
        readyTime = (new Date()).getTime();
    });

    return $.createCache(function(defer, delay){
        delay = delay || 0;

        $(function(){
            var delta = (new Date()).getTime() - readyTime;

            if(delta >= delay) {
                defer.resolve();
            } else {
                setTimeout(defer.resolve, delay - delta);
            }
        });
    });
})();
```

2.同步多个动画            
```javascript
var fadeLi1Out = $('ul > li').eq(0).animate({
    opacity: 0
}, 1000);
var fadeLi2In = $('ul > li').eq(1).animate({
    opacity: 1
}, 2000);

 // 使用$.when()同步化不同的动画
$.when(fadeLi1Out, fadeLi2In).done(function(){
    alert('done');
});
```

虽然jQuery1.6以上的版本已经把deferred包装到动画里了，但如果我们想要手动实现，也是一件很轻松的事：                   
```javascript
$.fn.animatePromise = function( prop, speed, easing, callback ) {   
    var elements = this;   

    return $.Deferred(function( defer ) {   
        elements.animate( prop, speed, easing, function() {   
            defer.resolve();   
            if ( callback ) {   
                callback.apply( this, arguments );  
            }   
        });   
    }).promise();  
};

// 我们也可以使用同样的技巧，建立了一些辅助方法：
$.each([ "slideDown", "slideUp", "slideToggle", "fadeIn", "fadeOut", "fadeToggle" ],   
function( _, name ) {   
    $.fn[ name + "Promise" ] = function( speed, easing, callback ) {  
        var elements = this;   
        return $.Deferred(function( defer ) {   
            elements[ name ]( speed, easing, function() {   
                defer.resolve();   
                if ( callback ) {   
                callback.apply( this, arguments );   
                }   
            });  
         }).promise();   
    };   
});
```

3.一次性事件         
例如，您可能希望有一个按钮，当它第一次被点击时打开一个面板，面板打开之后，执行特定的初始化逻辑。 在处理这种情况时，通常会这样写代码：             
```javascript
var buttonClicked = false;   
$( "#myButton" ).click(function() {   
    if ( !buttonClicked ) {   
        buttonClicked = true;   
        initializeData();   
        showPanel();   
    }   
});
```

这是一个非常耦合的解决办法。 如果你想添加一些其他的操作，你必须编辑绑定代码或拷贝一份。 如果你不这样做，你唯一的选择是测试buttonClicked。
由于buttonClicked可能是false，新的代码可能永远不会被执行，因此你 可能会失去这个新的动作。

使用deferreds我们可以做的更好 （为简化起见，下面的代码将只适用于一个单一的元素和一个单一的事件类型，但它可以很容易地扩展为多个事件类型的集合）：

```javascript
$.fn.bindOnce = function(event, callback){
    var element = this;
    defer = element.data('bind_once_defer_' + event);

    if(!defer) {
        defer = $.Deferred();

        function deferCallback(){
            element.off(event, deferCallback);
            defer.resolveWith(this, arguments);
        }

        element.on(event, deferCallback);
        element.data('bind_once_defer_' + event, defer);
    }

    return defer.done(callback).promise();
};

$.fn.firstClick = function( callback ) {   
       return this.bindOnce( "click", callback );  
 };  

var openPanel = $( "#myButton" ).firstClick();   
openPanel.done( initializeData );   
openPanel.done( showPanel );
```

该代码的工作原理如下：

· 检查该元素是否已经绑定了一个给定事件的deferred对象

· 如果没有，创建它，使它在触发该事件的第一时间解决

· 然后在deferred上绑定给定的回调并返回promise






可以参考如下资料
[https://www.cnblogs.com/webFrontDev/p/3265568.html](https://www.cnblogs.com/webFrontDev/p/3265568.html)