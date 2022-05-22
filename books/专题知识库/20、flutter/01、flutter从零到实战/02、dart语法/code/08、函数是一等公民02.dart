main(List<String> args) {
  // test((abc) {
  //   print(abc);
  // });

  test((num1, num2) => num1 + num2);

  var demo1 = demo();
  print(demo1(10, 20));
}

// 封装一个而寒暑， 要求传递一个函数
// void test(Function foo) {
//   foo("why");
// }

// 传递带参数的函数执行
typedef Calculate = int Function(int num1, int num2);

void test(Calculate cal) {
  cal(20, 30);
}

Calculate demo() {
  return (int num1, int num2) {
    return num1 * num2;
  };
}
