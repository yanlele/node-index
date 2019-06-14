const moment = require('moment');

const time_zone = 9;

const getTimeZone = (time, timeZone, format) => moment(time).subtract(moment().utcOffset() / 60 - timeZone,'hours').format(format);




const result = getTimeZone('2019-03-12 00:00:00', time_zone, 'YYYY-MM-DD HH:mm:ss');

console.log(result);
console.log(moment().utcOffset());
