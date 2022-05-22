main(List<String> args) {
  // 函数传递
  test(bar);

  // 匿名函数
  test(() {
    print("匿名函数被调用");
    return 10;
  });

  // 箭头函数
  // 函数体只有一行代码
  test(() => print("箭头函数被调用"));
}

void test(Function foo) {
  foo();
}

void bar() {
  print("bar 函数被调用");
}
