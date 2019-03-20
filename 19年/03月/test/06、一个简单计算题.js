/*
* 某人10年前，拥有的钱可以买150平房子, 钱存银行
* 银行每年涨6%
* 房价每年涨10%
* 十年后这个人当初存的那笔钱，可以买多少平的房子
* 求程序实现
* */

// let x = 150;
// let unitMoney = 0; // 单价
// let totalMoney = 0; // 总共有多少钱
//
// let money = 0;
// function add(totalMoney, money = 0) {
//   money = totalMoney + money;
//   for (let i = 0; i < 10; i++) {
//     return add(money + 0.06 * money);
//   }
//   return money;
// }
//
//
// console.log(add(100, 0));

const result = 150 * (Math.pow(1.06, 10)/Math.pow(1.1, 10));
console.log(result);
