const {range} = require('lodash');

for (const i in range(10)) {
  if (i %2 === 0) {
    continue;
  }
  console.log(i);
}


