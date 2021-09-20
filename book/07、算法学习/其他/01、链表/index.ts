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


  get _next(): any {
    return this.next;
  }

  set _next(value: any) {
    this.next = value;
  }

  get _key(): any {
    return this.key;
  }

  set _key(value: any) {
    this.key = value;
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

  // 插入数据
  insert(node: Node) {
    if (this.head) node._next(this.head);
    else node._next(null);
  }

  find(key) {
    let node = this.head;
    while (node !== null && node._key !== key) {
      node = node._next;
    }
    return node;
  }

  delete(node: Node) {
    if (this.length === 0) {
      throw 'node is undefined';
    }

    if (node === this.head) {
      this.head = node._next;
      this.length--;
      return;
    }

    let prevNode = this.head;

    // 向前移动一位
    while (prevNode._next !==  node) {
      prevNode = prevNode._next;
    }

    if (node._next === null) {
      prevNode._next = null;
    }
    if (node._next) {
      prevNode._next = node._next;
    }
    this.length--;
  }
}
