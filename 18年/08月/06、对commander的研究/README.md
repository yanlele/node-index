# 06、对commander的研究              


先来一段最简单的官方示例               
```javascript
var program = require('commander');

program
    .usage('< dir path / start / update > [page]')
    .version('0.1.0')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```
首先program.usage 是表示这个怎么用的；             

program.version() 是表示这个

program.option() ， 接受是三个参数, 第一个参数是接受的命令行， 第二个参数是描述，第三个参数是默认值。                   
在调用program[命令行] 这个的时候，可以得到true/false 或者是 undefined                  