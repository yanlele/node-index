# 水平垂直居中定位

## 垂直居中的方案

1、                  
```
line-height: 200px;
vertical-align: middle;
```


2、CSS Table              
```
#parent {display: table;}
#child {
display: table-cell;
vertical-align: middle;
}
```

3、Absolute Positioning and Negative Margin                      
```
#parent {position: relative;}
#child {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 30%;
    width: 50%;
    margin: -15% 0 0 -25%;
}
```


4、Absolute Positioning and Stretching
```
#parent {position: relative;}
#child {
position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    height: 30%;
    margin: auto;
}
```

5、Equal Top and Bottom Padding                          
```
#parent {
    padding: 5% 0;
}
#child {
    padding: 10% 0;
}
```

## 水平居中的方案

1、要实现行内元素（<span>、<a>等）的水平居中：text-align:center;              

2、要实现块状元素（display:block）的水平居中: margin:0 auto;

3、多个水平排列的块状元素的水平居中:
```
#container{
    text-align:center;
}
#center{
    display:inline-block;
}
```

4、flexbox
```
#container {
    display: flex;
}
#container {
    display: inline-flex;
}
```

5、一直宽度水平居中:绝对定位与负边距实现。
```
#container{
    position:relative;
}

#center{
    width:100px;
    height:100px;
    position:absolute;
    top:50%;
    left:50%;
    margin:-50px 0 0 -50px;
}
```

6、绝对定位与margin：
```
#container{
    position:relative;
}
#center{
    position:absolute;
    margin:auto;
    top:0;
    bottom:0;
    left:0;
    right:0;
}
```


## 未知高度和宽度元素的水平垂直居中    
1、当要被居中的元素是inline或者inline-block元素
```
 #container{
    display:table-cell;
    text-align:center;
    vertical-align:middle;
}

#center{

}
```


2、利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。
```
#container{
    position:relative;
}
#center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

3、flex
```
#container{
    display:flex;
    justify-content:center;
    align-items: center;
}

#center{

}
```