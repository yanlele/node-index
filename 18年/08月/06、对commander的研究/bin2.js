/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-12-28 22:35
 */

const chalk = require('chalk');
const program = require('commander');

// console.log(process.argv);

program
    .usage('le start')
    .version('0.0.1')
    .option('-s, --start', '开启cli模板选择')
    .parse(process.argv);

program.on('--help', function () {
    console.log('  示例(Examples):');
    console.log();
    console.log(chalk.gray('    le start'));
});

if(program.start) {
    console.log('你输入了: ', 'start');
} else {
    program.help();
}