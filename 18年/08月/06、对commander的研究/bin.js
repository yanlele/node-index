const chalk = require('chalk');
const program = require('commander');

// console.log(process.argv);

program
    .usage('< dir path / start / update > [page]')
    .version('0.0.1')
    .option('-c, --clear', '清空项目缓存')
    .option('-i, --init', '初始化项目依赖配置')
    .option('-s, --scaffold', '开启脚手架模式')
    .parse(process.argv);

program.on('--help', function () {
    console.log('  示例(Examples):');
    console.log();
    console.log(chalk.gray('    # 生成到目标目录'));
    console.log('    $ cvms start');
    console.log('    $ cvms ./test-project');
    console.log();
    console.log(chalk.gray('    # 清空项目缓存并生成到目标目录'));
    console.log('    $ cvms start -c');
    console.log();
    console.log(chalk.gray('    # 初始化项目依赖配置并生成到目标目录'));
    console.log('    $ cvms start -i');
    console.log();
    console.log(chalk.gray('    # 开启脚手架模式'));
    console.log('    $ cvms start -s');
    console.log(chalk.yellow('    ! 注:该模式下才可以使用脚手架依赖'));
    console.log();
    console.log(chalk.gray('    # 检测客户端版本并自动升级'));
    console.log('    $ cvms update');
});

program.on('--test', function() {
    console.log(chalk.red('我是一个test 而已'))
});



const rawName = program.args[0];

if(rawName) {
    console.log('你输入了: ', rawName);
} else {
    program.help();
}
