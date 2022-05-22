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
