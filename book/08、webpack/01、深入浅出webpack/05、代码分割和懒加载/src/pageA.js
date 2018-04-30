require.include('./moduleA');

let page = 'subPageA';

if(page === 'subPageA') {
    import(
        /* webpackChunkName:'subPageA' */
        './subPageA').then(function(subPageA) {
        console.log(subPageA);
    })
} else if(page === 'subPageB') {
    import(
        /* webpackChunkName:'subPageA' */
        './subPageB').then(function(subPageB) {
        console.log(subPageB);
    })
}

require.ensure(['lodash'], function () {
    let _ = require('lodash');
    _.join([1, 2], 3);
}, 'vendor');

export default 'pageA'