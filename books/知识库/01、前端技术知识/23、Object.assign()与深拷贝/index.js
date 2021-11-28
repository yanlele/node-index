let Mock  = require('mockjs');

let data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1,
        name: '@cname',
        title: '@ctitle'
    }],
    message: '123'
});

console.log('reData', data);
