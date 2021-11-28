//length 申请的空间是多少，就返回多少
const buf = Buffer.from('This is a test !');
console.log(buf.length);

const buf2 = Buffer.alloc(10);
buf2[0] = 2;
console.log(buf2.length);

//toString 转为一个string对象,可以附带一个可选参数，表示转为字符串的格式
console.log(buf.toString('base64'));
console.log(buf.toString('utf-8'));

//file 可以用来填充值的一些属性,接受三个参数，第一个为填充内容，第二个是起始填充位置，第三个参数是截止位置之前
const buf3 = Buffer.alloc(10);
console.log(buf3);
console.log(buf3.fill(1, 2, 6));

//equals 比较buffer内容是否一样
const buf4=Buffer.from('test');
const buf5=Buffer.from('test');
const buf6=Buffer.from('test!');
console.log(buf4.equals(buf5));
console.log(buf4.equals(buf6));

//indexOf 获取指定参数在buffer中的index位置坐标
console.log(buf.indexOf('is'));

