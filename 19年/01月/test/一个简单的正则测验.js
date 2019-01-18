/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2019-01-18 9:04
 */

let reg = /23/g;
let match = reg.exec('123456789');
console.log(match);
console.log(match[0]);
console.log(match[1].trim());

let compileText = function (node) {
    let reg = /{{(.+?)}}/g;
    let match;
    while (match = reg.exec(node.nodeValue)) {      //获取到文本内容
        let raw = match[0];
        let key = match[1].trim();
    }
};