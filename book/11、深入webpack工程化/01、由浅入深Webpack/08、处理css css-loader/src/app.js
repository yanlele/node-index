import base from './css/base.css'
import common from './css/common.css'

let app = document.getElementById('app');
app.innerHTML = `<div class="${base.box}"></div>`


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