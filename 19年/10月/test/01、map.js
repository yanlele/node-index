const {range} = require('lodash');

const mymap = range(10).map(item=> ({
  name: `yanle${item}`,
  age: item,
}));

const newMap = mymap.filter(item => {
  if (item.age % 2 === 0) {
    return item.name;
  }
});

console.log(mymap);
console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
console.log(newMap);


