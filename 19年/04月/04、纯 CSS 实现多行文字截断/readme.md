# 纯 CSS 实现多行文字截断



### 单行文本截断 text-overflow
```css
p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
属性浏览器原生支持，各大浏览器兼容性好，缺点就是只支持单行文本截断，并不支持多行文本截取。




### -webkit-line-clamp 实现 
```css
.container p {
  font-size: 22px;

  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```
但是缺点也是很直接，因为 -webkit-line-clamp 是一个不规范的属性，它没有出现在 CSS 规范草案中。
也就是说只有 webkit 内核的浏览器才支持这个属性，像 Firefox, IE 浏览器统统都不支持这个属性，浏览器兼容性不好。


### 定位元素实现多行文本截断
```css
.container p {
  position: relative;
  line-height: 18px;
  height: 36px;
  overflow: hidden;
}
.container p::after {
  content:"...";
  font-weight:bold;
  position:absolute;
  bottom:0;
  right:0;
  padding:0 20px 1px 45px;

  /* 为了展示效果更好 */
  background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), to(white), color-stop(50%, white));
  background: -moz-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: -o-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: -ms-linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```

它无法识别文字的长短，即文本超出范围才显示省略号，否则不显示省略号。
还有因为是我们人为地在文字末尾添加一个省略号效果，就会导致它跟文字其实没有贴合的很紧密，
遇到这种情况可以通过添加 word-break: break-all; 使一个单词能够在换行时进行拆分。












### 参考文章
- [纯 CSS 实现多行文字截断](https://segmentfault.com/a/1190000016879657)
- [黑科技：CSS定制多行省略](https://segmentfault.com/a/1190000008649988)
