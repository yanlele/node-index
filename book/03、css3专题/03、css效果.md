# css效果

## <div id='class01'>01、clip-path</div>
最基本用法：  
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .container{
            width: 400px;
            height: 300px;
            border: 1px solid red;
            background:url(./panda.jpg);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            padding:10px;
             /*clip-path: inset(100px 100px); */
             clip-path: circle(50px at 100px 100px); 
            /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 10% 10%, 40px 10px); */
            /*clip-path: url(#clipPath);*/
            /* background-size: cover; */
            transition:clip-path .4s;
        }
        .container:hover{
             clip-path: circle(80px at 100px 100px); 
        }
    </style>
</head>
<body>
    <div class="container">
        你好，我是熊猫
    </div>
    <svg>
        <defs>
            <clipPath id="clipPath">
                <!-- <circle cx="60" cy="60" r="50" fill="#34538b" /> -->
                <polygon stroke="#979797" points="0.4921875 81.2070313 92.640625 81.2070313 121.601562 0.21875 153.648437 81.2070313 247.390625 80.7734375 173.394531 140.496094 200.308594 227.09375 121.601562 172.71875 53.4960937 227.09375 80.859375 140.496094"></polygon>
            </clipPath>
        </defs>
    </svg>
</body>
</html>
```

## <div id='class02'>02、3D-transform</div>                      
transform 是形变处理

3D变换的关键点在于translate属性           
如果希望看到3D需要在父级元素节点上设置 `perspective: 500px;` 属性，子元素节点上设置 `transform-style: preserve-3d;` 属性；   
[代码示例1](./demo/01、3Dtransform.html)

### CSS3中的变形功能transform
这css3中，可以利用transform功能来实现文字或图像的旋转、缩放、倾斜、移动这四种类型的变形处理。
2D Transform 方法

函数|	描述
matrix(n,n,n,n,n,n)|	定义 2D 转换，使用六个值的矩阵。
translate(x,y)|	定义 2D 转换，沿着 X 和 Y 轴移动元素。
translateX(n)|	定义 2D 转换，沿着 X 轴移动元素。
translateY(n)|	定义 2D 转换，沿着 Y 轴移动元素。
scale(x,y)|	定义 2D 缩放转换，改变元素的宽度和高度。值是指定的缩放倍率
scaleX(n)|	定义 2D 缩放转换，改变元素的宽度。值是指定的缩放倍率
scaleY(n)|	定义 2D 缩放转换，改变元素的高度。值是指定的缩放倍率
rotate(angle)|	定义 2D 旋转，在参数中规定角度。（单位deg）
skew(x-angle,y-angle)|	定义 2D 倾斜转换，沿着 X 和 Y 轴。
skewX(angle)|	定义 2D 倾斜转换，沿着 X 轴。
skewY(angle)|	定义 2D 倾斜转换，沿着 Y 轴。
   
使用方法：transform:方法1 方法2 方法3 方法4；  空格分隔  而且还有优先级的问题


[进阶内容补充](http://yunkus.com/css-clip-path/)

## <div id='class02'>02、3D-transform</div>




