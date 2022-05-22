## dart 语法

<!-- toc -->

- [变量声明](#%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E)
- [不存在非零即真](#%E4%B8%8D%E5%AD%98%E5%9C%A8%E9%9D%9E%E9%9B%B6%E5%8D%B3%E7%9C%9F)
- [字符串](#%E5%AD%97%E7%AC%A6%E4%B8%B2)
- [集合对象](#%E9%9B%86%E5%90%88%E5%AF%B9%E8%B1%A1)
- [函数](#%E5%87%BD%E6%95%B0)
- [赋值运算符](#%E8%B5%8B%E5%80%BC%E8%BF%90%E7%AE%97%E7%AC%A6)
- [级联运算符](#%E7%BA%A7%E8%81%94%E8%BF%90%E7%AE%97%E7%AC%A6)
- [面向对象](#%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1)
  * [函数定义](#%E5%87%BD%E6%95%B0%E5%AE%9A%E4%B9%89)
  * [构造函数](#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
  * [类的初始化列表](#%E7%B1%BB%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E5%88%97%E8%A1%A8)
  * [重定向构造函数](#%E9%87%8D%E5%AE%9A%E5%90%91%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
  * [常量构造函数](#%E5%B8%B8%E9%87%8F%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
  * [工厂构造函数](#%E5%B7%A5%E5%8E%82%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
  * [getter与setter](#getter%E4%B8%8Esetter)
  * [继承](#%E7%BB%A7%E6%89%BF)
  * [抽象接口](#%E6%8A%BD%E8%B1%A1%E6%8E%A5%E5%8F%A3)
  * [隐式接口](#%E9%9A%90%E5%BC%8F%E6%8E%A5%E5%8F%A3)
  * [mixin](#mixin)

<!-- tocstop -->

### 变量声明
```
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
```

关于指向同一个对象创建场景
```
// 当前 p1 和 p2 应该是不是同一个对象
class Person {
    String name;
    Person(this.name);
}
final p1 = Person("why");
final p2 = Person("why");
print(identical(p1, p2)); // false

// 如果我希望同样的参数， 指向同样的对象， 这样可以节省堆内存
class Person {
    final String name;
    const Person(this.name);
}
const p1 = Person("why");
const p2 = Person("why");
const p3 = Person('le');
print(identical(p1, p2)); // true
print(identical(p1, p3)); // false
```


### 不存在非零即真
```dart
main(List<String> args) {
  var flag = "123";
  // 这样就是错误的语法， 必须要是一个布尔值， 没有非空即真的说法
  if (flag) {
    print("实行代码失败");
  }
}
```

### 字符串
```dart
main(List<String> args) {
  // 1. 定义字符串
  var str1 = 'abc';
  var str2 = "abc";
  var str3 = """
  abc,
  bcd,
  cde
  """;

  // 2. 字符串拼接与模板字符串
  var name = "yanel";
  var age = 30;
  var height = 1.88;
  // ${变量} 有一些情况是可以省略的
  var message1 = "my name is ${name}, age is ${age}, height is ${height}";
  var message2 = "name is ${age}, type is ${name.runtimeType}";
}
```


### 集合对象
```dart
main(List<String> args) {
  // 1. List
  var names = ["abc", "bcd", "cde", "abc"];

  // 2. Set
  var movies = {"nihao", "nicai", "shibushi"};
  // 去重
  names = Set<String>.from(names).toList();
  print(names);

  // 3. map
  var info = {
    "name": "yanle",
    "age": 30,
  };
}
```

### 函数
**可选参数的函数**                         
```dart
main(List<String> args) {
  sayHello("name");
  sayHello2("name", 18, 188);
  sayHello3("name", height: 1.00, age: 30);
}

// 必选参数： 必须传
void sayHello(String name) {
  print(name);
}

// 可选参数：位置可选参数 - 命名可选参数
// 位置可选参数: [int age, double height];
// 实参和形参是根据位置匹配的
void sayHello2(String name, [int? age = 10, double? height = 2]) {}

// 命名可选参数
void sayHello3(String name, {int? age = 10, double? height = 2}) {}

// 函数默认值
// 只有可选参数， 才有默认值
```

**函数作为参数传递**                            
```dart
// 传递带参数的函数执行
typedef Calculate = int Function(int num1, int num2);

void test(Calculate cal) {
  cal(20, 30);
}

// run
test((num1, num2) => num1 + num2);
```

### 赋值运算符
```dart
main(List<String> args) {
  // ??=
  // 原来的变量有值的时候， 就不执行， 如果是 null, 就赋值
  var name = "why";
  name ??= "lilei";
  print(name);
  
  // ??:
  // 类似于 ||
  var name = null;
  var temp = name ?? "lilei";
  print(temp);
}
```

### 级联运算符
```dart
main(List<String> args) {
  // 正常使用
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
```

### 面向对象
#### 函数定义
```dart
main(List<String> args) {
  var p = Person("why", 18);
}

class Person {
  late String name;
  late int age;
  Person(this.name, this.age);
}
```


#### 构造函数
```dart
main(List<String> args) {
  var p1 = Person.withArgs('name', 20, 1.80);
  var p2 = Person(name: "yanle", age: 30);
  var p3 = Person.formMap({"name": "lilei", "age": 20, "height": 1.88});

  print(p1);
  print(p2);
  print(p3);
}

class Person {
  late String name;
  late int age;
  late double height;

  // 可选构造参数
  Person({String name = "", int age = 0})
      : this.name = name,
        this.age = age,
        this.height = 2.0;

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
```


#### 类的初始化列表
```dart
main(List<String> args) {
  var p = Person("name", age: 20);
  print(p.age);
}

class Person {
  late final String name;
  late final int age;

  // 传入 age 就使用 age, 没有传入 age, 就使用默认值
  Person(this.name, {int age = 10}): this.age = age;

  Person(String name, {int age = 10}) {
    this.name = name;
    this.age = age;
  }

  Person(this.name, {int age = 10});

  Person(this.name, this.age);

  // 赋值
  Person(): age = 10, name = "";
}
```


#### 重定向构造函数 
```dart
main(List<String> args) {
  var p = Person("name");
  print(p.age);
}

class Person {
  late String name;
  late int age;

  // 构造函数的重定向
  Person(String name) : this._internal(name, 0);

  Person._internal(this.name, this.age);
}
```

#### 常量构造函数
常量构造函数可以是的构造的函数实例化对象，指向同一个引用；
```dart
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
```

#### 工厂构造函数
```dart
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
```

#### getter与setter
```dart
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
```


#### 继承
```dart
main(List<String> args) {}

class Animal {
  int age = 0;
  Animal(this.age);
}

class Person extends Animal {
  String name = "";
  Person(this.name, int age) : super(age);
}
```


#### 抽象接口
```dart
// 2. 抽象类无法实例化
// 3. 可以使用工厂函数实例化
abstract class Shape {
  void getArea();
  void getInfo();
}

// 1. 继承抽象类， 必须要实现抽象类的方法
class Rectangle extends Shape {
  @override
  void getArea() {
    // TODO: implement getArea
  }

  @override
  void getInfo() {
    // TODO: implement getInfo
  }
}
```

#### 隐式接口
```dart
// 所有类都是隐式接口
class Runner {
  void running() {
  }
}

class Flyer {
  void flying() {
  }
}

class SupperMan implements Runner, Flyer {
  @override
  void flying() {
    // TODO: implement flying
  }

  @override
  void running() {
    // TODO: implement running
  }
}
```


#### mixin
```dart
main(List<String> args) {
  final supperMan = SupperMan();
  supperMan.flying();
  supperMan.running();
}

// 所有类都是隐式接口
mixin Runner {
  void running() {
    print("running");
  }
}

mixin Flyer {
  void flying() {
    print("flying");
  }
}

// with 优先级高于 extends, 优先级低于类自身实现
class SupperMan with Runner, Flyer {
}
```
