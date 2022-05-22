main(List<String> args) {
  // 这个地方要使用 const
  const p1 = Person("why");
  const p2 = Person("why");
  print(identical(p1, p2));
}

class Person {
  final String name;
  const Person(this.name);
}
