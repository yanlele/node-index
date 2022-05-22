main(List<String> args) {

}

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
