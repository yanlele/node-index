const {age} = require('./module1');


console.log('module2: ', age);

setTimeout(()=> {
  console.log('module2: ', age);
}, 1000);
