/**
 * create by yanlele
 * create time 2018-10-08 10:36
 */

var Validator = require('jsonschema').Validator;
var v = new Validator();

// Address, to be embedded on Person
var addressSchema = {
    "id": "/SimpleAddress",
    "type": "object",
    "properties": {
        "lines": {
            "type": "array",
            "items": {"type": "string"},
        },
        "zip": {"type": "string"},
        "city": {"type": "string"},
        "country": {"type": "string"}
    },
    "required": ["country"]
};

// Person
var schema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "address": {"$ref": "/SimpleAddress"},
        "votes": {"type": "number", "minimum": 1}
    }
};

var p = {
    "name": "Barack Obama",
    "address": {
        "lines": [ "1600 Pennsylvania Avenue Northwest" ],
        "zip": "DC 20500",
        "city": "Washington",
        "country": "USA"
    },
    "votes": 3
};

v.addSchema(addressSchema, '/SimpleAddress');
console.log(v.validate(p, schema));