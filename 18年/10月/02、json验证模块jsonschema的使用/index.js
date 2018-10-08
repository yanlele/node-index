/**
 * create by yanlele
 * create time 2018-10-08 10:32
 */
let Validator = require('jsonschema').Validator;
let validator = new Validator();

let {checkSchema}  = require('./jsonSchema/testCheckJson');


/*let checkSchema = {
    type: 'object',
    properties: {
        contains: {
            type: 'number',
            minimum: 0,
            maximum: 100
        }
    }
}*/

let data = {
    contains: 12,
    user: {
        phone: '15213497741'
    }
};
Validator.prototype.customFormats.mobile = function(input) {
    let mobile = /^1[345789]\d{9}$/;
    return mobile.test(input);
};
function checkJson(data, schema) {
    let result = validator.validate(data, schema);
    console.log(result);
    if(result.errors.length) {
        return result.errors[0].stack;
    }
}

let checkResult = checkJson(data, checkSchema);
console.log(checkResult);