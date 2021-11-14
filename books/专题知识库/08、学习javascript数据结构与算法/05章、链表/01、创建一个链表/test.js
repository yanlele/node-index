const LinkList = require('./index');

let linkList = new LinkList();
linkList.append(111);
console.log(linkList.toString());
linkList.append(222);
console.log(linkList.toString());

linkList.insert(3, 1212);
console.log(linkList.toString());