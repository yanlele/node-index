let Dictionary = require('../07、字典和散列表/01、字典/index');
let Queue = require('../04章、队列/02、优先队列/index');

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

    // 广度优先遍历算法
    bfs(v, callback) {
        let color = this.initializeColor(), queue = new Queue();
        queue.enqueue(v);
        while (!queue.isEmpty()) {
            let u = queue.dequeue(), neighbors = this.adjList.get(u);
            color[u] = 'grey';
            for (let i = 0; i < neighbors.length; i++) {
                let w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if (callback) {
                callback(u);
            }
        }
    }

    // 使用BFS寻找最短路径
    BFS(v) {
        let color = initializeColor(),
            queue = new Queue(),
            d = [], //{1}
            pred = []; //{2}
        queue.enqueue(v);
        for (let i=0; i<this.vertices.length; i++){ //{3}
            d[this.vertices[i]] = 0; //{4}
            pred[this.vertices[i]] = null; //{5}
        }
        while (!queue.isEmpty()) {
            let u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            for (let i = 0; i < neighbors.length; i++) {
                let w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    d[w] = d[u] + 1; //{6}
                    pred[w] = u; //{7}
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
        }
        return { //{8}
            distances: d,
            predecessors: pred
        };
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

    initializeColor() {
        let color = [];
        for (let i = 0; i < this.vertices.length; i++) {
            color[this.vertices[i]] = 'white';
        }
        return color;
    }
}

module.exports = Graph;