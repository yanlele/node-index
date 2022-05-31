# 容器类组件


## 填充

### Padding
```dart
Padding({
  ...
  EdgeInsetsGeometry padding,
  Widget child,
})
```

### EdgeInsets
```
fromLTRB(double left, double top, double right, double bottom)：分别指定四个方向的填充。
all(double value) : 所有方向均使用相同数值的填充。
only({left, top, right ,bottom })：可以设置具体某个方向的填充(可以同时指定多个方向)。
symmetric({ vertical, horizontal })：用于设置对称方向的填充，vertical指top和bottom，horizontal指left和right。
```


### 看一个demo                                     
自己体会                                    
```dart
class PaddingTestRoute extends StatelessWidget {
  const PaddingTestRoute({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      //上下左右各添加16像素补白
      padding: const EdgeInsets.all(16),
      child: Column(
        //显式指定对齐方式为左对齐，排除对齐干扰
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: const <Widget>[
          Padding(
            //左边添加8像素补白
            padding: EdgeInsets.only(left: 8),
            child: Text("Hello world"),
          ),
          Padding(
            //上下各添加8像素补白
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text("I am Jack"),
          ),
          Padding(
            // 分别指定四个方向的补白
            padding: EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: Text("Your friend"),
          )
        ],
      ),
    );
  }
}
```

## 装饰容器（DecoratedBox）

### DecoratedBox
DecoratedBox可以在其子组件绘制前(或后)绘制一些装饰（Decoration），如背景、边框、渐变等。                            

定义：                                 
```dart
const DecoratedBox({
  Decoration decoration,
  DecorationPosition position = DecorationPosition.background,
  Widget? child
})
```
`position`：此属性决定在哪里绘制Decoration，它接收DecorationPosition的枚举类型，该枚举类有两个值：                      
`background`：在子组件之后绘制，即背景装饰。                                
`foreground`：在子组件之上绘制，即前景。


### BoxDecoration
```dart
BoxDecoration({
  Color color, //颜色
  DecorationImage image,//图片
  BoxBorder border, //边框
  BorderRadiusGeometry borderRadius, //圆角
  List<BoxShadow> boxShadow, //阴影,可以指定多个
  Gradient gradient, //渐变
  BlendMode backgroundBlendMode, //背景混合模式
  BoxShape shape = BoxShape.rectangle, //形状
})
```


### 举一个例子
```dart
 DecoratedBox(
   decoration: BoxDecoration(
     gradient: LinearGradient(colors:[Colors.red,Colors.orange.shade700]), //背景渐变
     borderRadius: BorderRadius.circular(3.0), //3像素圆角
     boxShadow: [ //阴影
       BoxShadow(
         color:Colors.black54,
         offset: Offset(2.0,2.0),
         blurRadius: 4.0
       )
     ]
   ),
  child: Padding(
    padding: EdgeInsets.symmetric(horizontal: 80.0, vertical: 18.0),
    child: Text("Login", style: TextStyle(color: Colors.white),),
  )
)
```


## 变换（Transform）
```dart
Container(
  color: Colors.black,
  child: Transform(
    alignment: Alignment.topRight, //相对于坐标系原点的对齐方式
    transform: Matrix4.skewY(0.3), //沿Y轴倾斜0.3弧度
    child: Container(
      padding: const EdgeInsets.all(8.0),
      color: Colors.deepOrange,
      child: const Text('Apartment for rent!'),
    ),
  ),
)
```

### translate
`Transform.translate` 接收一个 `offset` 参数，可以在绘制时沿x、y轴对子组件平移指定的距离。
```dart
DecoratedBox(
  decoration:BoxDecoration(color: Colors.red),
  //默认原点为左上角，左移20像素，向上平移5像素  
  child: Transform.translate(
    offset: Offset(-20.0, -5.0),
    child: Text("Hello world"),
  ),
)
```

### 旋转
`Transform.rotate` 可以对子组件进行旋转变换
```dart
DecoratedBox(
  decoration:BoxDecoration(color: Colors.red),
  child: Transform.rotate(
    //旋转90度
    angle:math.pi/2 ,
    child: Text("Hello world"),
  ),
)
```

### 缩放
`Transform.scale` 可以对子组件进行缩小或放大
```dart
DecoratedBox(
    decoration:BoxDecoration(color: Colors.red),
        child: Transform.scale(
        scale: 1.5, //放大到1.5倍
        child: Text("Hello world")
    )
);
```

### Transform 注意事项
对子组件应用何种变化，其占用空间的大小和在屏幕上的位置都是固定不变的，因为这些是在布局阶段就确定的。                          
```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    DecoratedBox(
      decoration:BoxDecoration(color: Colors.red),
      child: Transform.scale(
          scale: 1.5,
          child: Text("Hello world"),
      )
    ),
    Text("你好", style: TextStyle(color: Colors.green, fontSize: 18.0),)
  ],
)
```

### RotatedBox
`RotatedBox` 的变换是在layout阶段，会影响在子组件的位置和大小。我们将上面介绍Transform.rotate时的示例改一下：
```dart
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    DecoratedBox(
      decoration: BoxDecoration(color: Colors.red),
      //将Transform.rotate换成RotatedBox  
      child: RotatedBox(
        quarterTurns: 1, //旋转90度(1/4圈)
        child: Text("Hello world"),
      ),
    ),
    Text("你好", style: TextStyle(color: Colors.green, fontSize: 18.0),)
  ],
),
```


## 容器组件（Container）

### Container
```dart
Container({
  this.alignment,
  this.padding, //容器内补白，属于decoration的装饰范围
  Color color, // 背景色
  Decoration decoration, // 背景装饰
  Decoration foregroundDecoration, //前景装饰
  double width,//容器的宽度
  double height, //容器的高度
  BoxConstraints constraints, //容器大小的限制条件
  this.margin,//容器外补白，不属于decoration的装饰范围
  this.transform, //变换
  this.child,
  ...
})
```

demo 自己体会一下
```dart
Container(
  margin: EdgeInsets.only(top: 50.0, left: 120.0),
  constraints: BoxConstraints.tightFor(width: 200.0, height: 150.0),//卡片大小
  decoration: BoxDecoration(  //背景装饰
    gradient: RadialGradient( //背景径向渐变
      colors: [Colors.red, Colors.orange],
      center: Alignment.topLeft,
      radius: .98,
    ),
    boxShadow: [
      //卡片阴影
      BoxShadow(
        color: Colors.black54,
        offset: Offset(2.0, 2.0),
        blurRadius: 4.0,
      )
    ],
  ),
  transform: Matrix4.rotationZ(.2),//卡片倾斜变换
  alignment: Alignment.center, //卡片内文字居中
  child: Text(
    //卡片文字
    "5.20", style: TextStyle(color: Colors.white, fontSize: 40.0),
  ),
)
```

### Padding和Margin

```dart
...
Container(
  margin: EdgeInsets.all(20.0), //容器外补白
  color: Colors.orange,
  child: Text("Hello world!"),
),
Container(
  padding: EdgeInsets.all(20.0), //容器内补白
  color: Colors.orange,
  child: Text("Hello world!"),
),
...
```

demo                    
```dart
Padding(
  padding: EdgeInsets.all(20.0),
  child: DecoratedBox(
    decoration: BoxDecoration(color: Colors.orange),
    child: Text("Hello world!"),
  ),
),
DecoratedBox(
  decoration: BoxDecoration(color: Colors.orange),
  child: Padding(
    padding: const EdgeInsets.all(20.0),
    child: Text("Hello world!"),
  ),
),
```

## 剪裁（Clip）

### 剪裁类组件

剪裁Widget |	默认行为
:- | :-
ClipOval |	子组件为正方形时剪裁成内贴圆形；为矩形时，剪裁成内贴椭圆
ClipRRect|	将子组件剪裁为圆角矩形
ClipRect | 	默认剪裁掉子组件布局空间之外的绘制内容（溢出部分剪裁）
ClipPath |	按照自定义的路径剪裁

```dart
import 'package:flutter/material.dart';

class ClipTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 头像  
    Widget avatar = Image.asset("imgs/avatar.png", width: 60.0);
    return Center(
      child: Column(
        children: <Widget>[
          avatar, //不剪裁
          ClipOval(child: avatar), //剪裁为圆形
          ClipRRect( //剪裁为圆角矩形
            borderRadius: BorderRadius.circular(5.0),
            child: avatar,
          ), 
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Align(
                alignment: Alignment.topLeft,
                widthFactor: .5,//宽度设为原来宽度一半，另一半会溢出
                child: avatar,
              ),
              Text("你好世界", style: TextStyle(color: Colors.green),)
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ClipRect(//将溢出部分剪裁
                child: Align(
                  alignment: Alignment.topLeft,
                  widthFactor: .5,//宽度设为原来宽度一半
                  child: avatar,
                ),
              ),
              Text("你好世界",style: TextStyle(color: Colors.green))
            ],
          ),
        ],
      ),
    );
  }
}
```


### 自定义裁剪（CustomClipper）
https://book.flutterchina.club/chapter5/clip.html#_5-5-2-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A3%81%E5%89%AA-customclipper


## 空间适配 FittedBox

### FittedBox
子组件大小超出了父组件大小时，如果不经过处理的话 Flutter 中就会显示一个溢出警告并在控制台打印错误日志                     
为了方便开发者自定义适配规则，Flutter 提供了一个 FittedBox 组件                       
```dart
const FittedBox({
  Key? key,
  this.fit = BoxFit.contain, // 适配方式
  this.alignment = Alignment.center, //对齐方式
  this.clipBehavior = Clip.none, //是否剪裁
  Widget? child,
})
```

直接看文档：https://book.flutterchina.club/chapter5/fittedbox.html#_5-6-1-fittedbox

## Scaffold
我们实现一个页面，它包含：                   
- 一个导航栏
- 导航栏右边有一个分享按钮
- 有一个抽屉菜单
- 有一个底部导航
- 右下角有一个悬浮的动作按钮

![01](https://guphit.github.io/assets/img/5-18.f83914b2.png)                            
![02](https://guphit.github.io/assets/img/5-19.a2dab018.png)                                    

组件名称    |	解释
:- |:-
AppBar  |	一个导航栏骨架
MyDrawer|	抽屉菜单
BottomNavigationBar|	底部导航栏
FloatingActionButton|	漂浮按钮

具体定义可以看文档： https://book.flutterchina.club/chapter5/material_scaffold.html#_5-7-scaffold

