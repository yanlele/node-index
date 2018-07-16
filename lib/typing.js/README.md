# 史上最华丽的打字效果JS插件

### 当前版本**1.4**

[Demo](http://coffeedeveloper.github.io/typing.js/demo.html)
[Demo2](http://coffeedeveloper.github.io/typing.js/demo2.html)

引入相关文件

```html
  <!--引入鼠标闪烁效果CSS(可选)-->
  <link rel="stylesheet" href="typing.css">
  <!--引入typing.js，核心文件-->
  <script src="typing.js"></script>
```

在页面底部或者`Ready`事件中执行相关代码

<a name="instance" />

```html
<script>
  var typing = new Typing({
    source: document.getElementById('source'),
    output: document.getElementById('output'),
    delay: 80,
    done: function() {} //完成打印后的回调事件
  });
  typing.start();
</script>
```

鼠标闪烁效果，暂时只支持内容都是行内元素的内容

`typing-cursor`和`typing-cursor-black`都是闪烁的黑色光标，而`typing-cursor-white`则是闪烁的白色光标。
**请注意要在`span`里面放置内容`|`**

```html
<div id="source">
  这里的呈现效果是有鼠标跟随的！<br />
  还不错吧？
</div>
<div id="output-wrap">
  <span id="output"></span>
  <span class="typing-cursor">|</span>
</div>
```

### todo

- 回退删除效果
- 块状元素的鼠标闪烁输入效果
- 放入`bower`包管理，方便引用

### 接口说明

[实例化typing](#instance)后即可使用下面接口

- [`start`](#start)

- [`pause`](#pause)

- [`resume`]('#resume')

<a name="start" />
start:开始打印文字

```js
typing.start();
```

<a name="pause" />
pause:暂停打印

```js
typing.pause();
```


<a name="resume" />
resume:恢复打印

```js
typing.resume();
```


```html
<div>
  <span data-type="back">通过设置元素的data-type="back"来达到回退删除的效果</span>
  <span>上面的文本被删除完毕后才会出现的文本</span>
  <h1 data-delay="200">重点文本，可以设置高的延迟时间。通过设置data-delay="200"来设置打印效果的毫秒数</h1>
</div>
```
### 更新记录

- 1.4
  - 增加`UMD`模块加载
- 1.3
  - 增加打印完成后的回调函数
- 1.2
  - 移除对`es5-shim`的依赖
- 1.1
  - 修复IE8会报错的bug(`Array.prototype.slice`改为用`for`)
