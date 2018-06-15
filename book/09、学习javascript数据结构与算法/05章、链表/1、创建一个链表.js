/**
   append(element) ：向列表尾部添加一个新的项。
   insert(position, element) ：向列表的特定位置插入一个新的项。
   remove(element) ：从列表中移除一项。
   indexOf(element) ：返回元素在列表中的索引。如果列表中没有该元素则返回 -1 。
   removeAt(position) ：从列表的特定位置移除一项。
   isEmpty() ：如果链表中不包含任何元素，返回 true ，如果链表长度大于0则返回 false 。
   size() ：返回链表包含的元素个数。与数组的 length 属性类似。
   toString() ：由于列表项使用了 Node 类，就需要重写继承自JavaScript对象默认的toString 方法，让其只输出元素的值。
 * @constructor
 */
function LinkedList() {
    let Node = function(element){ // {1}
        this.element = element;
        this.next = null;
    };

    let length = 0; // {2}

    let head = null; // {3}

    this.append = function(element){
        let node = new Node(element), current;
        if(head === null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    };

    this.insert = function(position, element){

    };

    this.removeAt = function(position){
        // 检查越界值
        if (position > -1 && position < length) {
            let current = head, previous, index = 0;
            //移除第一项
            if (position === 0) {
                head = current.next;
            } else {

            }
        }
    };

    this.remove = function(element){};
    this.indexOf = function(element){};
    this.isEmpty = function() {};
    this.size = function() {};
    this.toString = function(){};
    this.print = function(){};
}