/*
给一个非负整数 num，反复添加所有的数字，直到结果只有一个数字。

例如:

设定 num = 38，过程就像： 3 + 8 = 11, 1 + 1 = 2。 由于 2 只有1个数字，所以返回它。

进阶:
你可以不用任何的循环或者递归算法，在 O(1) 的时间内解决这个问题么？
* */

/*用了循环和递归*/
let addDigits = function (num) {
  let arr = [];
  for (let index of num.toString()) {
    arr.push(index)
  }
  if (arr.length === 1) {
    return parseInt(arr[0]);
  }
  let number = 0;
  for (let arrLen = 0; arrLen < arr.length; arrLen++) {
    number += parseInt(arr[arrLen]);
  }
  if (number > 9) {
    return addDigits(number)
  } else {
    return number;
  }
};

let res = addDigits(3118);
console.log(res);
