let age = 15;

setTimeout(() => {
  age = 25;
}, 500);

console.log('module1: ', age);

setTimeout(()=> {
  console.log('module1: ', age);
}, 600);

module.exports.age = age;
