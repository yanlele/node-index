/**
 * create by yanlele
 * create time 2018-11-06 15:42
 */




var name = "Kevin Yang";
function sayHi(){
    console.log("你好，我的名字叫" + this.name);
}
var person = {name:"Marry"};
person.sayHello = sayHi;
person.sayHello();