let Mock  = require('mockjs');

let data = Mock.mock({
    'list|1-10': [{
        'id|+1': Mock.mock('@integer(1,10)'),
        name: Mock.mock('@cname'),
        title: Mock.mock('@ctitle')
    }],
    message: '123'
});

data.prototype = {
    name: 'yanle'
};

let reData = Object.assign({}, data);
reData.message = 456;

console.log('data', data.prototype.name);
console.log('reData', reData);
