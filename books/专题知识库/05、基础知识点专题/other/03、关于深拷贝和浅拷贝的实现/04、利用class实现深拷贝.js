class Person{
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    run() {
        console.log('person can run');
    }

    static test() {
        console.log('test');
    }
}

class Child extends Person{
    constructor(name,age,address) {
        super(name, age);
        this.address = address;
    }
}

let person = new Person('yanle', 25);
let child = new Child('yanle', 25, 'chongqing');
console.log(person);
console.log(child);
console.log('=========================');
child.name = 'lelellelelele';
console.log(person);
console.log(child);