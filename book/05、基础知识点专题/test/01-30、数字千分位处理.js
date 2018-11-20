/**
 * create by yanlele
 * create time 2018-11-20 9:48
 */
let number = 1234567.01;

//转换为千分位格式
//将1234567.00转换为1,234,567.00
// 正则表达式方法
// function numToMoneyField(inputString) {
//     regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
//     return inputString.toString().replace(regExpInfo, "$1,");
// }
// console.log(numToMoneyField(1234567));


// 字符串拆分方法
function fun1(num) {
    let result = [], counter = 0;
    num = (num || 0).toString().split('');          // 这个地方就直接格式化为一个字符串了
    /*for (let i = num.length;i >=0 ; i-- ) {
        counter++;
        console.log(i);
        result.unshift(num[i]);
        if(!(i % 3) && i!==0) {
            result.unshift(',')
        }
    }*/
    for (let i = 0;i<num.length;i++) {

    }

    return result.join('');
}

console.log(fun1(1234567));