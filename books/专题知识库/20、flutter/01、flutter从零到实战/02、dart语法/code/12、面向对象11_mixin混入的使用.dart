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

// with 优先级高于 extends
class SupperMan with Runner, Flyer {
}
