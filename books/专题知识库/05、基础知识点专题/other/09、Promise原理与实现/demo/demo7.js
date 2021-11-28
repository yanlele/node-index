new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then(() => {
    console.log(2);
    new Promise((resolve, reject) => {
      console.log(3);
      resolve();
    })
      .then(() => {
        console.log(4);
        return Promise.resolve();
      })
      .then(() => {
        console.log(5);
      })
      .then(()=> {
        console.log(6)
      })
  })
  .then(() => {
    console.log(7);
  })
  .then(() => {
    console.log(8);
  })
  .then(()=> {
    console.log(9);
  });
