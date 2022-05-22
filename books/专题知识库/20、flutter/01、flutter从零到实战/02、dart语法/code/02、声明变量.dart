main(List<String> args) {
  // 明确申明
  String name = "yanle";

  // 2. 类型推导
  var age = 20;
  // 比如这样是要跑错的 age = "abc";

  // 3. 声明常量
  final height = 1.88;

  // 4. const 也可以声明常量
  const address = "成都市";

  // 5. final，const 有什么区别？
  // const 必须要在声明的时候就要赋值， 而且必须要是常量值
  // final 可以动态计算/函数等动态赋值（运行期间赋值）

  // 比如 这种写法就是错误的
  // const date1 = DateTime.now()
  // 比如 这样写就是没有问题的
  // final date2 = DateTime.now();

  // 使用情况： final 使用的更多一些

  // 当前 p1 和 p2 应该是不是同一个对象
  // class Person {
  //   String name;
  //   Person(this.name);
  // }
  // final p1 = Person("why");
  // final p2 = Person("why");
  // print(identical(p1, p2)); // false

  // 如果我希望同样的参数， 指向同样的对象， 这样可以节省堆内存
  // class Person {
  //   final String name;
  //   const Person(this.name);
  // }
  // const p1 = Person("why");
  // const p2 = Person("why");
  // const p3 = Person('le');
  // print(identical(p1, p2)); // true
  // print(identical(p1, p3)); // false
}



