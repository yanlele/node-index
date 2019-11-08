class Scope {
  constructor() {
    this.name = '123';
  }

  getName() {
    return  function() {
      console.log(this.name);
    }
  }
}

const scope = new Scope();
scope.getName()();
