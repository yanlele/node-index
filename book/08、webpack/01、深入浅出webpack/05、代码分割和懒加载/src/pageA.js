import * as _ from 'lodash'
let page = 'subPageA';

if(page === 'subPageA') {
    import(
        /* webpackChunkName:'subPageA' */
        './subPageA').then(function(subPageA) {
        console.log(subPageA);
    })
} else if(page === 'subPageB') {
    import(
        /* webpackChunkName:'subPageB' */
        './subPageB').then(function(subPageB) {
        console.log(subPageB);
    })
}

export default 'pageA'