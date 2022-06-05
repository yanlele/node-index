# 功能型Widget简介

<!-- toc -->

- [导航返回拦截（WillPopScope）](#%E5%AF%BC%E8%88%AA%E8%BF%94%E5%9B%9E%E6%8B%A6%E6%88%AAwillpopscope)
- [数据共享（InheritedWidget）](#%E6%95%B0%E6%8D%AE%E5%85%B1%E4%BA%ABinheritedwidget)
  * [深入了解](#%E6%B7%B1%E5%85%A5%E4%BA%86%E8%A7%A3)
- [跨组件状态共享（Provider）](#%E8%B7%A8%E7%BB%84%E4%BB%B6%E7%8A%B6%E6%80%81%E5%85%B1%E4%BA%ABprovider)
- [ValueListenableBuilder](#valuelistenablebuilder)
- [异步UI更新（FutureBuilder、StreamBuilder）](#%E5%BC%82%E6%AD%A5ui%E6%9B%B4%E6%96%B0futurebuilderstreambuilder)
  * [FutureBuilder](#futurebuilder)
  * [StreamBuilder](#streambuilder)
- [对话框](#%E5%AF%B9%E8%AF%9D%E6%A1%86)

<!-- tocstop -->

## 导航返回拦截（WillPopScope）
```dart
const WillPopScope({
  ...
  required WillPopCallback onWillPop,
  required Widget child
})
```

onWillPop是一个回调函数，当用户点击返回按钮时被调用（包括导航返回按钮及Android物理返回按钮）。                             
该回调需要返回一个Future对象，如果返回的Future最终值为false时，则当前路由不出栈(不会返回)；
最终值为true时，当前路由出栈退出。                          

```dart
import 'package:flutter/material.dart';

class WillPopScopeTestRoute extends StatefulWidget {
  @override
  WillPopScopeTestRouteState createState() {
    return WillPopScopeTestRouteState();
  }
}

class WillPopScopeTestRouteState extends State<WillPopScopeTestRoute> {
  DateTime? _lastPressedAt; //上次点击时间

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (_lastPressedAt == null ||
            DateTime.now().difference(_lastPressedAt!) > Duration(seconds: 1)) {
          //两次点击间隔超过1秒则重新计时
          _lastPressedAt = DateTime.now();
          return false;
        }
        return true;
      },
      child: Container(
        alignment: Alignment.center,
        child: Text("1秒内连续按两次返回键退出"),
      ),
    );
  }
}
```


## 数据共享（InheritedWidget）
直接上 demo 自己体会
```dart
/// 共享类
/// context.dependOnInheritedWidgetOfExactType<YLShareDataWidget>()
class YLShareDataWidget extends InheritedWidget {
  const YLShareDataWidget({
    Key? key,
    required this.data,
    required Widget child,
  }) : super(key: key, child: child);

  final int data;

  static YLShareDataWidget of(BuildContext context) {
    final YLShareDataWidget? result = context.dependOnInheritedWidgetOfExactType<YLShareDataWidget>();
    assert(result != null, 'No YLShareDataWidget found in context');
    return result!;
  }

  @override
  bool updateShouldNotify(YLShareDataWidget old) {
    return old.data != data;
  }
}

/// 使用共享类
/// YLShareDataWidget.of(context).data.toString()
class TestWidget extends StatefulWidget {
  const TestWidget({Key? key}) : super(key: key);

  @override
  State<TestWidget> createState() => _TestWidgetState();
}

class _TestWidgetState extends State<TestWidget> {
  @override
  Widget build(BuildContext context) {
    return Text(YLShareDataWidget.of(context).data.toString());
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("didChangeDependencies change");
  }
}


/// 使用共享类 与 TestWidget
class InheritedWidgetTestRoute extends StatefulWidget {
  const InheritedWidgetTestRoute({Key? key}) : super(key: key);

  @override
  State<InheritedWidgetTestRoute> createState() => _InheritedWidgetTestRouteState();
}

class _InheritedWidgetTestRouteState extends State<InheritedWidgetTestRoute> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: YLShareDataWidget(
        data: count,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Padding(
              padding: EdgeInsets.only(bottom: 20),
              child: TestWidget(),
            ),
            ElevatedButton(
              child: Text("Increment: $count"),
              onPressed: () => setState(() => count = count + 1),
            )
          ],
        ),
      ),
    );
  }
}
```


### 深入了解
如果我们只想在 `TestWidgetState` 中引用 `ShareDataWidget` 数据，
但却不希望在 `ShareDataWidget` 发生变化时调用 `TestWidgetState` 的 `didChangeDependencies()` 方法应该怎么办？

直接修改实现
```dart
//定义一个便捷方法，方便子树中的widget获取共享数据
static ShareDataWidget of(BuildContext context) {
  //return context.dependOnInheritedWidgetOfExactType<ShareDataWidget>();
  return context.getElementForInheritedWidgetOfExactType<ShareDataWidget>().widget;
}
```

调用 `dependOnInheritedWidgetOfExactType()` 会影响到子孙组建的`didChangeDependencies()`方法和`build()`方法。                                                                         
`getElementForInheritedWidgetOfExactType()` 由于没有注册依赖关系，所以之后当`InheritedWidget`发生变化时，就**不会更新相应的子孙`Widget`**。

但是上面 demo 中， 使用了 `getElementForInheritedWidgetOfExactType()` 依然会有 `TestWidgetState` 组件 build 会被调用，
是因为点击`Increment`按钮后，会调用 `InheritedWidgetTestRouteState`的`setState()`方法


## 跨组件状态共享（Provider）
可以使用 全局事件总线 `EventBus`

缺点很明显：                  
1. 不好管理；                                 
2. 必须显示注册回调， 需要手动销毁绑定， 否则会内存泄漏；                                     

实际上：可以将需要跨组件共享的状态保存在`InheritedWidget`中，然后在子组件中引用`InheritedWidget`即可


这部分可以直接参考设局的一些比较成熟的状态管理包即可： provider、flutter_redux



## ValueListenableBuilder
它的功能是监听一个数据源，如果数据源发生变化，则会重新执行其 builder

```dart
const ValueListenableBuilder({
  Key? key,
  required this.valueListenable, // 数据源，类型为ValueListenable<T>
  required this.builder, // builder
  this.child,
}
```

来一个 demo 自己体会
```dart
class ValueListenableRoute extends StatefulWidget {
  const ValueListenableRoute({Key? key}) : super(key: key);

  @override
  State<ValueListenableRoute> createState() => _ValueListenableRouteState();
}

class _ValueListenableRouteState extends State<ValueListenableRoute> {
  final ValueNotifier<int> _counter = ValueNotifier(0); // 申明
  static const double textScaleFactor = 1.5;

  @override
  Widget build(BuildContext context) {
    print("build");
    return Scaffold(
      appBar: AppBar(
        title: const Text('测试'),
      ),
      body: Center(
        child: ValueListenableBuilder<int>( // 使用
          valueListenable: _counter, // 挂载
          builder: (BuildContext context, int value, Widget? child) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                child!,
                Text("$value 次", textScaleFactor: textScaleFactor),
              ],
            );
          },
          child: const Text('点击了', textScaleFactor: textScaleFactor),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () => _counter.value += 1, // 更改
      ),
    );
  }
}
```


## 异步UI更新（FutureBuilder、StreamBuilder）


### FutureBuilder
```dart
FutureBuilder({
  this.future,            // FutureBuilder依赖的Future，通常是一个异步耗时任务。
  this.initialData,       // 初始数据，用户设置默认数据。
  required this.builder,  // Widget构建器；该构建器会在Future执行的不同阶段被多次调用
});
```

**模拟一个网络请求返回场景**
```dart
import 'package:flutter/material.dart';

Future<String> mockNetWorkData() async {
  return Future.delayed(const Duration(seconds: 2), () => "我是从互联网上获取的数据");
}

class FutureBuilderDemo extends StatelessWidget {
  const FutureBuilderDemo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: FutureBuilder<String>(
        future: mockNetWorkData(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          // 如果请求结束
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasError) {
              return Text("Error ${snapshot.error}");
            } else {
              return Text("Contents: ${snapshot.data}");
            }
          } else {
            // 请求没有结束， 显示 loading
            return const CircularProgressIndicator();
          }
        },
      ),
    );
  }
}
```

### StreamBuilder
`Stream` 也是用于接收异步事件数据, 它常用于会多次读取数据的异步任务场景，如网络内容下载、文件读写等。

```dart
StreamBuilder({
  this.initialData,
  Stream<T> stream,
  required this.builder,
});
```

**示例**                                  
我们创建一个计时器的示例：每隔1秒，计数加1。
```dart
Stream<int> counter() {
  return Stream.periodic(Duration(seconds: 1), (i) {
    return i;
  });
}

Widget build(BuildContext context) {
  return StreamBuilder<int>(
    stream: counter(), //
    //initialData: ,// a Stream<int> or null
    builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
      if (snapshot.hasError)
        return Text('Error: ${snapshot.error}');
      switch (snapshot.connectionState) {
        case ConnectionState.none:
          return Text('没有Stream');
        case ConnectionState.waiting:
          return Text('等待数据...');
        case ConnectionState.active:
          return Text('active: ${snapshot.data}');
        case ConnectionState.done:
          return Text('Stream 已关闭');
      }
      return null; // unreachable
    },
  );
}
```

## 对话框                      
直接看文档即可                                                  
https://flutter.cn/docs/reference/widgets












