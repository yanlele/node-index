main(List<String> args) {
  var p = Person("name", age: 20);
  print(p.age);
}

class Person {
  late final String name;
  late final int age;

  // 传入 age 就使用 age, 没有传入 age, 就使用默认值
  // Person(this.name, {int age = 10}): this.age = age;

  Person(String name, {int age = 10}) {
    this.name = name;
    this.age = age;
  }

  // Person(this.name, {int age = 10});

  // Person(this.name, this.age);

  // 赋值
  // Person(): age = 10, name = "";
}
