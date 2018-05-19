let factory = require('./factory');
let tools = require('./tools');
let instruction = require('./instruction');
require('./dateFormat');

function getRandomPrice() {
    let randomDigit = Math.floor(Math.random() * 5 + 1);
    let result = '';
    for (let i = 0; i < randomDigit; i++) {
        result += Math.floor(Math.random() * 10).toString()
    }

    return result;
}

console.log(getRandomPrice());
console.log(new Date().Format('yyyy-MM-dd hh:mm:ss'));

instruction.init();


/*
var readline = require('readline');

//创建readline接口实例
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// question方法
rl.question("你叫什么？", function (answer) {
    console.log("名字是：" + answer);
    // 不加close，则不会结束
});

// close事件监听
rl.on("close", function () {
    // 结束程序
    process.exit(0);
});*/
