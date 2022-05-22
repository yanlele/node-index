main(List<String> args) {
  var p1 = Person.withArgs('name', 20, 1.80);
  var p2 = Person("name", 20);
  var p3 = Person.formMap({
    "name": "lilei",
    "age": 20,
    "height": 1.88
  });

  print(p1);
}

class Person {
  late String name;
  late int age;
  late double height;

  // 可选构造参数
  Person(this.name, this.age);

  // 命名构造函数
  Person.withArgs(this.name, this.age, this.height);

  // 命名构造函数
  Person.formMap(Map<String, dynamic> map) {
    this.name = map["name"];
    this.age = map["age"];
    this.height = map["height"];
  }

  @override
  String toString() {
    return 'Person{name: $name, age: $age, height: $height}';
  }
}
