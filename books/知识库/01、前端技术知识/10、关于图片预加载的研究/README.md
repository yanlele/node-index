# 关于图片预加载的研究                

## 1. 使用jQuery图片预加载(延迟加载)插件Lazy Load                

Lazy Load也叫惰性加载，延迟加载，顾名思义，就是在图片未到达可视区域时，不加载图片，我们常常在很多的优秀网站上看到类似的例子，
例如迅雷、土豆、优酷等，由于一个网页的图片非常多，一次性加载增加服务器压力，而且用户未必会拉到底部，浪费用户流量，Lazy Load采用按需加载，
更快的加载速度从而达到优化网页的目的。

使用方法:               
- **加载jQuery, 并在html代码的底部包含进来**                       
```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.lazyload.js" type="text/javascript"></script>
```

- **设置图片的占位符为data-original, 给图片一个特别的标签, 像这样设置图片**                 
```html
<img class="lazy" data-original="img/example.jpg" width="640" height="480">

<script>
$(function(){
    $("img.lazy").lazyload();
});
</script>
```
注意：你必须给图片设置一个height和width，或者在CSS中定义，否则可能会影响到图片的显示。                  


- **插件选项**                
图片预先加载距离：threshold，通过设置这个值，在图片未出现在可视区域的顶部距离这个值时加载。默认为0，
下面为设置threshold为200表示在图片距离可视区域还有200像素时加载。
```js
$("img.lazy").lazyload({
    threshold :200
});
```

事件绑定加载的方式：event，你可以使用jQuery的事件，例如“click”、“mouseover”，或者你也可以自定义事件，默认等待用户滚动，图片出现在可视区域。下面是使用click：
```javascript
$("img.lazy").lazyload({event:"click"});
```

显示效果：effect，默认使用show()，你可以使用fadeIn（逐渐出现）方式，代码如下：                
```html
$("img.lazy").lazyload({
    effect :"fadeIn"
});
```

对于禁用javascript的浏览器则要加上noscript内容：               
```html
<img class="lazy" data-original="img/example.jpg" width="640" heigh="480">
<noscript><img src="img/example.jpg" alt="jQuery图片预加载(延迟加载)插件Lazy Load" width="640" heigh="480"></noscript>
```

图片限定在某个容器内：container，你可以通过限定某个容器内容的图片才会生效，代码如下：             
```style
#container {
    height:600px;
    overflow: scroll;
}　
```
```javascript
$("img.lazy").lazyload({
     container: $("#container")
});　
```

## 2. JS实现图片预加载             
在浏览器渲染图片的时候, 它获得图片的一片区域的时候, 就已经为这张图片预留了一片空白的区域来填充图片, 这就是预加载获得图片尺寸最原始的使用方法.

有时候会加载一些在当前页面没有用到的图片，是为了提前加载到缓存里，这样后面的页面就可以直接从缓存读取了。

加载大图的时候，我们可以先显示模糊的缩略图，等到大图加载完了，再把缩略图替换掉，这样填补了图片加载期间的空白时间。

image也有onload和onerror事件，分别是加载完后和加载失败时执行。

Image对象是专门用于处理图片加载的，就相当于内存中的img标签。

图片预加载案例：鼠标移入一张图片时，换成另一张图片，移出时换回原来的图片。正常做法是，鼠标移入的时候，改变图片的src，
但这时就要去加载图片了，会等待一段时间，这样体验不好。预加载的做法是，在页面加载完，鼠标移入之前就通过Image对象把图片加载进缓存了，
这样鼠标移入的时候直接从缓存里读取了，速度很快。

- **图片预加载:**                
```javascript
if(document.images){
    var img = new Image();
    img.src = "img/example.jpg";
}
```


- **封装成一个预加载图片的函数**             
```javascript
//实现图片的预加载
function preloadImg(srcArr){
    if(srcArr instanceof Array){
        for(var i=0; i<srcArr.length; i++){
            var oImg = new Image();
            oImg.src = srcArr[i];
        }
    }
}
 
//预加载图片
preloadImg(['image/example.jpg']);  //参数是一个url数组　　
```

- **使用一个回调函数来获得图片的属性**          
```javascript
function getPreloadImgAttr(url,callback){
    var oImg = new Image(); //创建一个Image对象,实现图片的预加载
    oImg.src = url;　　    // 看下一节,其实应当先进行onload的绑定,再赋值给src
    if(oImg.complete){
        //如果图片已经存在于浏览器缓存,直接调用回调函数
        callback.call(oImg);
        return; //直接返回,不再处理onload事件
    }
    oImg.onload = function(){
        //图片下载完毕时异步调用callback函数
        callback.call(oImg);   
    };
}
getPreloadImgAttr('image/example.jpg',function(){
    console.log(this.width, this.height);
});　　
```

- **关于预加载图片的改进**                
网上看到一篇博客关于图片的预加载,你所不知道的, 其中指出以上通用的方法存在一些问题:

创建了一个临时匿名函数来作为图片的onload事件处理函数，形成了闭包。

相信大家都看到过ie下的内存泄漏模式的文章，其中有一个模式就是循环引用，而闭包就有保存外部运行环境的能力（依赖于作用域链的实现），
所以img.onload这个函数内部又保存了对img的引用，这样就形成了循环引用，导致内存泄漏。（这种模式的内存泄漏只存在低版本的ie6中，
打过补丁的ie6以及高版本的ie都解决了循环引用导致的内存泄漏问题）。

只考虑了静态图片的加载，忽略了gif等动态图片，这些动态图片可能会多次触发onload。


改进方法:
```javascript
function loadImage(url, callback) {    
    var img = new Image(); //创建一个Image对象，实现图片的预下载    
    img.onload = function(){
        img.onload = null;
        callback(img);
    }
    img.src = url;
}
```
这样内存泄漏，动态图片的加载问题都得到了解决，而且也以统一的方式，实现了callback的调用。                

关于这个方法, 有个疑问是缓存的问题, 在原文里也给出了一些解释            
经过对多个浏览器版本的测试，发现ie、opera下，当图片加载过一次以后，如果再有对该图片的请求时，由于浏览器已经缓存住这张图
片了，不会再发起一次新的请求，而是直接从缓存中加载过来。对于 firefox和safari，它们试图使这两种加载方式对用户透明，同样
会引起图片的onload事件，而ie和opera则忽略了这种同一性，不会引起图片的onload事件，因此上边的代码在它们里边不能得以实
现效果。

## 3. 用CSS实现图片的预加载              
这个概念就是写一个CSS样式设置一批背景图片，然后将其隐藏，这样你就看不到那些图片了。那些背景图片就是你想预载的图片。             
方式1：            
```less
#preload-01 { background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px; } 
#preload-02 { background: url(http://domain.tld/image-02.png) no-repeat -9999px -9999px; } 
#preload-03 { background: url(http://domain.tld/image-03.png) no-repeat -9999px -9999px; }
```
这里为了隐藏这些图片, 使用了位置设置为极大的负值的方法. 还可以直接设置 { width: 0; height: 0; display: none};                

方式2：            
```less
/*处理图片预加载*/
body:after {
    content: "";
    display: none;
    position: absolute;
    background: url("../img/role1-scene1.png") no-repeat -10000px -1000px,
    url("../img/role1-scene2.png") no-repeat -10000px -1000px,
    url("../img/role1-scene3.png") no-repeat -10000px -1000px,
    url("../img/role1-scene4.png") no-repeat -10000px -1000px,
    url("../img/role1-scene5.png") no-repeat -10000px -1000px,
    url("../img/role1-scene6.png") no-repeat -10000px -1000px,
    url("../img/role1-scene7.png") no-repeat -10000px -1000px,
    url("../img/role1-scene8.png") no-repeat -10000px -1000px;
    width: 0;
    height: 0
}
```

该方法虽然高效，但仍有改进余地。使用该法加载的图片会同页面的其他内容一起加载，增加了页面的整体加载时间。
为了解决这个问题，我们增加了一些JavaScript代码，来推迟预加载的时间，直到页面加载完毕。代码如下：
```javascript
function preloader() {  
    if (document.getElementById) {  
        document.getElementById("preload-01").style.background = "url(http://domain.tld/image-01.png) no-repeat -9999px -9999px";  
        document.getElementById("preload-02").style.background = "url(http://domain.tld/image-02.png) no-repeat -9999px -9999px";  
        document.getElementById("preload-03").style.background = "url(http://domain.tld/image-03.png) no-repeat -9999px -9999px";  
    }  
}  
function addLoadEvent(func) {  
    let oldonload = window.onload;  
    if (typeof window.onload !== 'function') {  
        window.onload = func;  
    } else {  
        window.onload = function() {  
            if (oldonload) {  
                oldonload();  
            }  
            func();  
        }  
    }  
}  
addLoadEvent(preloader);
```
在该脚本的第一部分，我们获取使用类选择器的元素，并为其设置了background属性，以预加载不同的图片。

该脚本的第二部分，我们使用addLoadEvent()函数来延迟preloader()函数的加载时间，直到页面加载完毕。

如果JavaScript无法在用户的浏览器中正常运行，会发生什么？很简单，图片不会被预加载，当页面调用图片时，正常显示即可。


## 4. 使用Ajax实现预加载               
该方法利用DOM，不仅仅预加载图片，还会预加载CSS、JavaScript等相关的东西。使用Ajax，比直接使用JavaScript，优越之处在于JavaScript和CSS的加载不会影响到当前页面。该方法简洁、高效。
```javascript
window.onload = function() {  
    setTimeout(function() {  
        // XHR to request a JS and a CSS  
        var xhr = new XMLHttpRequest();  
        xhr.open('GET', 'http://domain.tld/preload.js');  
        xhr.send('');  
        xhr = new XMLHttpRequest();  
        xhr.open('GET', 'http://domain.tld/preload.css');  
        xhr.send('');  
        // preload image  
        new Image().src = "http://domain.tld/preload.png";  
    }, 1000);  
};　　
```
与之相比, 如果用js的话, 要实现以上加载过程则会应用到页面上. 实现如下              
```javascript
window.onload = function() {
    setTimeout(function() {
        // reference to <head>  
        var head = document.getElementsByTagName('head')[0];  
  
        // a new CSS  
        var css = document.createElement('link');  
        css.type = "text/css";  
        css.rel  = "stylesheet";  
        css.href = "http://domain.tld/preload.css";  
  
        // a new JS  
        var js  = document.createElement("script");  
        js.type = "text/javascript";  
        js.src  = "http://domain.tld/preload.js";  
  
        // preload JS and CSS  
        head.appendChild(css);  
        head.appendChild(js);  
  
        // preload image  
        new Image().src = "http://domain.tld/preload.png";
    }, 1000);
};
```





