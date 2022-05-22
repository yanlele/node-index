main(List<String> args) {}

class Person {
  late final String name;
  late final int age;

  Person(this.name, {int age = 10}) : this.age = age;

  // Person(this.name, {int age = 10});

  // Person(this.name, this.age);

  // 赋值
  // Person(): age = 10, name = "";

}
