# css布局

## <div id='class01'>01、响应式布局和设计</div>
在不同设备上正常使用，主要处理屏幕大小问题           
主要方法：       
隐藏 + 折行 + 自适应空间         
rem/viewport/media query

媒体查询：           
```html
<style>
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}

@media screen and (min-width: 300px){
    body {
        background-color:lightblue;
    }
}

@media screen and (min-width:300px) and (max-width:500px) {
    /* CSS 代码 */
}
</style>
```
