main(List<String> args) {}

class Animal {
  int age = 0;

  Animal(this.age);
}

class Person extends Animal {
  String name = "";

  Person(this.name, int age) : super(age);
}
