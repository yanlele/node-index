const { debounce } = require('lodash');

const getReturn = debounce(()=> {
  return 'back';
}, 2000);

console.log(getReturn());
