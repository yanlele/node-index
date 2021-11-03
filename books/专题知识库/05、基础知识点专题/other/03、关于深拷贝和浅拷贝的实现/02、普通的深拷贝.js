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

function extend(p, c = {}) {
    for (let prop in p) {
        c[prop] = p[prop]
    }
    return c;
}

function extendDeeply(p, c = {}) {
    for (let prop in p) {
        if (typeof p[prop] === 'object') {
            c[prop] = (p[prop].constructor === Array) ? [] : {};
            extendDeeply(p[prop], c[prop])
        } else {
            c[prop] = p[prop]
        }
    }
    return c;
}

extendDeeply(person, programer);
console.log(programer);
programer.name = 'lelelelele';
console.log(programer);
console.log(person);