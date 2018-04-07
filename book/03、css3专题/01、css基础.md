# css基础

## <div id='class01'>1、选择器</div>
- 1.1、选择器分类     
主要分为以下几个类别：     
元素选择器   a{}       
伪元素选择器   ::before{}        
类选择器     .link{}
属性选择器   [type=input]{}      
伪类选择器  :hover{}     
ID选择器    #id{}      
组合选择器  [type=input] + label{}       
否定选择器  :not(.link){}        
通用选择器  *{}      

- 1.2、选择器权重(选择器权重不进位)           
ID选择器        +100       
类、属性、伪类   +10       
元素、伪元素     +1   
其他选择器       +0      

## <div id='class02'>2、非布局样式</div>
2.1、字体      
自定义字体：      
```html
<style>
@font-face {
    font-family: "yanle";
    src: url("XXXXXXXX.ttf");
}

.my-font{
    font-family: yanle;
}
</style>

<body>
    <div class="my-font">我是自定义字体</div>
</body>
```
