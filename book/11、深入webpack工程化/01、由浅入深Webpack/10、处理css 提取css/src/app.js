import base from './css/base.less'
import common from './css/common.less'

let app = document.getElementById('app');
app.innerHTML = `<div class="${base.box}"></div>`;

//实现异步加载a模块
import(
    /* webpackChunkName: 'a' */
    './components/a'
    ).then(function(a) {
        console.log(a)
});


// let flag = false;
//
// setInterval(function(){
//     if(flag) {
//         base.unuse();
//         flag = false
//     } else {
//         base.use();
//         flag = true;
//     }
// }, 500);