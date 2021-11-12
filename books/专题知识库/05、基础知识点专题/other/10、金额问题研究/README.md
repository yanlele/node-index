## 金额问题研究

```js
/**
 * create by yanle
 * create time 17.4.21 2:50 下午
 */

// 数字格式化 1234567890 --> 1,234,567,890
let numberString = '1234567890';

/* ==============================  demo1 - Start ============================== */
const formatNumber = (str: string) => {
  let arr = [], count = str.length;

  // 长度大于三个的场景
  while (count >= 3) {
    arr.unshift(str.slice(count - 3, count));
    count -= 3;
  }

  // 长度小于三个的场景
  str.length % 3 && arr.unshift(str.slice(0, str.length % 3))

  return arr.toString();
  // return arr.join(',');
}

console.log(formatNumber('1234567890'));
/* ==============================  demo1 - End   ============================== */


/* ==============================  demo2 - Start ============================== */
/**
 * 如果 reduce 没有默认值的时候
 * 第一个 prev 其实就是迭代的第一个元素
 * current 和 index 实际上是指向的第二个元素
 * @param str
 */
const formatNumber2 = (str: string) =>
  str.split("").reverse().reduce((prev, current, index) => ((index % 3) ? current : (current + ",")) + prev);

console.log(formatNumber2('1234567890'))
/* ==============================  demo2 - End   ============================== */


/* ==============================  demo3 - Start ============================== */
/**
 /\B(?=(\d{3})+(?!\d))/g：正则匹配边界\B，边界后面必须跟着(\d{3})+(?!\d);
 (\d{3})+：必须是1个或多个的3个连续数字;
 (?!\d)：第2步中的3个数字不允许后面跟着数字;
 (\d{3})+(?!\d)：所以匹配的边界后面必须跟着3*n（n>=1）的数字。
 * @param str
 */
const formatNumber3 = (str: string) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
console.log(formatNumber3('1234567890'));
/* ==============================  demo3 - End   ============================== */

/* ==============================  demo4 - Start ============================== */
const result4 = (1234567890).toLocaleString("en-US");
console.log(result4)
/* ==============================  demo4 - End   ============================== */

```
