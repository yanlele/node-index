let Stack = require('./index');

//使用Stack类
let stack  = new Stack();
console.log(stack.isEmpty());

//添加一些新的元素
stack.push(5);
stack.push(8);
console.log(stack.peek());
stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());
stack.push(15);

stack.pop();
stack.pop();
console.log(stack.size()); //输出2
stack.print(); //输出[5, 8]