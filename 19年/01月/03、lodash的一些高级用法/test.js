const _ = require('lodash');


let object = {'a': 1, 'b': '2', 'c': 3};
let result = _.pickBy(object, function (value, key) {
    return typeof value === "string"
});
console.log(result);    // { b: '2' }
