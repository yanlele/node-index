/*let str='192.168.14.A12A'
console.log(/127.0.0.1|192.168.14.\d{1,3}|zbjdev.com/g.test(str));
console.log(/\d/.test(str));

let email ='asdfwef23123@qq.com'
console.log('email', /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email));
console.log('yanle@qq.com'.match(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/));

let cardId = '121513546yasd颜乐dlf123vsd4f65465';
console.log(/^[0-9a-zA-Z]+$/.test(cardId));
console.log(!/^1\d{10}$|^1[345789]\d{1}[*]{4}\d{4}&/.test('11111111111'));*/

console.log(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test('2018-05-09 00:00'));