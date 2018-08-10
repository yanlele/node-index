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
}

module.exports = BinarySearchTree;