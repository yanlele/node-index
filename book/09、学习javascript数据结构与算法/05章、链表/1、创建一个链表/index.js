/**
   append(element) ：向列表尾部添加一个新的项。
   insert(position, element) ：向列表的特定位置插入一个新的项。
   remove(element) ：从列表中移除一项。
   indexOf(element) ：返回元素在列表中的索引。如果列表中没有该元素则返回 -1 。
   removeAt(position) ：从列表的特定位置移除一项。
   isEmpty() ：如果链表中不包含任何元素，返回 true ，如果链表长度大于0则返回 false 。
   size() ：返回链表包含的元素个数。与数组的 length 属性类似。
   toString() ：由于列表项使用了 Node 类，就需要重写继承自JavaScript对象默认的toString 方法，让其只输出元素的值。
 * @constructor
 */
/*
function LinkedList() {
    let Node = function (element) { // {1}
        this.element = element;
        this.next = null;
    };

    let length = 0; // {2}

    let head = null; // {3}

    this.append = function (element) {
        let node = new Node(element), current;
        if (head === null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    };

    this.insert = function (position, element) {
        // 检查越界值
        if(position >= 0 && position <= length) {
            let node = new Node(element), current = head, previous, index = 0;
            if(position === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++;
            return true;
        } else {
            return false;
        }
    };

    this.removeAt = function (position) {
        // 检查越界值
        if (position > -1 && position < length) {
            let current = head, previous, index = 0;
            //移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }

                //讲previous 与 current 的下一项链接起来： 跳过current, 从而移除它
                previous.next = current.next;
            }
            length --;
            return current.element;
        } else {
            return null;
        }
    };

    this.remove = function (element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function (element) {
        let current = head, index = -1;
        while (current) {
            if(element === current.element) {
                return index
            }
            index++;
            current = current.next;
        }
        return -1;
    };

    this.isEmpty = function () {
    };
    this.size = function () {
    };
    this.toString = function () {
        let current = head,string = '';
        while (current) {
            string = current.element;
            current = current.next;
        }
        return string;
    };

    this.print = function () {
    };
}*/

//es6 来实现链表
class LinkList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    append(element) {
        let node = new Node(element), current;
        if(this.head === null) {
            this.head = node;
        } else {
            current = this.head;

            //如果有下一项就直接移动到下一项
            while (current.next) {
                current = current.next;
            }
            //如果没有下一项，就直接填充当前项
            current.next = node;
        }
        this.length ++;
    }

    insert(position, element) {
        //检查越界
        if(position >= 0 && position <= this.length) {
            let node = new Node(element), current = this.head, previous, index = 0;
            if(position === 0) {
                node.next = current;
                this.head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length ++;
            return true;
        } else {
            return false;
        }
    }

    removeAt(position) {
        //检查越界
        if(position > -1 && position <this.length) {
            let current = this.head, previous, index = 0;

            //移除第一项
            if(position === 0) {
                this.head = current.next;           //直接移动到下一项
                while (index ++ <position) {
                    previous = current;
                    current = current.next;
                }

                //将previous 与 current 的下一项连接起来： 跳过current, 从而实现移除它
                previous.next = current.next;
            }
            this.length--;
            return current.element;     //返回移除的项
        } else {
            return null;
        }
    }

    remove(element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    indexOf(element) {
        let current = this.head, index = -1;
        while (current) {
            if(element === current.element) {
                return index;
            }
            index ++;
            current = current.next;
        }
        return -1;
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

    toString() {
        let current = this.head, string = '';
        while (current) {
            string = current.element;
            current = current.next;
        }
        return string;
    }

    print() {
        console.log(toString());
    }

    getHead() {
        return this.head;
    }
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

module.exports = LinkList;