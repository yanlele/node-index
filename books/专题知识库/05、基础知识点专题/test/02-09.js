/**
 * create by yanlele
 * create time 2018-11-12 14:01
 */

var person={};
Object.defineProperties(person,{
    'username':{
        value:'king',
        writable:true,
        enumerable:true,
        configurable:true
    },
    age:{
        value:12,
        writable:false
    }
});
person.addr='北京';
console.log(person.username);
console.log(person['age']);
console.log(Object.getOwnPropertyDescriptor(person,'username'));
console.log(Object.getOwnPropertyDescriptor(person,'age'));
console.log(Object.getOwnPropertyDescriptor(person,'addr'));

person.age = 15;
console.log(person.age);            // age 没有变化
for (let key in person) {
    console.log(person[key])        // 打印结果只有 king  北京
}