var readline = require('readline');
var  rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Test> ');
rl.prompt();

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'copy':
            console.log("复制");
            break;
        case 'hello':
            console.log('world!');
            break;
        case 'close':
            rl.close();
            break;
        default:
            console.log('没有找到命令！');
            break;
    }
    rl.prompt();
});

rl.on('close', function() {
    console.log('bye bye!');
    process.exit(0);
});