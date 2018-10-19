/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-18 20:18
 */

// 构造函数创建对象
function Main(name, age) {
    this.name = name;
    this.age = age;

    this.getName = function () {
        console.log(this.name)
    }
}

Main.prototype.getAge = function() {
    console.log(this.age)
};

var main = new Main('yanle', 25);

console.log(main);
main.getAge();