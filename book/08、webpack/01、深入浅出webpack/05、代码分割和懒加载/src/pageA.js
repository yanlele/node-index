import './subPageA'
import './subPageB'

require.ensure(['lodash'], function () {
    let _ = require('lodash');
    _.join([1, 2], 3);
}, 'vendor');

export default 'pageA'