const HashTable = require('./index1');

// 让我们执行一些代码来测试 HashTable 类：
var hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
// 执行上述代码，会在控制台中获得如下输出：
// 19 - Gandalf
// 29 - John
// 16 - Tyrion

// 现在来测试 get 方法：
console.log(hash.get('Gandalf'));
console.log(hash.get('Loiane'));
// 获得如下的输出：
// gandalf@email.com
// undefined

// 然后，我们试试从散列表中移除 Gandalf ：
hash.remove('Gandalf');
console.log(hash.get('Gandalf'));
// 由于 Gandalf 不再存在于表中， hash.get('Gandalf') 方法将会在控制台上给出undefined 的输出结果。