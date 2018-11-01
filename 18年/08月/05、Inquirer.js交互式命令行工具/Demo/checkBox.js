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
            name: 'toppings',
            choices: [
                new inquirer.Separator(' = The Meats = '),
                {
                    name: 'Pepperoni'
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
                new inquirer.Separator(' = The Cheeses = '),
                {
                    name: 'Mozzarella',
                    checked: true
                },
                {
                    name: 'Cheddar'
                },
                {
                    name: 'Parmesan'
                },
                new inquirer.Separator(' = The usual ='),
                {
                    name: 'Mushroom'
                },
                {
                    name: 'Tomato'
                },
                new inquirer.Separator(' = The extras = '),
                {
                    name: 'Pineapple'
                },
                {
                    name: 'Olives',
                    disabled: 'out of stock'
                },
                {
                    name: 'Extra cheese'
                }
            ],
            validate: function (answer) {
                if (answer.length < 1) {
                    return 'You must choose at least one topping.';
                }
                return true;
            }
        }
    ])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    });
