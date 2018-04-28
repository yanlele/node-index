# canvas 初级

目录：     
- [1、基础使用](#class01)
- [2、绘制形状](#class02)
- [3、绘制路径](#class03)
- [4、添加样式和颜色](#class04)
- [5、绘制文本](#class05)


## <div id='class01'>1、基础使用</div>
### 1.1 <canvas>元素
```html
<canvas id="tutorial" width="300" height="300"></canvas>
```     
<canvas>看起来和<img>标签一样，只是 <canvas> 只有两个可选的属性 width、heigth 属性，而没有 src、alt 属性。     
​ 如果不给<canvas>设置widht、height属性时，则默认 width为300、height为150,单位都是px。也可以使用css属性来设置宽高，但是如宽高属性和初始比例不一致，他会出现扭曲。所以，建议永远不要使用css属性来设置<canvas>的宽高。      

**内容替换：**       
由于某些较老的浏览器（尤其是IE9之前的IE浏览器）或者浏览器不支持HTML元素<canvas>，在这些浏览器上你应该总是能展示替代内容。       
​支持<canvas>的浏览器会只渲染<canvas>标签，而忽略其中的替代内容。不支持 <canvas> 的浏览器则 会直接渲染替代内容。     

文本替换：   
```html
<canvas>
    你的浏览器不支持canvas,请升级你的浏览器
</canvas>
```

图片替换：
```html
<canvas>
    <img src="./美女.jpg" alt=""> 
</canvas>
```
结束标签</canvas>不可省

### 1.2、渲染上下文(Thre Rending Context)
```html
var canvas = document.getElementById('tutorial');
//获得 2d 上下文对象
var ctx = canvas.getContext('2d');
```

### 1.3、检测支持性
```html
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

### 1.4、代码模板
```html
    <html>
    <head>
        <title>Canvas tutorial</title>
        <style type="text/css">
            canvas {
                border: 1px solid black;
            }
        </style>
    </head>
    <canvas id="tutorial" width="300" height="300"></canvas>
    </body>
    <script type="text/javascript">
        function draw(){
            var canvas = document.getElementById('tutorial');
            if(!canvas.getContext) return;
            var ctx = canvas.getContext("2d");
            //开始代码
    
        }
        draw();
    </script>
    </html>
```

### 1.5、一个简单的例子
绘制两个长方形:    
```html
<html>
<head>
    <title>Canvas tutorial</title>
    <style type="text/css">
        canvas {
            border: 1px solid black;
        }
    </style>
</head>
<canvas id="tutorial" width="300" height="300"></canvas>
</body>
<script type="text/javascript">
    function draw(){
        var canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(200,0,0)";
        //绘制矩形
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
    }
    draw();
</script>
</html>
```
[详情请见示例02](./demo/02、一个简单的例子.html)


## <div id='class02'>2、绘制形状</div>
<canvas> 只支持一种原生的 图形绘制：矩形。所有其他图形都至少需要生成一种路径(path)。不过，我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。            
canvast 提供了三种方法绘制矩形：            
`fillRect(x, y, width, height)` 绘制一个填充的矩形       
`strockRect(x, y, width, height)` 绘制一个矩形的边框         
`clearRect(x, y, widh, height)` 清除指定的矩形区域，然后这块区域会变的完全透明。        

说明:     
这3个方法具有相同的参数。       
​x, y：指的是矩形的左上角的坐标。(相对于canvas的坐标原点)         
​width, height：指的是绘制的矩形的宽和高。        

示例：
```javascript
function draw(){
    var canvas = document.getElementById('tutorial');
    if(!canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    ctx.fillRect(10, 10, 100, 50);  //绘制矩形,填充的默认颜色为黑色
    ctx.strokeRect(10, 70, 100, 50);  //绘制矩形边框
    ctx.clearRect(15, 15, 50, 25);
}
draw();
```
[详情请见示例3](./demo/03、绘制矩形的三种方式.html)


## <div id='class03'>3、绘制路径</div>
路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。        
> 使用路径绘制图形需要一些额外的步骤：        

1、创建路径起始点       
2、调用绘制方法去绘制出路径      
3、把路径封闭     
4、一旦路径生成，通过描边或填充路径区域来渲染图形。      

> 下面是需要用到的方法：       

1、beginPath()           
新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径                   
2、moveTo(x, y)      
把画笔移动到指定的坐标(x, y)。相当于设置路径的起始点坐标。            
3、closePath()       
闭合路径之后，图形绘制命令又重新指向到上下文中             
4、stroke()          
通过线条来绘制图形轮廓     
5、fill()            
通过填充路径的内容区域生成实心的图形      

### 3.1、绘制线段
```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath(); //新建一条path
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.closePath();
        ctx.stroke();
    }
    draw();
```
[请见示例4](./demo/04、绘制线段.html)

### 3.2、绘制一个三角形
```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.closePath();
        ctx.stroke();
    }
    draw();
```
[请见示例5](./demo/05、绘制一个三角形.html)

### 3.3、填充一个三角形
```javascript
    function draw() {
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.fill();
    }
    draw();
```
[示例6](./demo/06、填充一个三角形.html)

### 3.4、绘制圆弧
> arc(x, y, r, startAngle, endAngle, anticlockwise):

以(x, y)为圆心，以r为半径，从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)          
注意：     
这里的度数都是弧度。      
0弧度是指的x轴正方形     
`radians=(Math.PI/180)*degrees` //角度转换成弧度           

> arcTo(x1, y1, x2, y2, radius):        

根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。         

圆弧案例1：      
```javascript
    function draw() {
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath();
        ctx.arc(110, 110, 40, 0, Math.PI / 2, false);
        ctx.stroke()
    }

    draw();
```
[示例7](./demo/07、圆弧案例1.html)         

圆弧案例2：      
```javascript
    function draw() {
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(50, 150, 40, -Math.PI / 2, Math.PI / 2, false);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(150, 150, 40, 0, Math.PI, false);
        ctx.fill();


    }
    draw();
```
[示例8](./demo/08、圆形案例2.html)

圆弧示例3：      
```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(50, 50);
        //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数5：圆弧半径
        ctx.arcTo(200, 50, 200, 200, 100);
        ctx.lineTo(200, 200);
        ctx.stroke();
    
        ctx.beginPath();
        ctx.rect(50, 50, 10, 10);
        ctx.rect(200, 50, 10, 10);
        ctx.rect(200, 200, 10, 10);
        ctx.fill()
    }
    draw();
```     
arcTo方法的说明：     
​这个方法可以这样理解。绘制的弧形是由两条切线所决定。     
​第 1 条切线：起始点和控制点1决定的直线。     
​第 2 条切线：控制点1 和控制点2决定的直线。       
其实绘制的圆弧就是与这两条直线相切的圆弧。       
[示例9](./demo/09、圆弧案例3.html)

### 3.5、绘制贝塞尔曲线         
> 绘制二次贝塞尔曲线

`quadraticCurveTo(cp1x, cp1y, x, y):`       
说明：
​参数1和2：控制点坐标        
​参数3和4：结束点坐标        
```javascript
    function draw() {
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath();
        ctx.moveTo(10, 200);
        let cp1x = 40, cp1y = 100;
        let x = 200, y = 200;
        ctx.quadraticCurveTo(cp1x, cp1y, x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(10, 200, 10, 10);
        ctx.rect(cp1x, cp1y, 10, 10);
        ctx.rect(x, y, 10, 10);
        ctx.fill();
    }
    draw();
```
[示例10](./demo/10、绘制二次贝塞尔曲线.html)


> 绘制三次贝塞尔曲线

`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)：`      
说明：     
​参数1和2：控制点1的坐标            
​参数3和4：控制点2的坐标      
参数5和6：结束点的坐标        

```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码

        ctx.beginPath();
        ctx.moveTo(40, 200); //起始点
        let cp1x = 20, cp1y = 100;  //控制点1
        let cp2x = 100, cp2y = 120;  //控制点2
        let x = 200, y = 200; // 结束点
        //绘制二次贝塞尔曲线
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(40, 200, 10, 10);
        ctx.rect(cp1x, cp1y, 10, 10);
        ctx.rect(cp2x, cp2y, 10, 10);
        ctx.rect(x, y, 10, 10);
        ctx.fill();
    }
    draw();
```
[示例11](./demo/11、绘制三次贝塞尔曲线.html)

## <div id='class04'>4、添加样式和颜色</div>
在前面的绘制矩形章节中，只用到了默认的线条和颜色。           
​如果想要给图形上色，有两个重要的属性可以做到。            
> 基本使用方式

1、`fillStyle = color` 设置图形的填充颜色         
2、 `strokeStyle = color` 设置图形轮廓的颜色        
  
备注：     
1. `color` 可以是表示 `css` 颜色值的字符串、渐变对象或者图案对象。      
2. 默认情况下，线条和填充颜色都是黑色。       
3. 一旦您设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置 `fillStyle` 或 `strokeStyle` 的值。          

fillStyle示例:  
```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        for (let i = 0; i < 6; i++){
            for (let j = 0; j < 6; j++){
                ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                    Math.floor(255 - 42.5 * j) + ',0)';
                ctx.fillRect(j * 50, i * 50, 50, 50);
            }
        }
    }
    draw();
```
[示例12](./demo/12、填充颜色fillStyle.html)


strokeStyle示例：
```javascript
    function randomInt(from, to){
        return parseInt(Math.random() * (to - from + 1) + from);
    }
    function draw(){
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        for (let i = 0; i < 6; i++){
            for (let j = 0; j < 6; j++){
                ctx.strokeStyle = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
                ctx.strokeRect(j * 50, i * 50, 40, 40);
            }
        }
    }
    draw();
```
[示例13](./demo/13、设置轮廓颜色.html)


> Transparency(透明度)

`globalAlpha = transparencyValue`       
这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。        
globalAlpha 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为使用rgba()设置透明度更加好一些。     

> line style        

**1、lineWidth = value**     
线宽。只能是正值。默认是1.0。        
起始点和终点的连线为中心，上下各占线宽的一半          

```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(100, 10);
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(110, 10);
        ctx.lineTo(160, 10);
        ctx.lineWidth = 20;
        ctx.stroke();
    }
    draw();
```
[示例14](./demo/14、线宽.html)

**2、lineCap = type**            
线条末端样式。     
共有3个值：      
butt：线段末端以方形结束      
round：线段末端以圆形结束     
square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。     

```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        let lineCaps = ['butt', 'round', 'square'];
        for(let i = 0; i< 3; i++) {
            ctx.beginPath();
            ctx.moveTo(20 + 30*i, 30);
            ctx.lineTo(20 + 30*i, 100);
            ctx.lineWidth = 20;
            ctx.lineCap = lineCaps[i];
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(300, 30);

        ctx.moveTo(0, 100);
        ctx.lineTo(300, 100);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    draw();
```
[实例15](./demo/15、线条末端样式.html)

**3、lineJoin = type**           
同一个path内，设定线条与线条间接合处的样式。共有3个值round, bevel 和 miter：      
round：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。          
bevel：在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。            
miter(默认)：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。     

```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        let lineJoin = ['round', 'bevel', 'miter'];
        ctx.lineWidth = 20;

        for (let i = 0; i < lineJoin.length; i++){
            ctx.lineJoin = lineJoin[i];
            ctx.beginPath();
            ctx.moveTo(50, 50 + i * 50);
            ctx.lineTo(100, 100 + i * 50);
            ctx.lineTo(150, 50 + i * 50);
            ctx.lineTo(200, 100 + i * 50);
            ctx.lineTo(250, 50 + i * 50);
            ctx.stroke();
        }

    }
    draw();
```
[示例16、线条连接处样式](./demo/16、线条链接处的样式.html)

> 虚线            

用 `setLineDash` 方法和 `lineDashOffset` 属性来制定虚线样式. `setLineDash` 方法接受一个数组，来指定线段与间隙的交替；`lineDashOffset`属性设置起始偏移量.       
`getLineDash()` :返回一个包含当前虚线样式，长度为非负偶数的数组。
```javascript
    function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
        ctx.lineDashOffset = 25;
        ctx.strokeRect(50, 50, 210, 210);
    }
    
    draw();
```

[17、虚线](./demo/17、虚线.html)


## <div id='class05'>5、绘制文本</div>
canvas 提供了两种方法来渲染文本:            
1、fillText(text, x, y [, maxWidth])     
在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.


2、strokeText(text, x, y [, maxWidth])       
在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.      





[参看博文](https://blog.csdn.net/u012468376/article/details/73350998)