# canvas 初级

目录：     
- [1、基础使用](#class01)
- [2、绘制形状](#class02)
- [3、绘制路径](#class03)
- [4、添加样式和颜色](#class04)
- [5、绘制文本](#class05)
- [6、绘制图片](#class06)
- [7、状态的保存和恢复](#class07)
- [8、变形](#class08)


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
>  canvas 提供了两种方法来渲染文本:            

1、fillText(text, x, y [, maxWidth])     
在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.         

2、strokeText(text, x, y [, maxWidth])           
在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.           
```javascript
function draw(){
    let canvas = document.getElementById('tutorial');
    if(!canvas.getContext) return;
    let ctx = canvas.getContext("2d");
    //开始代码
    ctx.font = '100px sans-serif';
    ctx.fillText('颜乐乐', 10, 100);
    ctx.strokeText('颜乐乐',10, 200);
}
draw();
``` 

> 给文本添加样式

**font = value**        
当前我们用来绘制文本的样式。这个字符串使用和 CSS font属性相同的语法. 默认的字体是 10px sans-serif。

**textAlign = value**       
文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。

**textBaseline = value**        
基线对齐选项，可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。

**direction = value**       
文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。

## <div id='class06'>6、绘制图片</div>
- 由零开始创建图片          
**创建<img>元素**           
```javascript
var img = new Image();   // 创建一个<img>元素
img.src = 'myImage.png'; // 设置图片源地址
```
脚本执行后图片开始装载         

**绘制img**           
```javascript
//参数1：要绘制的img  参数2、3：绘制的img在canvas中的坐标
ctx.drawImage(img,0,0); 
```

注意：     
考虑到图片是从网络加载，如果 drawImage 的时候图片还没有完全加载完成，则什么都不做，个别浏览器会抛异常。所以我们应该保证在 img 绘制完成之后再 drawImage。           
```javascript
var img = new Image();   // 创建img元素
img.onload = function(){
  ctx.drawImage(img, 0, 0)
}
img.src = 'myImage.png'; // 设置图片源地址
```

- 绘制 img 标签元素中的图片           
img 可以 new 也可以来源于我们页面的 <img>标签          
```html
<img src="./img.jpg" alt="" width="300"><br>
<canvas id="tutorial" width="600" height="400"></canvas>

</body>
<script type="text/javascript">
    function draw(){
        var canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        var img = document.querySelector("img");
        ctx.drawImage(img, 0, 0);
    }
    document.querySelector("img").onclick = function (){
        draw();
    }
</script>
```

- 缩放图片      
**drawImage()** 也可以再添加两个参数：         
drawImage(image, x, y, width, height)           
这个方法多了2个参数：width 和 height，这两个参数用来控制 当像canvas画入时应该缩放的大小。         
`ctx.drawImage(img, 0, 0, 400, 200)`        

- 切片(slice)         
`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`            
第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。           
其他8个参数：              
前4个是定义图像源的切片位置和大小，          
后4个则是定义切片的目标显示位置和大小。                

## <div id='class07'>7、状态的保存和恢复</div>            
Saving and restoring state是绘制复杂图形时必不可少的操作。      
**save()和restore()**                    
save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。         
Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。            

- 1、关于 save()           
Canvas状态存储在栈中，每当save()方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：           
当前应用的变形（即移动，旋转和缩放）      
strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值           
当前的裁切路径（clipping path）          
可以调用任意多次 save方法。(类似数组的push())           

- 2、关于restore()         
每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。(类似数组的pop())                


## <div id='class08'>8、变形</div>           
- **translate(x, y)**             
用来移动 canvas 的原点到指定的位置           
translate方法接受两个参数。x 是左右偏移量，y 是上下偏移量，如右图所示。          
在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 restore 方法比手动恢复原先的状态要简单得多。又如果你是在一个循环中做位移但没有保存和恢复canvas 的状态，很可能到最后会发现怎么有些东西不见了，那是因为它很可能已经超出 canvas 范围以外了。          
注意：translate移动的是canvas的坐标原点。(坐标变换)          
```html
<canvas id="tutorial" width="600" height="600"></canvas>
</body>
<script type="text/javascript">
    let ctx;
    function draw(){
        let canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        ctx.save(); //保存坐原点平移之前的状态
        ctx.translate(100, 100);
        ctx.strokeRect(0, 0, 100, 100);
        ctx.restore(); //恢复到最初状态
        ctx.translate(220, 220);
        ctx.fillRect(0, 0, 100, 100)
    }
    draw();
</script>
```

- rotate            
`rotate(angle)`         
旋转坐标轴。          
这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。         
旋转的中心是坐标原点。         
```javascript
function draw(){
    let canvas = document.getElementById('tutorial');
    if(!canvas.getContext) return;
    let ctx = canvas.getContext("2d");
    //开始代码
    ctx.fillStyle = "red";
    ctx.save();

    ctx.translate(100, 100);
    ctx.rotate(Math.PI / 180 * 45);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 100, 100);
    ctx.restore();

    ctx.save();
    ctx.translate(0, 0);
    ctx.fillRect(0, 0, 50, 50);
    ctx.restore();
}
draw();
```

- scale             
`scale(x, y)`               
我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。                
scale方法接受两个参数。x,y分别是横轴和纵轴的缩放因子，它们都必须是正值。值比 1.0 小表示缩 小，比 1.0 大则表示放大，值为 1.0 时什么效果都没有。             
默认情况下，canvas 的 1 单位就是 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。同理，设置为 2.0 时，1 个单位就对应变成了 2 像素，绘制的结果就是图形放大了 2 倍。                    

- transform(变形矩阵)           
`transform(a, b, c, d, e, f)`               
a (m11):  Horizontal scaling. (水平伸缩)            
b (m12):  Horizontal skewing.(水平歪斜)         
c (m21):  Vertical skewing.(垂直歪斜)               
d (m22):  Vertical scaling.(垂直伸缩)               
e (dx):  Horizontal moving.(水平移动)               
f (dy):  Vertical moving.(垂直移动)             

示例：                 
```javascript
function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        //开始代码
        let ctx;
        function draw(){
            let canvas = document.getElementById('tutorial');
            if (!canvas.getContext) return;
            let ctx = canvas.getContext("2d");
            ctx.transform(1, 1, 0, 1, 0, 0);
            ctx.fillRect(0, 0, 100, 100);
        }
        draw();
    }
    draw();
```


## <div id='class09'>9、合成</div>
在前面的所有例子中、，我们总是将一个图形画在另一个之上，对于其他更多的情况，仅仅这样是远远不够的。比如，对合成的图形来说，绘制顺序会有限制。不过，我们可以利用 `globalCompositeOperation` 属性来改变这种状况。                  
`globalCompositeOperation = type`
```javascript
function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.fillStyle = "blue";                       //老图像
        ctx.fillRect(0, 0, 200, 200);

        ctx.globalCompositeOperation = "source-over"; //全局合成操作
        ctx.fillStyle = "red";                        //新图像
        ctx.fillRect(100, 100, 200, 200);
    }
    draw();
```               
`type`是下面 13 种字符串值之一：               
1. source-over(default)         
这是默认设置，新图像会覆盖在原有图像。             

2. source-in                
仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。(包括其他的老图像区域也会透明)                  

3. source-out               
仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。(老图像也不显示)               

4. source-atop              
新图像仅仅显示与老图像重叠区域。老图像仍然可以显示。(新图像也不显示)                  

5. destination-over                 
新图像会在老图像的下面。                    

6. destination-in               
仅仅新老图像重叠部分的老图像被显示，其他区域全部透明。                 

7. destination-out              
仅仅老图像与新图像没有重叠的部分。 注意显示的是老图像的部分区域。               

8. destination-atop         
老图像仅仅仅仅显示重叠部分，新图像会显示在老图像的下面。                

9. lighter              
新老图像都显示，但是重叠区域的颜色做加处理               

10. darken          
保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)           
blue: #0000ff       
red: #ff0000                
所以重叠部分的颜色：#000000               

11. lighten             
保证重叠部分最量的像素。(每个颜色位进行比较，得到最大的)               
blue: #0000ff           
red: #ff0000                
所以重叠部分的颜色：#ff00ff               

12. xor         
重叠部分会变成透明               

13. copy            
只有新图像会被保留，其余的全部被清除(边透明)             


## <div id='class10'>10、剪裁路径</div>          
`clip()`                
把已经创建的路径转换成裁剪路径。                
裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。                
注意：clip()只能遮罩在这个方法调用之后绘制的图像，如果是clip()方法调用之前绘制的图像，则无法实现遮罩。               
```javascript
function draw(){
        let canvas = document.getElementById('tutorial');
        if(!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        //开始代码
        ctx.beginPath();
        ctx.arc(20,20, 100, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = "pink";
        ctx.fillRect(20, 20, 100,100);
    }
    draw();
```

## <div id='class11'>11、动画</div>          
**动画的基本步骤**                 
1、 `清空canvas`               
再绘制每一帧动画之前，需要清空所有。清空所有最简单的做法就是 `clearRect()` 方法             

2、 `保存canvas状态`             
如果在绘制的过程中会更改canvas的状态(颜色、移动了坐标原点等),又在绘制每一帧时都是原始状态的话，则最好保存下canvas的状态             

3、 `绘制动画图形`         
这一步才是真正的绘制动画帧               

4、 `恢复canvas状态`             
如果你前面保存了canvas状态，则应该在绘制完成一帧之后恢复canvas状态。                    


**控制动画**                
我们可用通过canvas的方法或者自定义的方法把图像会知道到canvas上。正常情况，我们能看到绘制的结果是在脚本执行结束之后。例如，我们不可能在一个 for 循环内部完成动画。               
也就是，为了执行动画，我们需要一些可以定时执行重绘的方法。                   

一般用到下面三个方法：
`setInterval()`         
`setTimeout()`          
`requestAnimationFrame()`           

请参看如下两个示例示例代码：              
[26、太阳系](./demo/26、太阳系.html)                
[27、模拟时钟](./demo/27、模拟时钟.html)                  







[参看博文](https://blog.csdn.net/u012468376/article/details/73350998)