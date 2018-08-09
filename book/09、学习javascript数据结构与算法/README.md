# 学习javascript数据结构与算法

## 学习javascript数据结构与算法 [巴西] Loiane Groner 著 孙晓博等译

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

### <div id='class04-03'>4.3、循环队列</div>
还有另一个修改版的队列实现，就是循环队列。循环队列的一个例子就是击鼓传花游戏（HotPotato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）。                            
[在下面这个示例中，我们要实现一个模拟的击鼓传花游戏](./04章、队列/03、循环队列-击鼓传花/index.js)                     


## <div id='class05'>05章、链表</div>                         
要存储多个元素，数组（或列表）可能是最常用的数据结构。正如本书之前提到过的，每种
语言都实现了数组。这种数据结构非常方便，提供了一个便利的 [] 语法来访问它的元素。然而，
这种数据结构有一个缺点：（在大多数语言中）数组的大小是固定的，从数组的起点或中间插入
或移除项的成本很高，因为需要移动元素（尽管我们已经学过的JavaScript的 Array 类方法可以帮
我们做这些事，但背后的情况同样是这样）。

### <div id='class05-01'>5.1、创建一个链表</div>                   
以下是我们的 LinkedList类的骨架：              
```javascript
function LinkedList() {
var Node = function(element){ // {1}
this.element = element;
this.next = null;
};
var length = 0; // {2}
var head = null; // {3}
this.append = function(element){};
this.insert = function(position, element){};
this.removeAt = function(position){};
this.remove = function(element){};
this.indexOf = function(element){};
this.isEmpty = function() {};
this.size = function() {};
this.toString = function(){};
this.print = function(){};
}
```

具体实现如下：[请见1、创建一个链表](./05章、链表/01、创建一个链表/index.js)


### <div id='class05-02'>5.2、双向链表</div>
链表有多种不同的类型，这一节介绍双向链表。双向链表和普通链表的区别在于，在链表中，
一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素，
另一个链向前一个元素

略。。。。。。。。。。


## <div id='class06'>06章、集合</div>
迄今为止，我们已经学习了数组（列表）、栈、队列和链表（及其变种）等顺序数据结构。在这一章中，我们要学习集合这种数据结构。            
集合是由一组无序且唯一（即不能重复）的项组成的。这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。              
在深入学习集合的计算机科学实现之前，我们先看看它的数学概念。在数学中，集合是一组不同的对象（的集）。              
比如说，一个由大于或等于0的整数组成的自然数集合：N = {0, 1, 2, 3, 4, 5, 6, …}。集合中的对象列表用“{}”（大括号）包围。                 

还有一个概念叫空集。空集就是不包含任何元素的集合。比如24和29之间的素数集合。由于24和29之间没有素数（除了1和自身，没有其他正因数的大于1的自然数），这个集合就是空集。空集用“{ }”表示。              

你也可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。                 

在数学中，集合也有并集、交集、差集等基本操作。在这一章中我们也会介绍这些操作。                       

### <div id='class06-01'>6.1、创建一个集合</div>
目前的JavaScript实现是基于2011年6月发布的ECMAScript 5.1（现代浏览器均已支持），它包
括了我们在之前章节已经提到过的 Array 类的实现。ECMAScript 6（官方名称ECMAScript 2015，
2015年6月发布）包括了 Set 类的实现。

在这一章中，我们要实现的类就是以ECMAScript 6中 Set 类的实现为基础的。   
  add(value) ：向集合添加一个新的项。          
  remove(value) ：从集合移除一个值。             
  has(value) ：如果值在集合中，返回 true ，否则返回 false 。                
  clear() ：移除集合中的所有项。              
  size() ：返回集合所包含元素的数量。与数组的 length 属性类似。               
  values() ：返回一个包含集合中所有值的数组。                         

```javascript
class Set{
    constructor() {
        this.items = {};
    }

    has(value) {
        return this.items.hasOwnProperty(value);
    }

    add(value) {
        if(!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }

    remove(value) {
        if(this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.keys(this.items);
    }
}

module.exports = Set;
```
完整示例请见：[01、创建一个集合](./06章、集合/01、创建一个集合/)


### <div id='class06-02'>6.2、集合操作</div>
对集合可以进行如下操作。                
  并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。            
  交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。                
  差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。                  
  子集：验证一个给定集合是否是另一集合的子集。               

**6.2.1、并集**                                   
并集的数学概念，集合A和B的并集，表示为A∪B，定义如下：           
`A∪B = { x | x ∈ A∨x ∈ B }`                            
意思是x（元素）存在于A中，或x存在于B中。          

现在来实现 Set 类的 union 方法：          
```javascript
union(otherSet) {
    let unionSet = new Set();
    let values = this.values();

    for (let i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
    }

    values = otherSet.values();
    for (let i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
    }

    return unionSet;
}
```

**6.2.2、交集**            
交集的数学概念，集合A和B的交集，表示为A∩B，定义如下：               
A∩B = { x | x ∈ A∧x ∈ B }                   
意思是x（元素）存在于A中，且x存在于B中。              

具体实现：   
```javascript
// 交集
intersection(otherSet) {
    let intersectionSet = new Set();
    let values = this.values();

    for(let i = 0; i < values.length; i++) {
        if(otherSet.has(values[i])) {
            intersectionSet.add(values[i]);
        }
    }
    return intersectionSet;
}
```


**6.2.3、差集**                
差集的数学概念，集合A和B的差集，表示为A - B，定义如下：             
`A-B = { x | x ∈ A ∧ x   B }`              
意思是x（元素）存在于A中，且x不存在于B中。                 

现在来实现 Set 类的 difference 方法：             
```javascript
difference(otherSet) {
    let difference = new Set();
    let values = this.values();

    for(let i = 0;i < values.length; i++) {
        if(!otherSet.has(values[i])) {
            difference.add(values[i]);
        }
    }
    return difference;
}
```

**6.2.4、子集**                                 
我们要介绍的最后一个集合操作是子集。子集的数学概念，集合A是B的子集（或集合B包含了A），表示为A⊆B，定义如下：               
`∀x { x ∈ A → x ∈ B }`                           
意思是集合A中的每一个x（元素），也需要存在于B中。                        

现在来实现 Set 类的 subset 方法：         
```javascript
// 检验是否为子集
subset(otherSet) {
    if (this.size() > otherSet.size()) {
        return false;
    } else {
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if(!otherSet.has(values[i])) {
                return false;
            }
        }
        return true;
    }
}
```
完整示例请见：[02、集合操作](./06章、集合/02、集合操作/)


## <div id='class07'>07章、字典和散列表</div>
字典和散列表来存储唯一值（不重复的值）的数据结构。                              

集合、字典和散列表可以存储不重复的值。在集合中，我们感兴趣的是每个值本身，并把它当作主要元素。在字典中，我们用[键，值]的形式来存储数据。
在散列表中也是一样（也是以[键，值]对的形式来存储数据）。但是两种数据结构的实现方式略有不同，本章中将会介绍。

### <div id='class07-01'>7.1、字典</div>
集合表示一组互不相同的元素（不重复的元素）。在字典中，存储的是[键，值]对，其中键名是用来查询特定元素的。
字典和集合很相似，集合以[值，值]的形式存储元素，字典则是以[键，值]的形式来存储元素。字典也称作映射。            
            
在本章中，我们会介绍几个在现实问题上使用字典数据结构的例子：一个实际的字典（单词和它们的释义）以及一个地址簿。                 

**7.1.1 创建一个字典**                    
与 Set 类相似，ECMAScript 6同样包含了一个 Map 类的实现，即我们所说的字典。                    

这是我们的 Dictionary 类的骨架：
  set(key,value) ：向字典中添加新元素。           
  remove(key) ：通过使用键值来从字典中移除键值对应的数据值。              
  has(key) ：如果某个键值存在于这个字典中，则返回 true ，反之则返回 false 。             
  get(key) ：通过键值查找特定的数值并返回。                
  clear() ：将这个字典中的所有元素全部删除。                
  size() ：返回字典所包含元素的数量。与数组的 length 属性类似。               
  keys() ：将字典所包含的所有键名以数组形式返回。              
  values() ：将字典所包含的所有数值以数组形式返回。                
















































