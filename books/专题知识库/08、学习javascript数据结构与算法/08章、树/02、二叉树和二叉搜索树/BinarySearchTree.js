class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    //插入数据
    insert(key) {
        let newNode = new Node(key);
        if(this.root === null) {
            this.root = newNode;
        } else {
            Tool.insertNode(this.root, newNode);
        }
    }

    // 中序遍历
    inOrderTraverse(callback) {
        Tool.inOrderTraverseNode(this.root, callback);
    }

    // 先序遍历
    preOrderTraverse(callback) {
        Tool.preOrderTraverseNode(this.root, callback);
    }

    // 后序遍历
    postOrderTraverse(callback) {
        Tool.postOrderTraverseNode(this.root, callback);
    }

    // 获取最小键
    min() {
        return Tool.minNode(this.root);
    }

    // 获取最大键
    max() {
        return Tool.maxNode(this.root);
    }

    // 搜索一个特定的值
    search(key) {
        return Tool.searchNode(this.root, key);
    }

    // 移除一个节点
    remove(key) {
        root = Tool.removeNode(this.root, key);
    }
}

class Tool {
    static insertNode(node, newNode) {
        if(newNode.key < node.key) {
            if(node.left === null) {
                node.left = newNode;
            }else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if(node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    static inOrderTraverseNode(node, callback) {
        if(node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    static preOrderTraverseNode(node, callback) {
        if(node !== null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    static postOrderTraverseNode(node, callback) {
        if(node !== null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    static minNode(node) {
        if(node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node.key;
        }
        return null;
    }

    static maxNode(node) {
        if(node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null
    }

    static searchNode(node, key) {
        if(node === null) {
            return false;
        }
        if(key < node.key) {
            return this.searchNode(node.left, key);
        } else if(key > node.key) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    static removeNode(node, key) {
        if(node === null) {
            return null;
        }
        if(key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if(key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            //键等于 node.key 的情况
            //第一种情况： 一个叶节点
            if(node.left === null && node.right === null) {
                node = null;
                return node
            }

            //第二种情况： 一个只有一个子节点的节点
            if(node.left === null) {
                node = node.right;
                return node;
            } else if(node.right === null) {
                node = node.left;
                return node;
            }

            // 第三种情况： 一个有两个子节点的节点
            let aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(ndoe.right, aux.key);
            return node;
        }
    }

    static findMinNode(node) {
        if(node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node;
        }
        return null;
    }
}

module.exports = BinarySearchTree;