let str='192.168.14.A12A'
console.log(/127.0.0.1|192.168.14.\d{1,3}|zbjdev.com/g.test(str));
console.log(/\d/.test(str));