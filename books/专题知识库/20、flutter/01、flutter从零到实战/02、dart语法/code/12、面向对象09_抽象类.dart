main(List<String> args) {

}

// 2. 抽象类无法实例化
// 3. 可以使用工厂函数实例化
abstract class Shape {
  void getArea();
  void getInfo();

  // factory Shape() {
  //   return Rectangle();
  // }
}

// 注意1. 继承抽象类， 必须要实现抽象类的方法
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
