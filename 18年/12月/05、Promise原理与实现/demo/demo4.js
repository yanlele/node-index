/**
 * 链式调用的注册是前后依赖的 比如上面的外部的第二个 then 的注册，是需要外部的第一个的 then 的执行完成。
 *
 * 变量定义的方式，注册都是同步的 比如这里的 p.then 和 var p = new Promise 都是同步执行的。
 */


new Promise(resolve=> {
  console.log('1');
  resolve();
})
  .then(()=> {
    console.log(2);
    const p = new Promise(resove=> {
      console.log(3);
      resove();
    });

    p.then(()=> {
      console.log(4);
    });

    p.then(()=> {
      console.log(5);
    });
  })
  .then(()=> {
    console.log(6)
  })
  .then(()=> {
    console.log(7)
  });
