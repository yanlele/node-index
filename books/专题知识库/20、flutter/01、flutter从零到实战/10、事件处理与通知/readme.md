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



## 手势识别
### GestureDetector

**点击、双击、长按**                    
`onTap、onDoubleTap、onLongPress`


demo
```dart
class _GestureTestState extends State<GestureTest> {
  String _operation = "No Gesture detected!"; //保存事件名
  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        child: Container(
          alignment: Alignment.center,
          color: Colors.blue,
          width: 200.0,
          height: 100.0,
          child: Text(
            _operation,
            style: TextStyle(color: Colors.white),
          ),
        ),
        onTap: () => updateText("Tap"), //点击
        onDoubleTap: () => updateText("DoubleTap"), //双击
        onLongPress: () => updateText("LongPress"), //长按
      ),
    );
  }

  void updateText(String text) {
    //更新显示的事件名
    setState(() {
      _operation = text;
    });
  }
}
```

**拖动、滑动**                                   
拖动和滑动事件是没有区分的

demo                            
```dart
class _Drag extends StatefulWidget {
  @override
  _DragState createState() => _DragState();
}

class _DragState extends State<_Drag> with SingleTickerProviderStateMixin {
  double _top = 0.0; //距顶部的偏移
  double _left = 0.0;//距左边的偏移

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          top: _top,
          left: _left,
          child: GestureDetector(
            child: CircleAvatar(child: Text("A")),
            //手指按下时会触发此回调
            onPanDown: (DragDownDetails e) {
              //打印手指按下的位置(相对于屏幕)
              print("用户手指按下：${e.globalPosition}");
            },
            //手指滑动时会触发此回调
            onPanUpdate: (DragUpdateDetails e) {
              //用户手指滑动时，更新偏移，重新构建
              setState(() {
                _left += e.delta.dx;
                _top += e.delta.dy;
              });
            },
            onPanEnd: (DragEndDetails e){
              //打印滑动结束时在x、y轴上的速度
              print(e.velocity);
            },
          ),
        )
      ],
    );
  }
}
```

参数 |  说明
:- | :-
DragDownDetails.globalPosition | 当用户按下时，此属性为用户按下的位置相对于屏幕（而非父组件）原点(左上角)的偏移。
DragUpdateDetails.delta | 当用户在屏幕上滑动时，会触发多次Update事件，delta指一次Update事件的滑动的偏移量。
DragEndDetails.velocity | 该属性代表用户抬起手指时的滑动速度(包含x、y两个轴的），示例中并没有处理手指抬起时的速度，常见的效果是根据用户抬起手指时的速度做一个减速动画。


## Flutter 事件处理流程

