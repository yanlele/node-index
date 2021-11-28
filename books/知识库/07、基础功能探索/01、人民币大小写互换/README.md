## 人民币大小写互换

代码如下：               
```js
function convertRmb(money) {
  let cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
  let cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
  let cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
  let cnDecUnits = ["角", "分", "毫", "厘"]; //对应小数部分单位
  let cnInteger = "整"; //整数金额时后面跟的字符
  let cnIntLast = "元"; //整型完以后的单位
  let maxNum = 999999999999999.9999; //最大处理的数字

  let IntegerNum; //金额整数部分
  let DecimalNum; //金额小数部分
  let ChineseStr = ""; //输出的中文金额字符串
  let parts; //分离金额后用的数组，预定义
  if (money === "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    $.alert('超出最大处理数字');
    return "";
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast
    return ChineseStr;
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf(".") === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split(".");
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
    let zeroCount = 0;
    let IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = IntegerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n === "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
  }
  if (DecimalNum !== '') {//小数部分
    let decLen = DecimalNum.length;
    for (i = 0; i < decLen; i++) {
      n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr === '') {
    ChineseStr += cnNums[0] + cnIntLast;
  }
  if (ChineseStr.charAt(ChineseStr.length - 1) === cnIntLast) {
    ChineseStr += cnInteger
  }
  return ChineseStr;
}


function rmbToNum(rmb) {
  let num = "";
  rmb = rmb.indexOf('元') === rmb.length - 1 ? rmb + '整' : rmb;
  rmb = rmb.replace('圆', '元');
  let cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
  for (let i = 0; i < rmb.length; i++) {
    if (cnNums.indexOf(rmb[i]) > -1) {
      num = num + cnNums.indexOf(rmb[i])
    }
    if (rmb.indexOf('拾元') > -1 && rmb[i] === '元') {
      num = num + '0';
    }
    if (rmb[i] === '元' && rmb.indexOf('整') === -1 && rmb.indexOf('元') !== rmb.length - 1 && num.indexOf('.') == -1) {//如果不包含整且元后面有值则添加小数点
      num = num + '.';
    }
  }
  return num;
}

module.exports = {
  convert: convertRmb,
  rmbToNum: rmbToNum
};
```

实例：                     
```js
const rmbHelper = require('./rmbHelper');

let rmb = 123764.123;
let RMB = rmbHelper.convert(rmb);
console.log(RMB);
// let rmbNum = rmbHelper.rmbToNum(RMB);
// console.log(rmbNum);
```
