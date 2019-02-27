const _ = require('lodash');


/*let object = {'a': 1, 'b': '2', 'c': 3};
let result = _.pickBy(object, function (value, key) {
    return typeof value === "string"
});
console.log(result);    // { b: '2' }*/

console.log(_.isEmpty(true));


const data = {
    name: 'yanle',
    age: 25
};

console.log(Object.entries(data));
