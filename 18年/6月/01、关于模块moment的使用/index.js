let moment = require('moment');

/*
let day1 = moment();
let day2 = moment([]);
let day3 = moment({});
console.log(day1);
console.log(day2);
console.log(day3);*/


/*
let time = moment("2010 12", "YYYY MM");
console.log(time);*/

/*
let time = moment([2010, 11, 5, 10, 10, 10, 222]).year(1111);
console.log(time);*/

let time  = moment(new Date()).format('YYYY-MM-DD HH:ss:mm');
let time2 = moment(new Date()).format('YYYY-MM-DD');
console.log(time);
console.log(time2);
