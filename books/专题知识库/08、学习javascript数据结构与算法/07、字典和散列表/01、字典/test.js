const Dictionary = require('./index');

//基本测试首先，我们来创建一个 Dictionary 类的实例，然后给它添加三条电子邮件地址。我们将会使用这个 dictionary 实例来实现一个电子邮件地址簿。
//使用我们创建的类来执行如下代码：
var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

//如果执行了如下代码，输出结果将会是 true ：
console.log(dictionary.has('Gandalf'));

//下面的代码将会输出 3 ，因为我们向字典实例中添加了三个元素：
console.log(dictionary.size());

// 现在，执行下面的几行代码：
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));
// 输出结果分别如下所示：
// ["Gandalf", "John", "Tyrion"]
// ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
// tyrion@email.com

// 最后，再执行几行代码：
dictionary.remove('John');
// 再执行下面的代码：
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());
// 输出结果如下所示：
// ["Gandalf", "Tyrion"]
// ["gandalf@email.com", "tyrion@email.com"]
// Object {Gandalf: "gandalf@email.com", Tyrion: "tyrion@email.com"}
