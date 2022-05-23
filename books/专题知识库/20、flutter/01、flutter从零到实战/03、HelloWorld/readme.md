## Hello World

### 创建一个项目
使用命令行创建                     
`flutter create [flutter_project_name]`

使用工具创建 Android Studio                           


### 官方进阶 demo
   
```dart
import 'package:flutter/material.dart';

main() => runApp(const MyApp());

/// Widget:
///  有状态的 Widget: StateFulWidget 在运行时有一些状态是需要更改的
///  无状态的 Widget: StatelessWidget 在运行时，无状态更改
///  最终形成的一个 widget 数
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // 重写 build 方法
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: "沙雕",
      debugShowCheckedModeBanner: false,
      // Scaffold 脚手架， 可以快速搭建页面
      home: YLHomeBody(),
    );
  }
}

class YLHomeBody extends StatelessWidget {
  // 必须要构造这个， 否则应用的时候会抛错
  const YLHomeBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("title"),
      ),
      body: const YLContentBody(),
    );
  }
}

// class Header extends StatelessWidget implements PreferredSizeWidget {
//   const Header({Key? key}) : super(key: key);
//
//   @override
//   Widget build(BuildContext context) {
//     return AppBar(
//       title: const Center(
//         child: Text(
//           "第一个Flutter程序",
//         ),
//       ),
//     );
//   }
//
//   @override
//   Size get preferredSize => const Size.fromHeight(60);
// }

class YLContentBody extends StatelessWidget {
  const YLContentBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: YLRow(),
    );
  }
}

class YLRow extends StatelessWidget {
  const YLRow({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      // 主轴对齐方式
      mainAxisAlignment: MainAxisAlignment.center,

      // 子元素
      children: const [
        YLCheckBox(),
        Text(
          "hello",
          style: TextStyle(fontSize: 20),
        ),
      ],
    );
  }
}

class YLCheckBox extends StatefulWidget {
  const YLCheckBox({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return YLCheckBoxState();
  }
}


/// 有一个状态概念
/// 不能直接定义状态
/// 创建一个单独的类， 来维护状态
class YLCheckBoxState extends State<YLCheckBox> {
  var _throwShotAway = false;

  @override
  Widget build(BuildContext context) {
    return Checkbox(
      value: _throwShotAway,
      onChanged: (bool? newValue) {
        setState(() {
          _throwShotAway = newValue!;
        });
      },
    );
  }
}
```
