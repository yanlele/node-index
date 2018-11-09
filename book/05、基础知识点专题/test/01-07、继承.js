/**
 * create by yanlele
 * create time 2018-11-09 17:02
 */


function Parent(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    }
}

function Child(name) {
    Parent.call(this, name);
    this.type = 'child1'
}

let child = new Child('yanle');
child.getName();
console.log(child.type);