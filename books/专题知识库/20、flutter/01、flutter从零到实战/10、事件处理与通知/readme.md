# 事件处理与通知

## 原始指针事件处理
Flutter中可以使用Listener来监听原始触摸事件，按照本书对组件的分类
```dart
Listener({
  Key key,
  this.onPointerDown, //手指按下回调
  this.onPointerMove, //手指移动回调
  this.onPointerUp,//手指抬起回调
  this.onPointerCancel,//触摸事件取消回调
  this.behavior = HitTestBehavior.deferToChild, //先忽略此参数，后面小节会专门介绍
  Widget child
});
```

demo: 手指在一个容器上移动时查看手指相对于容器的位置。                      
```dart
class _PointerMoveIndicatorState extends State<PointerMoveIndicator> {
  PointerEvent? _event;

  @override
  Widget build(BuildContext context) {
    return Listener(
      child: Container(
        alignment: Alignment.center,
        color: Colors.blue,
        width: 300.0,
        height: 150.0,
        child: Text(
          '${_event?.localPosition ?? ''}',
          style: TextStyle(color: Colors.white),
        ),
      ),
      onPointerDown: (PointerDownEvent event) => setState(() => _event = event),
      onPointerMove: (PointerMoveEvent event) => setState(() => _event = event),
      onPointerUp: (PointerUpEvent event) => setState(() => _event = event),
    );
  }
}
```

PointerEvent 属性名称 | 作用
:- | :-
position | 它是指针相对于当对于全局坐标的偏移。
localPosition | 它是指针相对于当对于本身布局坐标的偏移。
delta | 两次指针移动事件（PointerMoveEvent）的距离。
pressure | 按压力度，如果手机屏幕支持压力传感器(如iPhone的3D Touch)，此属性会更有意义，如果手机不支持，则始终为1。
orientation | 指针移动方向，是一个角度值。
behavior | 决定子组件如何响应命中测试

### 忽略指针事件
可以使用`IgnorePointer`和`AbsorbPointer`

AbsorbPointer本身是可以接收指针事件的(但其子树不行)，而IgnorePointer不可以。                            
