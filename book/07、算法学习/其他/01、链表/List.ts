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
