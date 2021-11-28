//byteLength
console.log(Buffer.byteLength('test'));
console.log(Buffer.byteLength('测试'));

//isBuffer 判断是不是一个buffer对象
console.log(Buffer.isBuffer('123'));
console.log(Buffer.isBuffer(Buffer.from([1,2,3])));

//concat 拼接buffer
const buf1=Buffer.from('This ');
const buf2=Buffer.from('is ');
const buf3=Buffer.from('a ');
const buf4=Buffer.from('test ');
const buf5=Buffer.from('!');

const buf=Buffer.concat([buf1,buf2,buf3,buf4,buf5]);
console.log(buf.toString());
