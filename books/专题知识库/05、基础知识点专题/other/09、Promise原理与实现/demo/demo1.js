/**
 * promise 是可连续执行的？
 * 是可以的！
 */

new Promise((resolve, reject) => {
  console.log(1);
  // return reject();
  return resolve();
})
    .then(() => {
      console.log(2);
    })
    .then(()=> {
      console.log(3);
    })
    .then(()=> {
      console.log(4);
    })
    .catch(()=> {
      console.log('catch');
    })
    .finally(()=> {
      console.log('finally');
    });
