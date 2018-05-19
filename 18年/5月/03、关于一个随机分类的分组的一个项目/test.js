let factory = require('./factory');
let tools = require('./tools');
let instruction = require('./instruction');
require('./dateFormat');

function getRandomPrice() {
    let randomDigit = Math.floor(Math.random() * 5 + 1);
    let result = '';
    for (let i = 0; i < randomDigit; i++) {
        result += Math.floor(Math.random() * 10).toString()
    }

    return result;
}
//
// console.log(getRandomPrice());
// console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'));

// instruction.init();


console.log(factory.getAddress());


