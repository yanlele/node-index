const Set = require('./index');

//测试并集
/*var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
var setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
var unionAB = setA.union(setB);
console.log(unionAB.values());*/
//输出为 ["1", "2", "3", "4", "5", "6"]


//测试交集
/*
var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
var setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
var intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());*/


// 差集
/*var setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
var setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
var differenceAB = setA.difference(setB);
console.log(differenceAB.values());*/

//检验是否为子集
/*
var setA = new Set();
setA.add(1);
setA.add(2);
var setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
var setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.subset(setB));
console.log(setA.subset(setC));
//结果： 我们有三个集合： setA 是 setB 的子集（因此输出为 true ），然而 setA 不是 setC 的子集（ setC 只包含了 setA 中的 2 ，而不包含 1 ），因此输出为 false 。*/
