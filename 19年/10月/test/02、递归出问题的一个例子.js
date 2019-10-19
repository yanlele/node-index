/**
 * 第一个简单的递归例子
 * @param time
 */
// const roleUp = (time) => {
//   time++;
//   console.log(time);
//   return roleUp(time);
// };
//
// // 这样会直接暴栈然后死掉
// roleUp(1);



// 尾调用优化的示例
function tco(f) {
  let value;
  let active = false;
  let accumulated = [];
  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}


const tcoRoleUp = tco(function(time) {
  if (time > 100000) {
    return time;
  }
  return tcoRoleUp(++time);
});

console.log(tcoRoleUp(1));



// const sum = tco(function(x, y) {
//   if (y > 0) {
//     return sum(x + 1, y - 1)
//   }else {
//     return x
//   }
// });
// console.log(sum(1, 100000));

