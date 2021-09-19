/**
 * 节点
 */
export class Node {
  private next: any;
  private key: any;

  constructor(key) {
    this.next = null;
    this.key = key;
  }
}

class NodeList {
  // 初始化节点
  private head: null | Node;
  private length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  // 创建节点
  static createNode(key) {
    return new Node(key);
  }
}
