function Person(name, age) {
    this.name = name;
    this.age = age;
    this.toString = function() {
        console.log('name is : ' + this.name + ', age is :' + this.age)
    }
}
/*Person.prototype = {
    toString() {
        console.log('name is : ' + this.name + ', age is :' + this.age)
    }
}*/

var person = new Person('yane', 25);
console.log(person.name);
console.log(person.age);
person.toString();
console.log(person);
