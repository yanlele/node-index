/*
给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例:

给定 nums = [2, 7, 11, 15, 21, 33, 41, 48], target = 23

因为 nums[0] + nums[4] = 2 + 21 = 23
所以返回 [0, 4]
* */

/**
 * 方法1 暴力求解
 * @param nums
 * @param target
 */
const twoSum = (nums, target) => {
  for (let index = 0; index < nums.length; index++) {
    for (let index2 = index + 1; index2 < nums.length; index2++) {
      if (nums[index] + nums[index2] === target) return [index, index2];
    }
  }
};


/**
 * 使用 map 方式求解
 * 思路：
 *  用 target 减去数组里面的第一个数， 然后看结果 result 是否在数组里面余下的数里面。
 *  1、如果 result 在 nums 余下的数组里面， 那么就可以直接判定 当前下面与余下的那个下表就是我们要找的两个数
 *  2、如果 result 没有在 nums 余下的数组里面， 那么就可以把当前 result 作为 key, index 作为 value 存在数组里面
 * @param nums
 * @param target
 */
let twoSum2 = (nums, target) => {
  const numMap = new Map();

  for (let index = 0; index < nums.length; index++) {
    const result = target - nums[index];
    if (numMap.has(result)) {
      return [numMap.get(result), index];
    } else {
      numMap.set(nums[index], index);
    }
  }
}


console.log(twoSum2([2,7,11,15], 9));
