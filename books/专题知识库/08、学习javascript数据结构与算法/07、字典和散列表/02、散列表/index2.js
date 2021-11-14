class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[ ${this.key} - ${this.value} ]`
    }
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.table = [];
        this.length = 0;
        this.head = null;
    }

    loseloseHashCode(key) {
        let hash = 0;
        for(let i = 0; i < key.length; i++) {
            hash +=key.charCodeAt(i);
        }
        return hash % 37;
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

    getHead() {
        return this.head;
    }

    put(key, value) {
        let position = this.loseloseHashCode(key);
        if(this.table[position] === undefined) {
            this.table[position] = new LinkedList();
        }
        this.table[position].append(new ValuePair(key, value));
    }

    get(key) {
        let position = this.loseloseHashCode(key);
        if(this.table[position]!==undefined) {
            let current = this.table[position].getHead();
            while (current.next) {
                if(current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }

            if(current.element.key === key) {
                return current.element.value;
            }
        }
        return undefined;
    }

    remove(key) {
        let position = this.loseloseHashCode(key);
        if(this.table[position]!==undefined) {
            let current = this.table[position].getHead();
            while (current.next) {
                if(current.element.key === key) {
                    this.table[position].remove(current.element);
                    if(this.table[position].isElement()) {
                        this.table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }
            if(current.element.key === key) {
                this.table[position].remove(current.element);
                if(this.table[position].isEmpty()) {
                    this.table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    }
}

module.exports = LinkedList;