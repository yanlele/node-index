const {normalize} =require('path');
//const normalize =require('path').normalize;

console.log(normalize('/user/local/bin'));
console.log(normalize('/user//local/bin'));
console.log(normalize('/user/local/../bin'));
