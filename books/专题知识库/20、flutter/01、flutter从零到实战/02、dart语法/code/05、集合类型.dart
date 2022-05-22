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

  // 4. 没有关键字定义接口， 所有 class 都是隐式接口
}
