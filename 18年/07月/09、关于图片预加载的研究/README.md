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


