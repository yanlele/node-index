# 布局类组件

<!-- toc -->

- [布局类组件简介](#%E5%B8%83%E5%B1%80%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%AE%80%E4%BB%8B)
- [布局原理与约束（constraints）](#%E5%B8%83%E5%B1%80%E5%8E%9F%E7%90%86%E4%B8%8E%E7%BA%A6%E6%9D%9Fconstraints)
  * [Flutter布局模型](#flutter%E5%B8%83%E5%B1%80%E6%A8%A1%E5%9E%8B)
  * [BoxConstraints](#boxconstraints)
  * [ConstrainedBox](#constrainedbox)
  * [SizedBox](#sizedbox)
  * [多重限制问题](#%E5%A4%9A%E9%87%8D%E9%99%90%E5%88%B6%E9%97%AE%E9%A2%98)
  * [UnconstrainedBox](#unconstrainedbox)
  * [UnconstrainedBox的正确使用方式](#unconstrainedbox%E7%9A%84%E6%AD%A3%E7%A1%AE%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)
- [线性布局（Row和Column）](#%E7%BA%BF%E6%80%A7%E5%B8%83%E5%B1%80row%E5%92%8Ccolumn)
  * [主轴和纵轴](#%E4%B8%BB%E8%BD%B4%E5%92%8C%E7%BA%B5%E8%BD%B4)
  * [Row](#row)
  * [Column](#column)
  * [一些特殊情况](#%E4%B8%80%E4%BA%9B%E7%89%B9%E6%AE%8A%E6%83%85%E5%86%B5)

<!-- tocstop -->

## 布局类组件简介

Widget  |	说明  |	用途
:-      |:-       |:-
LeafRenderObjectWidget |	非容器类组件基类	|    Widget树的叶子节点，用于没有子节点的widget，通常基础组件都属于这一类，如Image。
SingleChildRenderObjectWidget |	单子组件基类 |	包含一个子Widget，如：ConstrainedBox、DecoratedBox等
MultiChildRenderObjectWidget  |	多子组件基类 |	包含多个子Widget，一般都有一个children参数，接受一个Widget数组。如Row、Column、Stack等


## 布局原理与约束（constraints）
尺寸限制类容器用于限制容器大小，Flutter中提供了多种这样的容器，
如 `ConstrainedBox`、`SizedBox`、`UnconstrainedBox`、`AspectRatio` 等；

### Flutter布局模型
Flutter 中有两种布局模型：                           
- 基于 RenderBox 的盒模型布局。                                  
- 基于 Sliver ( RenderSliver ) 按需加载列表布局。                              

### BoxConstraints                  
BoxConstraints 是盒模型布局过程中父渲染对象传递给子渲染对象的约束信息                      
```dart
const BoxConstraints({
  this.minWidth = 0.0, //最小宽度
  this.maxWidth = double.infinity, //最大宽度
  this.minHeight = 0.0, //最小高度
  this.maxHeight = double.infinity //最大高度
});
```
如BoxConstraints.tight(Size size)，它可以生成固定宽高的限制；                  
BoxConstraints.expand()可以生成一个尽可能大的用以填充另一个容器的BoxConstraints。

### ConstrainedBox
`ConstrainedBox` 用于对子组件添加额外的约束。                        
```dart
import 'package:flutter/material.dart';

/// 使用 ConstrainedBox 对子组件进行额外约束
/// 使用 DecoratedBox 申明子组件为 box
/// ConstrainedBox.constraints 用于描述具体额外约束是啥子
class YLConstrainedBox extends StatelessWidget {
  const YLConstrainedBox({Key? key}) : super(key: key);

  // 声明 redBox
  final Widget redBox = const DecoratedBox(
    decoration: BoxDecoration(
      color: Colors.red,
    ),
  );

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(
        minWidth: double.infinity,
        minHeight: 50,
      ),
      child: Container(
        // 这边的优先级要高一些， 但是没有查过 50 像素
        // 如果 这里像素改为 80 ， 那么最后呈现效果以 80 为准
        height: 5.0, 
        child: redBox,
      ),
    );
  }
}
```

### SizedBox
`SizedBox` 用于给子元素指定固定的宽高                        
```dart
SizedBox(
  width: 80.0,
  height: 80.0,
  child: redBox
)
```
实际上 `SizedBox` 只是 `ConstrainedBox` 的一个定制，上面代码等价于：                       
```dart
ConstrainedBox(
  constraints: BoxConstraints.tightFor(width: 80.0,height: 80.0),
  child: redBox, 
)
```

而 `BoxConstraints.tightFor(width: 80.0,height: 80.0)` 等价于：                      
```dart
BoxConstraints(minHeight: 80.0,maxHeight: 80.0,minWidth: 80.0,maxWidth: 80.0);
```

示例一下，自己体会：
```dart
import 'package:flutter/material.dart';

class YLConstrainedBox extends StatelessWidget {
  const YLConstrainedBox({Key? key}) : super(key: key);

  // 声明 redBox
  final Widget redBox = const DecoratedBox(
    decoration: BoxDecoration(
      color: Colors.red,
    ),
  );

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 80,
      width: 80,
      child: redBox,
    );
  }
}
```


### 多重限制问题
如果某一个组件有多个父级 `ConstrainedBox` 限制，那么最终会是哪个生效？                        
```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: 60.0, minHeight: 60.0), //父
  child: ConstrainedBox(
    constraints: BoxConstraints(minWidth: 90.0, minHeight: 20.0),//子
    child: redBox,
  ),
)
```

**结论**： 有多重限制时，对于minWidth和minHeight来说，是取父子中相应数值较大的。
实际上，只有这样才能保证父限制与子限制不冲突。


### UnconstrainedBox
虽然任何时候子组件都必须遵守其父组件的约束，但前提条件是它们必须是父子关系，
假如有一个组件 A，它的子组件是B，B 的子组件是 C，则 C 必须遵守 B 的约束，
同时 B 必须遵守 A 的约束，`但是 A 的约束不会直接约束到 C`，
除非B将A对它自己的约束透传给了C。 
利用这个原理，就可以实现一个这样的 B 组件：

1. B 组件中在布局 C 时不约束C（可以为无限大）。                            
2. C 根据自身真实的空间占用来确定自身的大小。                                   
3. B 在遵守 A 的约束前提下结合子组件的大小确定自身大小。                                    

而这个 B组件就是 `UnconstrainedBox` 组件，也就是说 `UnconstrainedBox 的子组件将不再受到约束，大小完全取决于自己。`
```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: 60.0, minHeight: 100.0),  //父
  child: UnconstrainedBox( //“去除”父级限制
    child: ConstrainedBox(
      constraints: BoxConstraints(minWidth: 90.0, minHeight: 20.0),//子
      child: redBox,
    ),
  )
)
```

**注意**：             
UnconstrainedBox对父组件限制的“去除”并非是真正的去除：
上面例子中虽然红色区域大小是90×20，但上方仍然有80的空白空间。
也就是说父限制的minHeight(100.0)仍然是生效的，只不过它不影响最终子元素redBox的大小，
但仍然还是占有相应的空间，可以认为此时的父ConstrainedBox是作用于子UnconstrainedBox上，
而redBox只受子ConstrainedBox限制，这一点请读者务必注意。

**那么有什么方法可以彻底去除父ConstrainedBox的限制吗？答案是否定的！请牢记，任何时候子组件都必须遵守其父组件的约束**


### UnconstrainedBox的正确使用方式
当我们发现已经使用 `SizedBox` 或 `ConstrainedBox` 给子元素指定了固定宽高，但是仍然没有效果时，
几乎可以断定：已经有父组件指定了约束！

举个例子：如 Material 组件库中的AppBar（导航栏）的右侧菜单中，
我们使用SizedBox指定了 loading 按钮的大小，代码如下：
```dart
 AppBar(
   title: Text(title),
   actions: <Widget>[
     SizedBox(
       width: 20, 
       height: 20,
       child: CircularProgressIndicator(
         strokeWidth: 3,
         valueColor: AlwaysStoppedAnimation(Colors.white70),
       ),
     )
   ],
)
```
效果：           
![01](https://guphit.github.io/assets/img/4-6.27479289.png)

这正是因为 `AppBar` 中已经指定了 `actions` 按钮的约束条件，
所以我们要自定义 `loading` 按钮大小，就必须通过 `UnconstrainedBox` 来 “去除” 父元素的限制，代码如下：
```dart
AppBar(
  title: Text(title),
  actions: <Widget>[
    UnconstrainedBox(
      child: SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(
          strokeWidth: 3,
          valueColor: AlwaysStoppedAnimation(Colors.white70),
        ),
      ),
    )
  ],
)
```
效果：             
![02](https://guphit.github.io/assets/img/4-7.5b913c51.png)

**如果 UnconstrainedBox 的大小超过它父组件约束时，也会导致溢出报错**



## 线性布局（Row和Column）
所谓线性布局，即指沿水平或垂直方向排列子组件。

### 主轴和纵轴
对于线性布局，有主轴和纵轴之分，如果布局是沿水平方向，那么主轴就是指水平方向，而纵轴即垂直方向；
如果布局沿垂直方向，那么主轴就是指垂直方向，而纵轴就是水平方向。

有两个定义对齐方式的枚举类 `MainAxisAlignment` 和 `CrossAxisAlignment`，分别代表主轴对齐和纵轴对齐。

### Row
定义:                       
```dart
Row({
  ...  
  TextDirection textDirection,    
  MainAxisSize mainAxisSize = MainAxisSize.max,    
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
  VerticalDirection verticalDirection = VerticalDirection.down,  
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  List<Widget> children = const <Widget>[],
})
```
具体字段含义：  https://book.flutterchina.club/chapter4/row_and_column.html#_4-3-2-row

直接上一个 demo 自己体会
```dart
import 'package:flutter/material.dart';

class YLRowDemo1 extends StatelessWidget {
  const YLRowDemo1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const <Widget>[
            Text(" hello world "),
            Text(" I am Jack "),
          ],
        ),
        Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: const <Widget>[
            Text(" hello world "),
            Text(" I am Jack "),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          textDirection: TextDirection.rtl,
          children: const <Widget>[
            Text(" hello world "),
            Text(" I am Jack "),
          ],
        ),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          verticalDirection: VerticalDirection.up,
          children: const <Widget>[
            Text(" hello world ", style: TextStyle(fontSize: 30.0),),
            Text(" I am Jack "),
          ],
        )
      ],
    );
  }
}
```
效果：             
![03](https://guphit.github.io/assets/img/4-9.86777353.png)



### Column
`Column` 可以在垂直方向排列其子组件。
参数和Row一样，不同的是布局方向为垂直，主轴纵轴正好相反，读者可类比Row来理解。

例子的话就讲究上面那个看了呗

### 一些特殊情况
如果Row里面嵌套Row，或者Column里面再嵌套Column，
那么只有最外面的Row或Column会占用尽可能大的空间，里面Row或Column所占用的空间为实际大小，下面以Column为例说明：

```dart
Container(
  color: Colors.green,
  child: Padding(
    padding: const EdgeInsets.all(16.0),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.max, //有效，外层Colum高度为整个屏幕
      children: <Widget>[
        Container(
          color: Colors.red,
          child: Column(
            mainAxisSize: MainAxisSize.max,//无效，内层Colum高度为实际高度  
            children: <Widget>[
              Text("hello world "),
              Text("I am Jack "),
            ],
          ),
        )
      ],
    ),
  ),
);
```

如果要让里面的Column占满外部Column，可以使用 `Expanded` 组件：          
```dart
Expanded( 
  child: Container(
    color: Colors.red,
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center, //垂直方向居中对齐
      children: <Widget>[
        Text("hello world "),
        Text("I am Jack "),
      ],
    ),
  ),
)
```
