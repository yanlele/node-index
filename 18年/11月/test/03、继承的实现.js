/**
 * create by yanlele
 * create time 2018-11-22 14:08
 */


/*1、类与实例*/
// function Animal(name) {
//     this.name = name;
// }
//
// class Animal2 {
//     constructor(name) {
//         this.name = name;
//     }
// }



/*2、继承*/
/*
* 2.1、构造函数方式继承
* 没有继承父级原型链方法属性
* */
// function Parent(name) {
//     this.name = name;
//     this.getName = function () {
//         console.log(this.name)
//     }
// }
//
// function Child(name) {
//     Parent.call(this, name);
//     this.type = 'child'
// }
//
// let child = new Child('yanle');
// child.getName();
// console.log(child.type);


/*
* 2.2、通过原型链继承
* */
/*function Parent() {
    this.name = 'lelel';
    this.getName = function () {
        console.log(this.name)
    }
}

function Child() {
    this.type = 'child';
}
Child.prototype.getAge = '123';
Child.prototype = new Parent();

let child1 = new Child();
let child2 = new Child();
child1.age = 15;
console.log(child1.name);
console.log(child2.getAge);*/


/*
* 2.3、组合继承1
* Parent执行了两次， 实例的constructor指向了Parent
* */
// function Parent() {
//     this.name = 'lelel';
//     this.getName = function () {
//         console.log(this.name)
//     }
// }
// function Child() {
//     Parent.call(this);
//     this.type = 'child';
// }
// Child.prototype = new Parent();
// let child = new Child();
// console.log(child.constructor);


/*2.4、组合继承2
* 缺点同上
* */
// function Parent() {
//     this.name = 'lelel';
//     this.getName = function () {
//         console.log(this.name)
//     }
// }
// function Child() {
//     Parent.call(this);
//     this.type = 'child';
// }
// Child.prototype = Parent.prototype;


/*2.5、组合继承3*/
// function Parent() {
//     this.name = 'parent5';
//     this.play = [1, 2, 3];
// }
// function Child() {
//     Parent.call(this);
//     this.type = 'child5'
// }
// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;




