/**
 * 这段代码中，外部的注册采用了非链式调用的写法，根据上面的讲解，
 * 我们知道了外部代码的 p.then 是并列同步注册的。
 * 所以代码在内部的 new Promise 执行完，p.then 就都同步注册完了。
 *
 * 内部的第一个 then 注册之后，
 * 就开始执行外部的第二个 then 了（外部的第二个 then 和 外部的第一个 then 都是同步注册完了）。
 * 然后再依次执行内部的第一个 then ,内部的第二个 then。
 * @type {Promise}
 */
const p = new Promise(resolve => {
  console.log(1);
  resolve()
});

p.then(() => {
  console.log(2);
  new Promise(resolve => {
    console.log(3);
    resolve();
  })
    .then(() => {
      console.log(4);
    })
    .then(() => {
      console.log(5);
    })
});

p.then(() => {
  console.log(6);
});

p.then(() => {
  console.log(7)
});
