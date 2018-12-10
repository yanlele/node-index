/*let str='192.168.14.A12A'
console.log(/127.0.0.1|192.168.14.\d{1,3}|zbjdev.com/g.test(str));
console.log(/\d/.test(str));

let email ='asdfwef23123@qq.com'
console.log('email', /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email));
console.log('yanle@qq.com'.match(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/));

let cardId = '121513546yasd颜乐dlf123vsd4f65465';
console.log(/^[0-9a-zA-Z]+$/.test(cardId));
console.log(!/^1\d{10}$|^1[345789]\d{1}[*]{4}\d{4}&/.test('11111111111'));*/

// console.log(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test('2018-05-09 00:00'));

/*var str = '6222023100014701887';
var str=str.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
console.log(str);


// 给手机号码做掩码

let phone = '152132837sfasdf46238746497741';
let phoneMask = phone.replace(/^(\w{3})(\w*)(\w{4})$/, "$1 **** $3");
console.log(phoneMask);*/


//验证非数字和点
// let value = 18371.1111;
// console.log(/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value));


// 手机号码验证
let phone = '15213497741';
// console.log(/^1[345789]\d{9}$/.exec(phone));
console.log(phone.match(/^1[345789]\d{9}$/));
// console.log(phone.search(/213/));


// console.log(/\*{2,}/.test('13*111'));


// 千分位
// let number = '1234567890.01';
// let reg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
// console.log(number.toString().replace(reg, '$1,'));