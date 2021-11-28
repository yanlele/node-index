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

console.log(divideBy2(233)); //输出11101001
console.log(divideBy2(10)); //输出1010
console.log(divideBy2(1000)); //输出1111101000

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
