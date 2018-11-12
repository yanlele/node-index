/**
 * create by yanlele
 * create time 2018-11-12 11:26
 */

let obj = {
    name: 'yanle',
    age: 26,
    changeName(name) {
        this.name = name;
    },
    getAge() {
        return this.age;
    }
};

console.log(obj.name);
console.log(obj['name']);
obj.changeName('lele');
console.log(obj.name);
console.log(obj['name']);

console.log('---------------------');

console.log(obj['getAge']());
