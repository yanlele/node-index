# 布局类组件

<!-- toc -->

- [布局类组件简介](#%E5%B8%83%E5%B1%80%E7%B1%BB%E7%BB%84%E4%BB%B6%E7%AE%80%E4%BB%8B)
- [布局原理与约束（constraints）](#%E5%B8%83%E5%B1%80%E5%8E%9F%E7%90%86%E4%B8%8E%E7%BA%A6%E6%9D%9Fconstraints)
  * [Flutter布局模型](#flutter%E5%B8%83%E5%B1%80%E6%A8%A1%E5%9E%8B)
  * [BoxConstraints](#boxconstraints)

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


