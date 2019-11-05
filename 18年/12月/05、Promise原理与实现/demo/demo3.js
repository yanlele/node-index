
// 我们核心要看 then 的回调函数是啥时候注册的，我们知道，事件机制是 “先注册先执行”，
// 即数据结构中的 “栈” 的模式，first in first out。那么重点我们来看下他们谁先注册的。

// 外部的第二个 then 的注册，需要等待 外部的第一个 then 的同步代码执行完成。
// 当执行内部的 new Promise 的时候，然后碰到 resolve，resolve 执行完成，
// 代表此时的该 Promise 状态已经扭转，之后开始内部的第一个 .then 的微任务的注册，此时同步执行完成。
new Promise((resolve, reject) => {
  console.log(1);
  return resolve()
}).then(() => {
  console.log(2);
  // 内部的 resolve 之后，当然是先执行内部的 new Promise 的第一个 then 的注册，这个 new Promise 执行完成，立即同步执行了后面的 .then 的注册。
  new Promise((resolve) => {
    console.log(3);
    return resolve()
  })
      .then(() => {
        console.log(4);
      })
      // 然而这个内部的第二个 then 是需要第一个 then 的的执行完成来决定的，而第一个 then 的回调是没有执行，仅仅只是执行了同步的 .then 方法的注册，所以会进入等待状态。
      .then(() => {
        console.log(5);
      })
      .then(()=> {
        console.log(6);
      })
}).then(() => {
  // 外部的第一个 then 的同步操作已经完成了，
  // 然后开始注册外部的第二个 then，此时外部的同步任务也都完成了。
  // 外部第二个 then 完成之后， 进入等待， 内部的第二个 then 注册之后在执行
  console.log(7);
}).then(() => {
  console.log(8);
}).then(()=> {
  console.log(9);
});
