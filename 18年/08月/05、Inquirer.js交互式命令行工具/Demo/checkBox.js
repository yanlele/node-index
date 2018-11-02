/**
 * create by yanlele
 * create time 2018-11-01 18:03
 */

/**
 * Checkbox list examples
 */

let inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'checkbox',
            message: '请选择',
            name: 'select',
            choices: [
                new inquirer.Separator(' = 前台程序 = '),
                {
                    name: 'Pepperoni',
                },
                {
                    name: 'Ham'
                },
                {
                    name: 'Ground Meat'
                },
                {
                    name: 'Bacon'
                },
                new inquirer.Separator(' = node 后台程序 ='),
                {
                    name: 'Mushroom'
                },
                {
                    name: 'Tomato'
                },
                new inquirer.Separator(' = java 后台程序 = '),
                {
                    name: 'Pineapple'
                }
            ],
            validate: function (answer) {
                if (answer.length !== 1) {
                    return '只能选择一个初始化项目模板';
                }
                return true;
            }
        }
    ])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    });
