new Promise(resolve => {
  console.log(1);
  resolve();
})
  .then(() => {
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
      });

    return new Promise(resolve => {
      console.log(6);
      resolve();
    })
      .then(() => {
        console.log(7);
      })
      .then(() => {
        console.log(8);
      })
  })
  .then(() => {
    console.log(9);
  })
  .then(() => {
    console.log(10);
  });
