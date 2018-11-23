/**
 * create by yanlele
 * create time 2018-11-23 9:45
 */

/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name);
    }
};
let Child = function () {
    Parent.call(this);
    this.type = 'child';
};*/


/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name);
    }
};
let Child = function () {
    this.type = 'child';
};
Child.prototype = new Parent();*/


/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name);
    }
};
let Child = function () {
    Parent.call(this);
    this.type = 'child';
};
Child.prototype = new Parent();*/


/*let Parent = function () {
    this.name = 'yanle';
    this.getName = function () {
        console.log(this.name);
    }
};
let Child = function () {
    this.type = 'child';
};
Child.prototype = Parent.prototype;*/

/*function Parent5() {
    this.name = 'parent5';
    this.play = [1, 2, 3];
}

function Child5() {
    Parent5.call(this);
    this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype);
//这个时候虽然隔离了，但是constructor还是只想的Parent5的，因为constructor会一直向上找
Child5.prototype.constructor=Child5;*/

