# 学习javascript数据结构与算法

目录结构
- [01章、javascript基础](#class01)
    - [1.5、面向对象编程](#class01-05)
- [03章、栈](#class03)
    - [3.1、栈的创建](#class03-01)
    - [3.2、从十进制到二进制](#class03-02)
- [04章、队列](#class04)
    - [4.1、创建队列](#class04-01)
    - [4.2、优先队列](#class04-02)


## <div id='class01'>01章、javascript基础</div>              
### <div id='class01-05'>1.5、面向对象编程</div>
一般来说创建对象有三种方式                        
方式1：            
```javascript
//方式1
let obj = new Object({});
```

方式2:                
```javascript
//方式2
let obj = {};
obj = {
    name: {
        first: 'Gandalf',
        last: 'the Grey'
    },
    address: 'Middle Earth'
};
```

方式3：                
```javascript
//方式3
function Book(title,pages, isbn) {
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
}
let book =new Book('title', 'page', 'isbn');
console.log(book.title); //输出书名
book.title = 'new title'; //修改书名
console.log(book.title); //输出新的书名
//使用原型扩展
Book.prototype.printTitle = function() {
    console.log(this.title)
};
console.log(book);
console.log(book.__proto__);
```

## <div id='class03'>03章、栈</div>
### <div id='class03-01'>3.1、栈的创建</div>
```javascript
/**
   push(element(s)) ：添加一个（或几个）新元素到栈顶。
   pop() ：移除栈顶的元素，同时返回被移除的元素。
   peek() ：返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）。
   isEmpty() ：如果栈里没有任何元素就返回 true ，否则返回 false 。
   clear() ：移除栈里的所有元素。
   size() ：返回栈里的元素个数。这个方法和数组的 length 属性很类似。
 * @constructor
 */
let Stack = function() {
    let items = [];
    this.push = function (element) {
        items.push(element)
    };
    this.pop = function () {
        return items.pop();
    };
    this.peek = function () {
        return items[items.length - 1]
    };
    this.isEmpty = function() {
        return items.length === 0
    };
    this.clear = function() {
        items = [];
    };
    this.print = function() {
        console.log(items.toString());
    };
    this.size = function() {
        return items.length;
    }
};
```
[可以去看如下的示例代码](./03章、栈/01、栈的创建/index.js)
[堆栈的一个简单使用](./03章、栈/01、栈的创建/test.js)


### <div id='class03-02'>3.2、从十进制到二进制</div>
我们在十进制转为2进制的时候，就需要使用到上面的堆栈对象来实现，我们可以吧堆栈直接方封装为一个模块，然后通过module.exports = Stack这种方式抛出                    
```javascript
let Stack = require('../01、栈的创建/index');
//十进制转换为2进制
function divideBy2(decNumber) {
    let remStack = new Stack(), rem, binaryString = '';
    while (decNumber > 0) {
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString()
    }
    return binaryString;
}
```

还可以创建另外的一个方法，让我们的十进制可以转为其他进制数               
```javascript
//十进制转为其他进制
function baseConverter(decNumber, base) {
    let remStack = new Stack(), rem, baseString = '', digits = '0123456789ABCDEF';
    while (decNumber > 0) {
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base)
    }
    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }
    return baseString;
}
console.log(baseConverter(100345, 2)); //输出11000011111111001
console.log(baseConverter(100345, 8)); //输出303771
console.log(baseConverter(100345, 16)); //输出187F9
```


## <div id='class04'>04章、队列</div>                       
### <div id='class04-01'>4.1、创建队列</div>                           
```javascript
/**
   enqueue(element(s)) ：向队列尾部添加一个（或多个）新的项。
   dequeue() ：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
   front() ：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。
   isEmpty() ：如果队列中不包含任何元素，返回 true ，否则返回 false 。
   size() ：返回队列包含的元素个数，与数组的 length 属性类似。
 * @constructor
 */
function Queue() {
    let items = [];
    this.enqueue = function(element) {
        items.push(element)
    };
    this.dequeue = function() {
        return items.shift()
    };
    this.front = function() {
        return items[0]
    };
    this.isEmpty = function() {
        return items.length === 0
    };
    this.clear = function() {
        items = [];
    };
    this.size = function() {
        return items.length
    };
    this.print = function() {
        console.log(items.toString())
    }
}
module.exports = Queue;
```
### <div id='class04-02'>4.2、优先队列</div>
实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们。在这个示例中，我们将会在正确的位置添加元素，因此可以对它们使用默认的出列操作                                    
```javascript
function PriorityQueue() {
    let items = [];

    function QueueElement(element, priority) { // {1}
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function (element, priority) {
        let queueElement = new QueueElement(element, priority);
        if (this.isEmpty()) {
            items.push(queueElement); // {2}
        } else {
            let added = false;
            for (let i = 0; i < items.length; i++) {
                if (queueElement.priority <
                    items[i].priority) {
                    items.splice(i, 0, queueElement); // {3}
                    added = true;
                    break; // {4}
                }
            }
            if (!added) { //{5}
                items.push(queueElement);
            }
        }
    };

    this.enqueue = function(element) {
        items.push(element)
    };

    this.dequeue = function() {
        return items.shift()
    };

    this.front = function() {
        return items[0]
    };

    this.isEmpty = function() {
        return items.length === 0
    };

    this.clear = function() {
        items = [];
    };

    this.size = function() {
        return items.length
    };

    this.print = function() {
        console.log(items.toString())
    }
}

module.exports = PriorityQueue
```

测试示例：           
```javascript
let PriorityQueue = require('./index');

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();
```

[示例请见](./04章、队列/02、优先队列/index.js)

### 循环队列
还有另一个修改版的队列实现，就是循环队列。循环队列的一个例子就是击鼓传花游戏（HotPotato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）。              
在下面这个示例中，我们要实现一个模拟的击鼓传花游戏：              







