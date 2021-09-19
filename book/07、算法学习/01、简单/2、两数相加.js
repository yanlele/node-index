/*
* 题目
* https://leetcode-cn.com/problems/add-two-numbers/
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例 1：
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

示例 2：
输入：l1 = [0], l2 = [0]
输出：[0]

示例 3：
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
* */

/**
 *
 * @param l1
 * @param l2
 */
const addTwoNumbers = function (l1, l2) {
  const num1 = parseInt(l1.reverse().join(''), 10);
  const num2 = parseInt(l2.reverse().join(''), 10);
  const numResult = num1 + num2;
  const arr = [];
  for (const item of numResult.toString()) {
    arr.push(item);
  }
  return arr.reverse();
};

console.log(addTwoNumbers([2,4,3], [5,6,4]))
