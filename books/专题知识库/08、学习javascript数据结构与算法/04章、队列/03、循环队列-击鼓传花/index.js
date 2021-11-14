let Queue = require('../01、创建队列/index');

function hotPotato(nameList, num) {
    let queue = new Queue();

    for(let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]);
    }

    let eliminated = '';
    while (queue.size() > 1) {
        for(let i = 0;i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();

        console.log(eliminated + '在击鼓传花中被淘汰');
    }
    return queue.dequeue();
}


let names = ['John','Jack','Camila','Ingrid','Carl'];
let winner = hotPotato(names, 7);
console.log('胜利者：' + winner);
