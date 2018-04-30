require.include('./moduleA');
if(page === 'subPageA') {
    require.ensure(['./subPageA'], function() {
        let subPageA = require('./subPageA');
    }, 'subPageA');
} else if(page === 'subPageB') {
    require.ensure(['./subPageB'], function() {
        let subPageB = require('./subPageB');
    }, 'subPageB');
}

require.ensure(['lodash'], function () {
    let _ = require('lodash');
    _.join([1, 2], 3);
}, 'vendor');

export default 'pageA'