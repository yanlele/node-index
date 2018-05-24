// 引入readline模块
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function(line){
    switch(line.trim()) {
        case 'copy':
            console.log("复制");
            break;
        case 'hello':
            rl.write("Write");
            console.log('world!');
            break;
        case 'close':
            rl.close();
            break;
        default:
            console.log('没有找到命令！');
            break;
    }
});
rl.on('close', function() {
    console.log('bye bye');
    process.exit(0);
});