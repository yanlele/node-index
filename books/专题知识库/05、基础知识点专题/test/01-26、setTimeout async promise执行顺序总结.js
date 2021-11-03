/**
 * create by yanlele
 * create time 2018-11-14 15:20
 */

// 示例1
/*
async function async1() {
    console.log("async1 start");
    await  async2();
    console.log("async1 end");

}
async  function async2() {
    console.log( 'async2');
}
console.log("script start");
setTimeout(function () {
    console.log("settimeout");
},0);
async1();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('script end');*/


// 示例2
setTimeout(function () {
    console.log('1')
});

new Promise(function (resolve) {
    console.log('2');
}).then(function () {
    console.log('3')
});
console.log('4');
// 输出结果 2， 3， 4， 1
