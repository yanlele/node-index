var symbol1 = Symbol();
var symbol2 = Symbol("Alice");
console.log(symbol1, symbol2) // 输出：Symbol() Symbol(Alice)

console.log(typeof Symbol("Alice")) // 输出：symbol
