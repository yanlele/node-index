# 05、Inquirer.js交互式命令行工具                        

[官方文档链接： https://github.com/SBoudrias/Inquirer.js](https://github.com/SBoudrias/Inquirer.js)                    

### 最基本使用
```javascript
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });
```

### 示例文档：
Check out the `packages/inquirer/examples/` folder for code and interface examples.         
```
node packages/inquirer/examples/pizza.js
node packages/inquirer/examples/checkbox.js
# etc...
```


