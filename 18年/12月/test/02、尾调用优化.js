function add(n) {
    if (n === 1) {
        return n;
    }
    return n * add(n - 1);
}

console.log(add(5));


function add1(n, total) {
   if(n === 1) {
       return total;
   }
   return add1(n-1, n* total)
}

console.log(add1(5, 1));


function fibonacci(n) {
    if(n <= 1) {
        return 1
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

console.log(fibonacci(10));
// console.log(fibonacci(1000));

function fibonacci2(n, ac1 = 1, ac2 = 1 ) {
    if(n <=1) {
        return ac2;
    }
    return fibonacci2(n-1, ac2, ac1+ac2);
}
console.log(fibonacci2(1000));


// add1 的第一种 柯里化 currying
function factorial(n) {
    return add1(n, 1);
}
console.log(factorial(5));

// add1 的第二种柯里化实现方式
function currying(fn, n) {
    return function (m) {
        return fn.call(this, m, n)
    }
}
const factorial1 = currying(add, 1);
console.log(factorial1(5));

// 用es6 实现的尾调用优化
function factorialEs6(n, total = 1) {
    if(n === 1) {
        return total
    }
    return factorialEs6(n -1, n * total)
}
console.log(factorialEs6(5));


