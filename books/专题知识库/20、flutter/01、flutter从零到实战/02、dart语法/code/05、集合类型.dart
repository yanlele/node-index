main(List<String> args) {
  // 1. List
  var names = ["abc", "bcd", "cde"];

  // 2. Set
  var movies = {"nihao", "nicai", "shibushi"};
  // 去重
  Set.from(names).toList();

  // 3. map
  var info = {
    "name": "yanle",
    "age": 30,
  };
}
