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
    return const Scaffold(
      appBar: Header(),
      body: YLContentBody(),
    );
  }
}

class Header extends StatelessWidget implements PreferredSizeWidget {
  const Header({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: const Center(
        child: Text(
          "第一个Flutter程序",
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(60);
}

class YLContentBody extends StatelessWidget {
  const YLContentBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "Hello World",
        style: TextStyle(fontSize: 30, color: Colors.orange),
      ),
    );
  }
}
