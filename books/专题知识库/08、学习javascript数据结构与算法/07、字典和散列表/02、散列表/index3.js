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

    djb2(key) {
        let hash = 5381;
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
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
        let position = this.djb2(key);
        if(this.table[position] === undefined) {
            this.table[position] = new ValuePair(key ,value);
        } else {
            let index = ++position;
            while (this.table[index] !==undefined) {
                index ++;
            }
            this.table[index] = new ValuePair(key, value);
        }
    }

    get(key) {
        let position = this.djb2(key);
        if(this.table[position] !== undefined) {
            if(this.table[position].key === key) {
                return this.table[position].value;
            } else {
                let index = ++position;
                while (this.table[index] === undefined || this.table[index].key !== key) {
                    index++
                }
                if(this.table[index].key === key) {
                    return this.table[index].value;
                }
            }
        }
    }

    remove(key) {
        let position = this.djb2(key);
        if(this.table[position] !== undefined) {
            if(this.table[position].key === key) {
                this.table[position] = undefined;
                return true
            } else {
                let index = ++position;
                while (this.table[index] === undefined || this.table[index].key !== key) {
                    index++
                }
                if(this.table[index].key === key) {
                    this.table[index] = undefined;
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports = LinkedList;