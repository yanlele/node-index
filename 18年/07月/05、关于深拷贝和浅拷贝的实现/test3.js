/**
 * create by yanle
 * create time 2019/1/3 下午3:47
 */


let person = {
    name: 'yanle',
    age: 24,
    address: {
        home: 'home address',
        office: 'office address'
    },
    schools: ['xiaoxue', 'daxue']
};

let newPerson = JSON.parse(JSON.stringify(person));

person.name = '123';

console.log(newPerson);