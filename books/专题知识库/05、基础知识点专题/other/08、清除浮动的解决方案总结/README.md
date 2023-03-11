## 清除浮动的解决方案 （以下提供了八种解决方式）

### 1、利用div定义height
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red; /*解决代码*/
        height: 200px;
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        margin-top: 10px
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
</div>
<div class="div2">
    div2
</div>
```
原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。 

优点：简单、代码少、容易掌握 

缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题 

**建议：不推荐使用，只建议高度固定的布局时使用**

### 2、结尾处加空div标签 clear:both
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        margin-top: 10px
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }

    /*清除浮动代码*/
    .clearfloat {
        clear: both
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
    <div class="clearfloat"></div>
</div>
<div class="div2">
    div2
</div>
```
原理：添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度 

优点：简单、代码少、浏览器支持好、不容易出现怪问题 

缺点：不少初学者不理解原理；如果页面浮动布局多，就要增加很多空div，让人感觉很不好 

**建议：不推荐使用，但此方法是以前主要使用的一种清除浮动方法**

### 3、父级div定义 伪类:after 和 zoom 
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red;
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        margin-top: 10px
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }

    /*清除浮动代码*/
    .clearfloat:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }

    .clearfloat {
        zoom: 1
    }
</style>
<div class="div1 clearfloat">
    <div class="left">Left</div>
    <div class="right">Right</div>
</div>
<div class="div2">
    div2
</div>
```
原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题 

优点：浏览器支持好、不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等） 

缺点：代码多、不少初学者不理解原理，要两句代码结合使用才能让主流浏览器都支持。 

**建议：推荐使用，建议定义公共类，以减少CSS代码。**

### 4、父级div定义 overflow:hidden 
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red; /*解决代码*/
        width: 98%;
        overflow: hidden
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        margin-top: 10px;
        width: 98%
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
</div>
<div class="div2">
    div2
</div>
```
原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度 

优点：简单、代码少、浏览器支持好 

缺点：不能和position配合使用，因为超出的尺寸的会被隐藏。 

**建议：只推荐没有使用position或对overflow:hidden理解比较深的朋友使用。**

### 5、父级div定义 overflow:auto 
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red; /*解决代码*/
        width: 98%;
        overflow: auto
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        margin-top: 10px;
        width: 98%
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
</div>
<div class="div2">
    div2
</div>
```
原理：必须定义width或zoom:1，同时不能定义height，使用overflow:auto时，浏览器会自动检查浮动区域的高度 

优点：简单、代码少、浏览器支持好 

缺点：内部宽高超过父级div时，会出现滚动条。 

**建议：不推荐使用，如果你需要出现滚动条或者确保你的代码不会出现滚动条就使用吧。** 

### 6、父级div 也一起浮动 
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red; /*解决代码*/
        width: 98%;
        margin-bottom: 10px;
        float: left
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        width: 98%; /*解决代码*/
        clear: both
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
</div>
<div class="div2">
    div2
</div>
```
原理：所有代码一起浮动，就变成了一个整体 

优点：没有优点 

缺点：会产生新的浮动问题。 

**建议：不推荐使用，只作了解。** 

### 7、父级div定义 display:table 
```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red; /*解决代码*/
        width: 98%;
        display: table;
        margin-bottom: 10px;
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px;
        width: 98%;
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
</div>
<div class="div2">
    div2
</div>
```
原理：将div属性变成表格 

优点：没有优点 

缺点：会产生新的未知问题。 

**建议：不推荐使用，只作了解。**

### 8、结尾处加 br标签 clear:both

```html
<style type="text/css">
    .div1 {
        background: #000080;
        border: 1px solid red;
        margin-bottom: 10px;
        zoom: 1
    }

    .div2 {
        background: #800080;
        border: 1px solid red;
        height: 100px
    }

    .left {
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD
    }

    .right {
        float: right;
        width: 30%;
        height: 80px;
        background: #DDD
    }

    .clearfloat {
        clear: both
    }
</style>
<div class="div1">
    <div class="left">Left</div>
    <div class="right">Right</div>
    <br class="clearfloat"/>
</div>
<div class="div2">
    div2
</div>
```
原理：父级div定义zoom:1来解决IE浮动问题，结尾处加 br标签 clear:both 

**建议：不推荐使用，只作了解。**
