let Dictionary = require('../07、字典和散列表/01、字典/index');

class Graph {
    constructor() {
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    // 一个用来向图中添加一个新的顶点（因为图实例化后是空的）
    addVertex(v) {
        this.vertices.push(v);
        this.adjList.set(v, []);
    }

    // 用来添加顶点之间的边
    addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
    }

    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += this.vertices[i] + ' -> ';
            let neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    }
}

module.exports = Graph;