// 第一种正则表达式
let reg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
let str = '123456711.788';
console.log(str.replace(reg, '$1,'));


// 第二种字符串替换方法
let strReplace = function (num = 0) {
    /*let numStr = num.toString();
    let fixedStr = '';
    if(numStr.indexOf('.') !== -1) {
        console.log(numStr.split('.')[1]);
        let splitStr = numStr.split('.');
        numStr = splitStr[0];
        fixedStr = splitStr[1];
    }
    let result = '';
    while (numStr.length > 3) {
        result = ',' + numStr.slice(-3) + result;
        numStr = numStr.slice(0, numStr.length -3);
    }
    if(numStr) {
        result = numStr + result;
    }
    if(fixedStr) {
        return result + '.' + fixedStr;
    }
    return result;*/

    /*let numStr = num.toString();
    let fixedStr = '';
    let result = '';
    let splitStr = '';
    if (numStr.indexOf('.') !== -1) {
        splitStr = numStr.split('.');
        numStr = splitStr[0];
        fixedStr = splitStr[1];
    }
    while (numStr.length > 3) {
        result = ',' + numStr.slice(-3) + result;
        numStr = numStr.slice(0, numStr.length - 3);
    }
    if(numStr) {
        result = numStr + result;
    }
    if(splitStr) {
        return result + '.' + fixedStr;
    }*/

    let numStr = num.toString();
    let result = '';
    let splitStr;
    let fixedStr;
    if(numStr.indexOf('.') !== -1) {
        splitStr = numStr.split('.');
        numStr = splitStr[0];
        fixedStr = splitStr[1];
    }
    while (numStr.length > 3) {
        result = ',' + numStr.slice(-3) + result;
        numStr = numStr.slice(0, numStr.length -3);
    }
    if(numStr) {
        result = numStr + result;
    }
    if(splitStr) {
        return result + '.' + fixedStr;
    }
    return result;
};

console.log(strReplace(12345678.12));