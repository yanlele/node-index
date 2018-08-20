const Graph = require('./index');
const Stack = require('../03章、栈/01、栈的创建/index');

let graph = new Graph();
let myVertices = ['A','B','C','D','E','F','G','H','I']; //{7}
for (let i=0; i<myVertices.length; i++){ //{8}
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

console.log('===================================');

function printNode(value) {
    console.log('Visited vertex: ' + value);
}
graph.bfs(myVertices[0], printNode);

console.log('===================================');

let shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);

console.log('===================================');

let fromVertex = myVertices[0]; //{9}
for (let i=1; i<myVertices.length; i++){ //{10}
    let toVertex = myVertices[i], //{11}
        path = new Stack(); //{12}
    for (let v=toVertex; v!== fromVertex;
         v=shortestPathA.predecessors[v]) { //{13}
        path.push(v); //{14}
    }
    path.push(fromVertex); //{15}
    let s = path.pop(); //{16}
    while (!path.isEmpty()){ //{17}
        s += ' - ' + path.pop(); //{18}
    }
    console.log(s); //{19}
}

console.log('================================');
graph.dfs(printNode);
