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


function extend(p, c={}) {
    for (let prop in p) {
        c[prop] = p[prop]
    }
    return c;
}


console.log(extend(person, programer));
programer.name = '123';
console.log(person);
console.log(programer);
