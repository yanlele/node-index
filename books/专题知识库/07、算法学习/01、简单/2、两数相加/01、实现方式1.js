/*
* 题目
* https://leetcode-cn.com/problems/add-two-numbers/
*
* 需要熟悉列表的概念
*

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
*
*
* class ListNode {
*     val: number
*     next: ListNode | null
*     constructor(val?: number, next?: ListNode | null) {
*         this.val = (val===undefined ? 0 : val)
*         this.next = (next===undefined ? null : next)
*     }
* }
* */

/* ==============================  定义链表 - Start ============================== */
class ListNode {
  constructor(val, next = undefined) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/* ==============================  定义链表 - End   ============================== */


/* ==============================  辅助方法 - End   = ============================= */
const getValues = listNode => {
  let list = [];
  while (listNode) {
    list.push(listNode.val);
    listNode = listNode.next;
  }
  return list;
}

class NodeList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  insert(node) {
    if (this.head) {
      node.next = this.head;
    } else {
      node.next = null;
    }

    this.head = node;
    this.length++;
  }
}

/**
 * 闭包的形式
 * @returns {function(*): *}
 */
const handleNodeList = () => {
  let head;
  return (node) => {
    if (head) {
      node.next = head;
    } else {
      node.next = null;
    }
    head = node;
    return head;
  }
}

/**
 * 使用类的方式实现
 */
class NodeList2 {
  constructor() {
    this.head = null;
  }

  insert(node) {
    if (this.head) {
      node.next = this.head;
    } else {
      node.next = null;
    }
    this.head = node;
  }
}

/* ==============================  辅助方法 - End   ============================== */


/* ==============================  具体实现 - Start ============================== */
/**
 * 这种方式实际上就是取巧
 *
 * 把链表转为数组， 使用数组的 reverse join 方法
 * 然后转为数字之后做加法计算
 *
 * 昨晚计算之后又转为链表
 *
 * 弊端
 *  如果数字计算的时候位数超标， 那么就狗带了
 *
 *    例如：
 *    输入：
       [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
       [5,6,4]

       输出：
       [0,3,NaN,NaN,1]

       预期结果：
       [6,6,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]

 *
 * @param l1
 * @param l2
 */
const addTwoNumbers = function (l1, l2) {
  const list1 = getValues(l1);
  const list2 = getValues(l2);


  const num1 = parseInt(list1.reverse().join(''), 10);
  const num2 = parseInt(list2.reverse().join(''), 10);
  const numResult = num1 + num2;
  const arr = [];
  for (const item of numResult.toString()) {
    arr.push(item);
  }

  const insert = handleNodeList();

  let head;
  arr.forEach(item => {
     head = insert(new ListNode(item));
  })

  return head;
};

/* ==============================  具体实现 - End   ============================== */


/* ==============================  执行 - Start ============================== */

const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

// console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]))

console.log(addTwoNumbers(l1, l2));

// console.log(addTwoNumbers(l1, l2));

/* ==============================  执行 - End   ============================== */
