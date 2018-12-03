var person={
    name:'yanle',
    age:24,
    address:{
        home:'home address',
        office:'office address'
    },
    schools:['xiaoxue','daxue']
};
var programer={
    language:'javascript'
};

// 浅拷贝
let extend = function (person, child = {}) {
    if(typeof person !== 'object') {
        return false;
    }

    for (let key in person) {
        child[key] = person[key]
    }
    return child;
};
let newExtendChild = extend(person, programer);
newExtendChild.address.office = 'zbj';
console.log(person);
console.log(newExtendChild);


// 深拷贝
let deepExtend = function (person, child = {}) {
    if(typeof person !== "object") {
        return false;
    }
    for(let key in person) {
        if(typeof person[key] === 'object') {
            child[key] = person[key].constructor === Array ? [] : {};
            deepExtend(person[key], child[key])
        } else {
            child[key] = person[key]
        }
    }
    return child;
};
let newChild = deepExtend(person, programer);
newChild.address.home = 'chonqign';
console.log(person);
console.log(newChild);
