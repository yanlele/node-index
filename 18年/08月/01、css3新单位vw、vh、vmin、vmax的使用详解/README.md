# css3新单位vw、vh、vmin、vmax的使用详解               

## 简介部分
### 1、vw、vh、vmin、vmax 的含义            
（1）vw、vh、vmin、vmax 是一种视窗单位，也是相对单位。它相对的不是父节点或者页面的根节点。而是由视窗（Viewport）大小来决定的，单位 1，
代表类似于 1%。视窗(Viewport)是你的浏览器实际显示内容的区域—，换句话说是你的不包括工具栏和按钮的网页浏览器。

2）具体描述如下：           
vw：视窗宽度的百分比（1vw 代表视窗的宽度为 1%）            
vh：视窗高度的百分比         
vmin：当前 vw 和 vh 中较小的一个值         
vmax：当前 vw 和 vh 中较大的一个值         

### 2、vw、vh 与 % 百分比的区别           
（1）% 是相对于父元素的大小设定的比率，vw、vh 是视窗大小决定的。                
（2）vw、vh 优势在于能够直接获取高度，而用 % 在没有设置 body 高度的情况下，是无法正确获得可视区域的高度的，所以这是挺不错的优势。                


### 3，vmin、vmax 用处                   
做移动页面开发时，如果使用 vw、wh 设置字体大小（比如 5vw），在竖屏和横屏状态下显示的字体大小是不一样的。               
由于 vmin 和 vmax 是当前较小的 vw 和 vh 和当前较大的 vw 和 vh。这里就可以用到 vmin 和 vmax。使得文字大小在横竖屏下保持一致。


### 4、浏览器兼容性             
- （1）桌面 PC              
    Chrome：自 26 版起就完美支持（2013年2月）                
    Firefox：自 19 版起就完美支持（2013年1月）               
    Safari：自 6.1 版起就完美支持（2013年10月）              
    Opera：自 15 版起就完美支持（2013年7月）         
    IE：自 IE10 起（包括 Edge）到现在还只是部分支持（不支持 vmax，同时 vm 代替 vmin）              

- （2）移动设备                   
  Android：自 4.4 版起就完美支持（2013年12月）           
  iOS：自 iOS8 版起就完美支持（2014年9月）               

## 代码示例             
### 1、一个简单的样例           
视窗（Viewport）单位除了可以用来设置元素的宽高尺寸，也可以在文本中使用。下面使用 vw 设置字体大小来实现响应式文字。                 
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>demo1</title>
    <style>
        html, body, div, span, h1, h2, h3 {
            margin: 0;
            padding: 0;
            border: 0;
        }

        .demo {
            width: 100vw;
            font-size: 5vw;
            margin: 0 auto;
            background-color: #50688B;
            color: #FFF;
        }

        .demo2 {
            width: 80vw;
            font-size: 5vw;
            margin: 0 auto;
            background-color: #ff6a00;
        }

        .demo3 {
            width: 50vw;
            height: 50vh;
            font-size: 1vw;
            margin: 0 auto;
            background-color: #ff006e;
            color: #FFF;
        }
    </style>
</head>
<body>
<div class="demo">
    <h1>宽度100％, 字体5％</h1>
</div>
<div class="demo2">
    <h2>宽度80％, 字体5％</h2>
</div>
<div class="demo3">
    <h3>宽度50％, 高度50％, 字体1％</h3>
</div>
</body>
</html>
```
[示例文件: 01、一个简单的示例](./01、一个简单的示例.html)


