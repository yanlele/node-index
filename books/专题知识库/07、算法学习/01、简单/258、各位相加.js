/*
给一个非负整数 num，反复添加所有的数字，直到结果只有一个数字。

例如:

示例:

输入: 38
输出: 2
解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。

进阶:
你可以不用任何的循环或者递归算法，在 O(1) 的时间内解决这个问题么？
* */

/*用了循环和递归*/
let addDigits = function (num) {
  let arr = [];
  for (let item of num.toString()) {
    arr.push(item)
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

/**
 * 解法思路2
 * 我再给简单补充一下，数字：xyz=100*x+10*y+z=99*x+x+9*y+z=(99*x+9*y)+(x+y+z)，
 * 也就是说xyz和（x+y+z）对于9来说是同模的, 即xyz%9 =（x+y+z）% 9，
 * 这里假设（x+y+z）= ab，同理（ab%9=(a+b)%9），
 * 可以一直递归下去直到一位数字，也就是说我们可以得到模9的结果，
 * 但是我们需要的是模10的结果，num%10=((num-1)%9+1)%10=(num-1)%9+1,这里需要注意的是，1<=num<=9，然后写代码即可
 * @param num
 */
let addDigits2 = function (num) {
  if (0 === num % 9) return 9;
  return num % 9;
}

console.log(addDigits(3118));
console.log(addDigits2(3118));
