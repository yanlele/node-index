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
const twoSum = (nums: number[], target: number) => {
  for (let index = 0; index < nums.length; index++) {
    for (let index2 = index + 1; index2 < nums.length; index2++) {
      if (nums[index] + nums[index2] === target) return [index, index2];
    }
  }
};


console.log(twoSum([2, 7, 11, 15], 9));
