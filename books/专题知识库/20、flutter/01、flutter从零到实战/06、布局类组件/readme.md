# 布局类组件

<!-- toc -->

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



