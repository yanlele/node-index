main(List<String> args) {
  // ??=
  // 原来的变量有值的时候， 就不执行， 如果是 null, 就赋值
  // var name = "why";
  // name ??= "lilei";
  // print(name);

  // ??:
  // 类似于 ||
  var name = null;
  var temp = name ?? "lilei";
  print(temp);
}
