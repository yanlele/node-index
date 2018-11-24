/*
let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name)
    }
};

let Child = function () {
    Parent.call(this);
    this.type = 'child'
};

*/


/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name)
    }
};

let Child = function () {
    this.type = 'child'
};

Child.prototype = new Parent();
let child = new Child();
child.getName()*/


/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name)
    }
};

let Child = function () {
    Parent.call(this);
    this.type = 'child'
};
Child.prototype = new Parent();*/


/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name)
    }
};

let Child = function () {
    Parent.call(this);
    this.type = 'child'
};
Child.prototype = Parent.prototype;*/

/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name)
    }
};

let Child = function () {
    Parent.call(this);
    this.type = 'child'
};
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;*/



