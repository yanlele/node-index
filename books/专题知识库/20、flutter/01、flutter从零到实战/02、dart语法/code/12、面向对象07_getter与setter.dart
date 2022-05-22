main(List<String> args) {
  final p = Person();
  print(p.name);
  p.name = "why";
  print(p.name);

  // 通过 getter setter 访问
  p.setName = "yanle";
  print(p.getName);
}

class Person {
  String name = "";

  // 通过 setter
  set setName(String name) {
    this.name = name;
  }

  String get getName {
    return name;
  }
}
