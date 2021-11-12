new Promise((resolve, reject) => {
  console.log(1);
  return resolve()
}).then(() => {
  console.log(2);
  // 外部第一个 then 方法里面 return 一个 Promise，这个 return ，代表 外部的第二个 then 的执行需要等待 return 之后的结果。
  return new Promise((resolve) => {
    console.log(3);

    return resolve()
  })
      .then(() => {
        console.log(4);
      })
      .then(() => {
        console.log(5);
      })
}).then(() => {
  console.log(6);
}).then(() => {
  console.log(7);
});
