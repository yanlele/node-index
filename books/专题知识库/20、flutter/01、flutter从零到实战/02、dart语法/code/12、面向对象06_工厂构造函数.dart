main(List<String> args) {
  final p1 = Person.withName("name");
  final p2 = Person.withName("name");

  print(identical(p1, p2));
}

// 工厂构造函数最大的特点， 可以手动返回一个对象
// 需求： 如果传递 name/color 相同， 返回同一个对象
class Person {
  late String name;
  late String color;

  static final Map<String, Person> _nameCache = {};
  static final Map<String, Person> _colorCache = {};

  // 如果有自己实现的构造函数， 那么默认构造函数失效
  factory Person.withName(String name) {
    if (_nameCache.containsKey(name)) return _nameCache[name] as Person;

    final p = Person(name, "default");
    _nameCache[name] = p;
    return p;
  }

  // 如果有自己实现的构造函数， 那么默认构造函数失效
  factory Person.withColor(String color) {
    if (_colorCache.containsKey(color)) return _colorCache[color] as Person;

    final p = Person("default", color);
    _colorCache[color] = p;
    return p;
  }

  Person(this.name, this.color);
}
