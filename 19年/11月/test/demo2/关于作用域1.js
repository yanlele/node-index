var name = 'yanle';

var obj1 = {
  name: 'lele',
  getName: function() {
    var name = 'yanlele1';
    return function () {
      console.log(this.name);
    }
  }
};

// console.log(obj1.getName()());

var obj2 = {
  name: 'yanle2222',
  getName: function () {
    return function () {
      return  this.name;
    }
  }
};

obj1.getName()();
