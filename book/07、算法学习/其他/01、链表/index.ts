export class Node {
  private val: number;
  private next: Node;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }

  get _val(): number {
    return this.val;
  }

  set _val(value: number) {
    this.val = value;
  }


  get _next(): Node {
    return this.next;
  }

  set _next(value: Node) {
    this.next = value;
  }
}


/**
 * 链表
 *
 * 构造方法
 * 1、创建节点
 * 2、插入节点
 * 3、查找节点
 * 4、删除节点
 */
export class NodeList {
  private head: null | Node;
  private length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  static createNode(val: number) {
    return new Node(val);
  }

  insert(node: Node) {
    // 对于当前节点来说
    if (this.head) {
      // 如果存在当前 head 那么
      node._next = this.head;
    } else {
      node._next = null;
    }
    // 插入的节点为 head 节点
    this.head = node;
    this.length++;
  }

  // 查找节点
  find(value: number) {
    // 获取到 head 节点，记载为当前节点
    let node = this.head;

    // 如果当前节点， 后一个元素不为 null， 说明当前节点不是最后一个节点
    // 如果当前节点的 val 值， 不等于入参的 value, 说明当前节点不是要找的节点
    // 满足这两个条件直接移动到下一个节点
    while (node !== null && node._val !== value) {
      node = node._next;
    }
    return node;
  }

  // 删除节点
  delete(node: Node) {
    if (this.length === 0) throw new Error("node is undefined");

    // 当前节点是 head
    if (node === this.head) {
      this.head = node._next;
      this.length--;
      return;
    }

    let prevNode = this.head;
    while (prevNode._next !== node) {
      prevNode = prevNode._next;
    }

    // 最后一个节点
    if (node._next === null) prevNode._next = null;

    // 非最后一个节点
    if (node._next) prevNode._next = node._next;
    this.length--;
  }


  get _head(): Node | null {
    return this.head;
  }

  set _head(value: Node | null) {
    this.head = value;
  }

  get _length(): number {
    return this.length;
  }

  set _length(value: number) {
    this.length = value;
  }
}

const node1 = NodeList.createNode(5);
const node2 = NodeList.createNode(10);
const node3 = NodeList.createNode(20);

const nodeList = new NodeList();
nodeList.insert(node3);
nodeList.insert(node2);
nodeList.insert(node1);

// 列表结果： [5, 10, 20]
// console.log(nodeList.find(20));
console.log(nodeList._head)
