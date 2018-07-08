const deepExtend = require('./deep-extend');

let person = {
    name: 'yanle',
    age: 24,
    address: {
        home: 'home address',
        office: 'office address'
    },
    schools: ['xiaoxue', 'daxue']
};

let programer = {
    language: 'javascript'
};

let newPerson = deepExtend({} ,person);
console.log('实例1：                 ');
console.log('newPerson', newPerson);
console.log('=============');
newPerson.name = '123123123123';
console.log('newPerson', newPerson);
console.log('person', person);
