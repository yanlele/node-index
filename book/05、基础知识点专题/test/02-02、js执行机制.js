/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-10 23:05
 */

/*for (let i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i)
    }, 1000)
}*/

function a() {
    let i = 1;
    return function() {
        console.log(i);
        i++;
    }
}

let b = a();
let c = a();

b();
b();
b();

c();

