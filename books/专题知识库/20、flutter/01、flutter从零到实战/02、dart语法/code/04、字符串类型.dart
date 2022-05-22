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
