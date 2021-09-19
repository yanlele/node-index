/**
 * 节点
 */
class ListNode {
  constructor(key) {
    this.next = null;
    this.key = key;
  }
}

// 初始化单项列表
class List {
  // 初始化节点
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 创建节点
  static createNode(key) {
    return new ListNode();
  }
}
