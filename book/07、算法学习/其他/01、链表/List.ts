export class Node {
  private prev: null | Node;
  private next: null | Node;
  private key: null | Node;

  constructor(key) {
    this.prev = null;
    this.next = null;
    this.key = key;
  }

  get _prev(): Node | null {
    return this.prev;
  }

  set _prev(value: Node | null) {
    this.prev = value;
  }

  get _next(): Node | null {
    return this.next;
  }

  set _next(value: Node | null) {
    this.next = value;
  }

  get _key(): Node | null {
    return this.key;
  }

  set _key(value: Node | null) {
    this.key = value;
  }
}

/*
* 双向链表
*  */
class List {
  private head: null | Node;

  constructor() {
    this.head = null;
  }

  static createNode(key) {
    return new Node(key);
  }

  insert(node: Node) {
    // 设置当前 node 节点
    node._prev = null;
    node._next = this.head;

    // 当前 head 节点
    if (this.head) {
      this.head._prev = node;
    }

    this.head = node;
  }

  search(key: Node) {
    let node = this.head;
    while (node !== null && node._key !== key) {
      node = node._next;
    }
    return node;
  }

  delete(node: Node) {
    const {_prev, _next} = node;
    delete node._prev;
    delete node._next;
    if (node === this.head) this.head = _next;
    if (_prev) _prev._next = _next;
    if (_next) _next._prev = _prev;
  }
}
