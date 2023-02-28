DOM事件级别、DOM事件模型、DOM事件流、DOM事件捕获的具体流程、Event对象的常见应用、自动以事件

<!-- toc -->

- [dom 级别](#dom-%E7%BA%A7%E5%88%AB)
  * [1、DOM0级](#1dom0%E7%BA%A7)
  * [2、DOM1级](#2dom1%E7%BA%A7)
  * [3、DOM2级](#3dom2%E7%BA%A7)
  * [4、DOM3级](#4dom3%E7%BA%A7)
- [DOM事件](#dom%E4%BA%8B%E4%BB%B6)
  * [1、DOM0级事件](#1dom0%E7%BA%A7%E4%BA%8B%E4%BB%B6)
  * [DOM2级事件](#dom2%E7%BA%A7%E4%BA%8B%E4%BB%B6)
  * [DOM3级事件](#dom3%E7%BA%A7%E4%BA%8B%E4%BB%B6)
- [事件模型](#%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9E%8B)
- [事件流](#%E4%BA%8B%E4%BB%B6%E6%B5%81)

<!-- tocstop -->

# dom 级别
DOM级别一共可以分为四个级别：DOM0级、DOM1级、DOM2级和DOM3级。
DOM级别其实就是标准的迭代，对于版本的称呼，类似ES5、ES6。

## 1、DOM0级
DOM没有被W3C定为标准之前。

## 2、DOM1级
1998年10月成为W3C的标准后，称为DOM1级。DOM1级由两个模块组成：DOM核心（DOM Core）和DOM HTML。其中，DOM核心规定的是如何映射基于XML的文档结构，以便简化对文档中任意部分的访问和操作。DOM HTML模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法。

## 3、DOM2级
在DOM1级的基础上进行了扩展。为节点添加了更多方法和属性等。
添加新的模块，包括：视图、事件、范围、遍历、样式等。

## 4、DOM3级
DOM3级进一步扩展了DOM，增加了XPath模块、加载和保存（DOM Load and Save）模块等，开始支持XML1.0规范。




# DOM事件
## 1、DOM0级事件
DOM0级处理事件就是将一个函数赋值给一个事件处理属性。
```js
<button id="btn" type="button"></button> 
 
var btn = document.getElementById('btn')
btn.onclick = function() { 
    console.log('Hello World')
}
// 将一个函数赋值给了一个事件处理属性onclick 这样的方法就是DOM0级。
// 可以通过给事件处理属性赋值null来解绑事件。
```

## DOM2级事件
DOM2级处理事件是在DOM0级处理事件的基础上再添加了一些处理程序。

- 可以同时绑定多个事件处理函数。
- 定义了 addEventListener 和 removeEventListener 两个方法。
```js
element.addEventListener(eventName, fn, useCapture)
// 第三个参数 useCapture：指定事件是否在捕获或冒泡阶段执行。布尔值，可选，默认false
// 可能值：true - 事件句柄在捕获阶段执行；false- 默认。事件句柄在冒泡阶段执行

<button id="btn" type="button"></button> 
 
var btn = document.getElementById('btn')
function showFn() { 
    alert('Hello World')
}
function LogFn() { 
    alert('Hello World')
}
// 同时绑定多个事件处理函数
btn.addEventListener('click', showFn);
btn.addEventListener('click', LogFn);

// 解绑事件 
btn.removeEventListener('click', showFn); 
```

## DOM3级事件
DOM3级处理事件是在DOM2级处理事件的基础上再添加了很多事件类型。

- UI事件，当用户与页面上的元素交互时触发，如：`load`、`scroll`
- 焦点事件，当元素获得或失去焦点时触发，如：`blur`、`focus`
- 鼠标事件，当用户通过鼠标在页面执行操作时触发如：`dbclick`、`mouseup`
- 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：`mousewheel`
- 文本事件，当在文档中输入文本时触发，如：`textInput`
- 键盘事件，当用户通过键盘在页面上执行操作时触发，如：`keydown`、`keypress`
- 合成事件，当为IME（输入法编辑器）输入字符时触发，如：`compositionstart`
- 变动事件，当底层DOM结构发生变化时触发，如：`DOMsubtreeModified`

同时DOM3级事件也允许使用者自定义一些事件。


# 事件模型
捕获（从上到下）、冒泡（从下到上）；


# 事件流
用户和浏览器做交互的过程中，事件的传递，比如点击左键，怎么传递到页面上的。

捕获->目标阶段->冒泡

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>事件冒泡</title>
</head>
<body>
  <div id="parent">
    我是父元素
    <span id="son">我是子元素</span>
  </div>
</body>
<script type="text/javascript">
var parent = document.getElementById('parent');
var son = document.getElementById('son');

parent.addEventListener('click', () => {
  alert('父级冒泡');
}, false);
parent.addEventListener('click', () => {
  alert('父级捕获');
}, true);
son.addEventListener('click', () => {
  alert('子级捕获');
}, true);
son.addEventListener('click', () => {
  alert('子级冒泡');
}, false);
</script>
</html>
```
当点击父元素：父级冒泡 -> 父级捕获
当点击子元素：父级捕获 -> 子级捕获 -> 子级冒泡 -> 父级冒泡
