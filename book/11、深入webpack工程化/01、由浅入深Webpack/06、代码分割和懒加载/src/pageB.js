import * as _ from 'lodash'
let page = 'subPageB';

if(page === 'subPageB') {
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

export default 'pageB'