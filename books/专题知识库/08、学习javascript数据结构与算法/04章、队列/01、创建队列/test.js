let Queue = require('./index');

let queue = new Queue();
console.log(queue.isEmpty());

queue.enqueue("John");
queue.enqueue("Jack");
queue.enqueue("Camila");
queue.print();
console.log(queue.size()); //输出3
console.log(queue.isEmpty()); //输出false
queue.dequeue();
queue.dequeue();
queue.print();