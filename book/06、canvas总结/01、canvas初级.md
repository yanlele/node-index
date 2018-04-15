# canvas 初级


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


## <div id='class02'>2、绘制形状</div>



























