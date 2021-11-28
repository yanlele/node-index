#  @media 媒体查询

## 最简单的入门示例             
如果文档宽度小于 300 像素则修改背景颜色(background-color):                          
```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style>
body {
    background-color:lightgreen;
}

@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
</style>
</head>
<body>
<p>重置浏览器查看大小。当浏览器窗口的宽度小于 300 像素时，背景颜色会变成淡蓝，否则是淡绿色。<input type="button" onclick="resize_window()" value="查看效果"></p>
<SCRIPT>
<!--
function resize_window() {
        window.open ('http://www.w3cschool.cc/try/demo_source/trycss3_media_example1.htm','newwindow','height=299,width=299,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
}
//写成一行
-->
</SCRIPT>

</body>
</html>
```       
[示例: 05-01](demo/05-01.html)

## CSS 语法           
```
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```
你也可以针对不同的媒体使用不同 stylesheets :               
`<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">`                


## 实际使用             
1. 最大宽度max-width                               
“max-width”是媒体特性中最常用的一个特性，其意思是指媒体类型小于或等于指定的宽度时，样式生效。如：              
```css
@media screen and (max-width:480px){
 .ads {
   display:none;
  }
}
```
上面表示的是：当屏幕小于或等于480px时,页面中的广告区块（.ads）都将被隐藏。



2.最小宽度min-width                 
“min-width”与“max-width”相反，指的是媒体类型大于或等于指定宽度时，样式生效。               
```css
@media screen and (min-width:900px){
.wrapper{width: 980px;}
}
```
上面表示的是：当屏幕大于或等于900px时，容器“.wrapper”的宽度为980px。                


3.多个媒体特性使用                  
Media Queries可以使用关键词"and"将多个媒体特性结合在一起。也就是说，一个Media Query中可以包含0到多个表达式，表达式又可以包含0到多个关键字，以及一种媒体类型。                  
当屏幕在600px~900px之间时，body的背景色渲染为“#f5f5f5”，如下所示。                   
```css
@media screen and (min-width:600px) and (max-width:900px){
  body {background-color:#f5f5f5;}
}
```


4.设备屏幕的输出宽度Device Width                 
在智能设备上，例如iPhone、iPad等，还可以根据屏幕设备的尺寸来设置相应的样式（或者调用相应的样式文件）。
同样的，对于屏幕设备同样可以使用“min/max”对应参数，如“min-device-width”或者“max-device-width”。              
`<link rel="stylesheet" media="screen and (max-device-width:480px)" href="iphone.css" />`                   
上面的代码指的是“iphone.css”样式适用于最大设备宽度为480px，比如说iPhone上的显示，这里的“max-device-width”所指的是设备的实际分辨率，也就是指可视面积分辨率。


5. not关键词               
使用关键词“not”是用来排除某种制定的媒体类型，也就是用来排除符合表达式的设备。换句话说，not关键词表示对后面的表达式执行取反操作，如：                  
`@media not print and (max-width: 1200px){样式代码}`                
上面代码表示的是：样式代码将被使用在除打印设备和设备宽度小于1200px下所有设备中。                 


6.only关键词                   







