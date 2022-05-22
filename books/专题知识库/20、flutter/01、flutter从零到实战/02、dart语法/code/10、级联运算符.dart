main(List<String> args) {
  // var p = Person();
  // p.name = "yanle";
  // p.run();
  // p.eat();

  // 级联运算符
  var p = Person()
    ..name = "yan"
    ..eat()
    ..run();
}

class Person {
  late String name;

  void run() {
    print("running");
  }

  void eat() {
    print("eat");
  }
}
