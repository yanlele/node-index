const LinkedList = require('./index2');

let linkedList = new LinkedList();
linkedList.put('Gandalf', 'gandalf@email.com');
linkedList.put('John', 'johnsnow@email.com');
linkedList.put('Tyrion', 'tyrion@email.com');
linkedList.put('Aaron', 'aaron@email.com');
linkedList.put('Donnie', 'donnie@email.com');
linkedList.put('Ana', 'ana@email.com');
linkedList.put('Jonathan', 'jonathan@email.com');
linkedList.put('Jamie', 'jamie@email.com');
linkedList.put('Sue', 'sue@email.com');
linkedList.put('Mindy', 'mindy@email.com');
linkedList.put('Paul', 'paul@email.com');
linkedList.put('Nathan', 'nathan@email.com');


console.log(linkedList.get('Gandalf'));
console.log(linkedList.get('John'));
console.log(linkedList.get('Tyrion'));
console.log(linkedList.get('Aaron'));
console.log(linkedList.get('Donnie'));
console.log(linkedList.get('Ana'));
console.log(linkedList.get('Jonathan'));
console.log(linkedList.get('Jamie'));
console.log(linkedList.get('Sue'));
console.log(linkedList.get('Mindy'));
console.log(linkedList.get('Paul'));
console.log(linkedList.get('Nathan'));